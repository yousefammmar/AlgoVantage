import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';

const SearchBar = () => {
    const [handle, setHandle] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handle.trim()) {
            navigate(`/dashboard/${handle.trim()}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                position: 'relative',
                width: '100%',
                transition: 'var(--transition-smooth)',
                transform: isFocused ? 'scale(1.02)' : 'scale(1)'
            }}
        >
            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                border: isFocused ? '2px solid var(--accent-primary)' : '2px solid var(--glass-border)',
                borderRadius: '100px',
                padding: '0.25rem 0.25rem 0.25rem 1.5rem',
                boxShadow: isFocused ? '0 0 30px rgba(59, 130, 246, 0.2)' : 'var(--shadow-lg)',
                transition: 'var(--transition-smooth)'
            }}>
                <Search size={22} style={{ color: isFocused ? 'var(--accent-primary)' : 'var(--text-muted)', transition: '0.3s' }} />
                <input
                    type="text"
                    placeholder="Search Codeforces handle..."
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        padding: '1rem',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-sans)'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        color: 'white',
                        width: '48px',
                        height: '48px',
                        borderRadius: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                        transition: 'var(--transition-smooth)'
                    }}
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                Quick search: <span style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => navigate('/dashboard/tourist')}>tourist</span>,
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/dashboard/Benq')}>Benq</span>
            </p>
        </form>
    );
};

export default SearchBar;
