import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'var(--accent-primary)' }) => {
    return (
        <div className="glass-panel animate-slide-up" style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: `${color}15`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                border: `1px solid ${color}33`
            }}>
                {Icon && <Icon size={20} />}
            </div>

            <div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                    {value}
                </h3>
                <p style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {title}
                </p>
            </div>

            {/* Subtle progress bar aesthetic at bottom */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '3px',
                background: `linear-gradient(90deg, ${color}, transparent)`
            }}></div>
        </div>
    );
};

export default StatCard;
