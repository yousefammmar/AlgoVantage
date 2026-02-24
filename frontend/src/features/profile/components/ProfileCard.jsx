import React from 'react';

const getRankColor = (rank) => {
    const r = (rank || '').toLowerCase();
    if (r.includes('legendary')) return '#ff0000';
    if (r.includes('grandmaster')) return '#ff0000';
    if (r.includes('master')) return '#ff8c00';
    if (r.includes('candidate')) return '#aa00aa';
    if (r.includes('expert')) return '#0000ff';
    if (r.includes('specialist')) return '#03a89e';
    if (r.includes('pupil')) return '#008000';
    if (r.includes('newbie')) return '#808080';
    return 'var(--text-primary)';
};

const ProfileCard = ({ profile }) => {
    if (!profile) return null;

    const rankColor = getRankColor(profile.rank);

    return (
        <div className="glass-panel animate-slide-up" style={{
            padding: '3rem',
            display: 'flex',
            gap: '3rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Glow Overlay */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '300px',
                height: '300px',
                background: rankColor,
                opacity: 0.05,
                filter: 'blur(100px)',
                borderRadius: '50%'
            }}></div>

            <div style={{ position: 'relative' }}>
                <img
                    src={profile.titlePhoto || profile.avatar}
                    alt={profile.handle}
                    style={{
                        width: '160px',
                        height: '160px',
                        borderRadius: '24px',
                        objectFit: 'cover',
                        border: `2px solid ${rankColor}`,
                        boxShadow: `0 10px 30px -10px ${rankColor}66`
                    }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: '-10px',
                    right: '-10px',
                    background: 'var(--bg-surface)',
                    padding: '0.5rem 1rem',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    color: rankColor,
                    border: `1px solid ${rankColor}44`,
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    RANK #{profile.rating || 0}
                </div>
            </div>

            <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', letterSpacing: '-0.04em' }}>
                        {profile.handle}
                    </h2>
                    {profile.contribution > 0 && (
                        <span style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem', borderRadius: '100px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            +{profile.contribution} contrib
                        </span>
                    )}
                </div>

                <p style={{ fontSize: '1.25rem', color: rankColor, textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '2rem' }}>
                    {profile.rank || 'Unrated'}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                    <StatItem label="Max Rating" value={profile.maxRating} color={rankColor} />
                    <StatItem label="Organization" value={profile.organization || 'Independent'} color="var(--text-secondary)" />
                    <StatItem label="Location" value={`${profile.city || ''}, ${profile.country || ''}`} color="var(--text-secondary)" />
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ label, value, color }) => (
    <div>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{label}</p>
        <p style={{ fontWeight: '600', fontSize: '1rem', color: color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value || '---'}</p>
    </div>
);

export default ProfileCard;
