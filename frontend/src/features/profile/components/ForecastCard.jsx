import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

const ForecastCard = ({ forecast }) => {
    if (!forecast) return null;

    const { projectedRating, expectedDelta, trend, color, confidence } = forecast;

    const Icon = expectedDelta > 5 ? TrendingUp : (expectedDelta < -5 ? TrendingDown : Minus);

    return (
        <div className="glass-panel animate-slide-up" style={{
            padding: '2.5rem',
            background: `${color}05`,
            border: `1px solid ${color}22`,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Glow Area */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '120px',
                height: '120px',
                background: color,
                opacity: 0.15,
                filter: 'blur(40px)',
                borderRadius: '50%'
            }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.8125rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Performance Forecast
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                            fontSize: '0.7rem',
                            fontWeight: '800',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '100px',
                            background: `${color}15`,
                            color: color,
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em'
                        }}>
                            {trend}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>CONFIDENCE: {confidence}</span>
                    </div>
                </div>
                <div style={{ color: color, padding: '0.5rem', background: `${color}10`, borderRadius: '10px' }}>
                    <Icon size={20} />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.25rem' }}>
                <div>
                    <p style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                        {projectedRating}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.75rem', fontWeight: '500' }}>
                        Next Contest Target Rating
                    </p>
                </div>
                <div style={{ paddingBottom: '0.5rem' }}>
                    <span style={{
                        fontSize: '1.25rem',
                        fontWeight: '800',
                        color: expectedDelta >= 0 ? '#10b981' : '#f43f5e',
                        display: 'block',
                        lineHeight: 1
                    }}>
                        {expectedDelta >= 0 ? '+' : ''}{expectedDelta}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginTop: '0.25rem', display: 'block' }}>Expected Shift</span>
                </div>
            </div>

            <div style={{
                marginTop: '2rem',
                display: 'flex',
                alignItems: 'start',
                gap: '0.75rem',
                padding: '1rem',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                backdropFilter: 'blur(10px)'
            }}>
                <Info size={14} style={{ color: 'var(--accent-primary)', marginTop: '0.15rem', flexShrink: 0 }} />
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontWeight: '400' }}>
                    Calculated using a weighted moving average of your recent 4 performances. This model accounts for volatility and recent momentum.
                </p>
            </div>
        </div>
    );
};

export default ForecastCard;
