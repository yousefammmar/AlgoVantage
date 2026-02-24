import { getUserInfo, getUserRatingHistory, getUserStatus } from '../../services/codeforces.service.js';

export const getProfile = async (req, res, next) => {
    try {
        const handle = req.params.handle;
        const profile = await getUserInfo(handle);
        res.json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};

export const getRatingHistory = async (req, res, next) => {
    try {
        const handle = req.params.handle;
        const history = await getUserRatingHistory(handle);
        res.json({ success: true, data: history });
    } catch (error) {
        next(error);
    }
};

export const getStatus = async (req, res, next) => {
    try {
        const handle = req.params.handle;
        const status = await getUserStatus(handle);
        res.json({ success: true, data: status });
    } catch (error) {
        next(error);
    }
};

const calculatePerformancePrediction = (history) => {
    if (!history || history.length === 0) return null;

    // Get up to last 4 contests
    const recent = history.slice(-4);
    const deltas = recent.map(h => h.newRating - h.oldRating);

    // Weights: Most recent contest gets highest weight
    const weights = [0.1, 0.2, 0.3, 0.4].slice(4 - deltas.length);
    let weightedSum = 0;
    let weightSum = 0;

    deltas.forEach((d, i) => {
        weightedSum += d * weights[i];
        weightSum += weights[i];
    });

    const averageDelta = weightSum > 0 ? weightedSum / weightSum : 0;
    const currentRating = history[history.length - 1].newRating;
    const projectedRating = Math.round(currentRating + averageDelta);

    let trend = 'Stable';
    let color = '#94a3b8'; // gray

    if (averageDelta > 25) { trend = 'Ascending'; color = '#3b82f6'; }
    else if (averageDelta > 5) { trend = 'Improving'; color = '#10b981'; }
    else if (averageDelta < -25) { trend = 'Major Decay'; color = '#f43f5e'; }
    else if (averageDelta < -5) { trend = 'Declining'; color = '#f59e0b'; }

    return {
        projectedRating,
        expectedDelta: Math.round(averageDelta),
        trend,
        color,
        confidence: deltas.length === 4 ? 'High' : (deltas.length >= 2 ? 'Moderate' : 'Low')
    };
};

export const getAllUserData = async (req, res, next) => {
    try {
        const handle = req.params.handle;

        // Fetch all data in parallel to reduce load time
        const [profile, history, status] = await Promise.all([
            getUserInfo(handle).catch(err => { throw err; }),
            getUserRatingHistory(handle).catch(() => []), // empty array if no history
            getUserStatus(handle).catch(() => [])         // empty array if no status
        ]);

        const forecast = calculatePerformancePrediction(history);

        res.json({
            success: true,
            data: {
                profile,
                history,
                status,
                forecast
            }
        });
    } catch (error) {
        next(error);
    }
};
