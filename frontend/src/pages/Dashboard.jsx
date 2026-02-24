import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUserData } from '../services/api';
import Navbar from '../components/layout/Navbar';
import ProfileCard from '../features/profile/components/ProfileCard';
import StatCard from '../features/profile/components/StatCard';
import ChartWidget from '../features/profile/components/ChartWidget';
import ForecastCard from '../features/profile/components/ForecastCard';
import Skeleton from '../components/ui/Skeleton';
import { Trophy, Code, Target, Zap, ArrowLeft, BarChart3, PieChart } from 'lucide-react';

const Dashboard = () => {
    const { handle } = useParams();
    const navigate = useNavigate();

    const { data: responseData, isLoading: loading, error } = useQuery({
        queryKey: ['cfUser', handle],
        queryFn: () => fetchAllUserData(handle),
        enabled: !!handle,
    });

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <main className="container" style={{ padding: '4rem 2rem' }}>
                    <Skeleton width="120px" height="32px" style={{ marginBottom: '3rem' }} />
                    <Skeleton width="100%" height="240px" borderRadius="24px" style={{ marginBottom: '3rem' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} width="100%" height="160px" borderRadius="20px" />
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div className="container" style={{ paddingTop: '15vh', textAlign: 'center' }}>
                    <h2 className="gradient-text" style={{ fontSize: '5rem', marginBottom: '1rem' }}>404</h2>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>{error.message || 'Data integration failed.'}</p>
                    <button onClick={() => navigate('/')} className="btn-primary">
                        <ArrowLeft size={18} /> Return to Mission Control
                    </button>
                </div>
            </div>
        );
    }

    if (!responseData?.data?.profile) return null;

    const { profile, history, status, forecast } = responseData.data;

    // Process Rating History Graph
    const ratingLabels = history.map(h => new Date(h.ratingUpdateTimeSeconds * 1000).toLocaleDateString());
    const ratingDataPoints = history.map(h => h.newRating);
    const chartData = {
        labels: ratingLabels,
        datasets: [
            {
                label: 'Rating Pulse',
                data: ratingDataPoints,
                borderColor: '#3b82f6',
                background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.2) 0%, transparent 100%)',
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                tension: 0.3,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 6,
                borderWidth: 3,
            }
        ]
    };

    // Process Tags Data
    const solvedProblems = status.filter(s => s.verdict === 'OK');
    const uniqueSolvedCount = new Set(solvedProblems.map(s => `${s.problem.contestId}-${s.problem.name}`)).size;

    const tagCount = {};
    solvedProblems.forEach(s => s.problem.tags.forEach(tag => tagCount[tag] = (tagCount[tag] || 0) + 1));
    const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]).slice(0, 8);

    const tagChartData = {
        labels: sortedTags.map(t => t[0]),
        datasets: [{
            label: 'Proficiency Level',
            data: sortedTags.map(t => t[1]),
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            borderColor: '#8b5cf6',
            borderWidth: 2,
            pointBackgroundColor: '#8b5cf6',
        }]
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main className="container" style={{ padding: '4rem 2rem 8rem', flex: 1 }}>
                {/* Header Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <button onClick={() => navigate('/')} style={{
                        color: 'var(--text-muted)',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: '0.2s',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }} className="hover-accent">
                        <ArrowLeft size={18} /> BACK TO SEARCH
                    </button>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.1em' }}>
                        LAST UPDATED: {new Date().toLocaleTimeString()}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                        <ProfileCard profile={profile} />
                    </div>
                    <div>
                        <ForecastCard forecast={forecast} />
                    </div>
                </div>

                {/* Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', margin: '3rem 0' }}>
                    <StatCard title="Problems Solved" value={uniqueSolvedCount} icon={Code} color="#10b981" />
                    <StatCard title="Contest Frequency" value={history.length} icon={Trophy} color="#f59e0b" />
                    <StatCard title="Competitive Standing" value={profile.rating || 0} icon={Zap} color="#8b5cf6" />
                    <StatCard title="Community Contrib" value={profile.contribution} icon={Target} color="#3b82f6" />
                </div>

                {/* Analytics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '2rem' }}>
                    {history.length > 0 && (
                        <div className="animate-slide-up stagger-1">
                            <ChartHeader icon={<BarChart3 size={18} />} title="Rating Trajectory" />
                            <ChartWidget type="line" data={chartData} />
                        </div>
                    )}

                    {sortedTags.length > 0 && (
                        <div className="animate-slide-up stagger-2">
                            <ChartHeader icon={<PieChart size={18} />} title="Domain Distribution" />
                            <ChartWidget type="radar" data={tagChartData} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const ChartHeader = ({ icon, title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingLeft: '0.5rem' }}>
        <div style={{ color: 'var(--accent-primary)' }}>{icon}</div>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
            {title}
        </h3>
    </div>
);

export default Dashboard;
