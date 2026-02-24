import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Moon, Sun, Activity, Terminal } from 'lucide-react';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header style={{
            padding: '1.25rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderBottom: '1px solid var(--glass-border)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                    }}>
                        <Terminal size={20} weight="bold" />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                        Algo<span style={{ color: 'var(--accent-primary)' }}>Vantage</span>
                    </span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: 'var(--border-color)',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'var(--transition-smooth)',
                            border: '1px solid transparent'
                        }}
                        onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                        onMouseOut={e => e.currentTarget.style.borderColor = 'transparent'}
                        title="Toggle System Theme"
                    >
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>
                        Source Code
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
