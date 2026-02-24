import React from 'react';
import Navbar from '../components/layout/Navbar';
import SearchBar from '../components/common/SearchBar';
import { Activity, Shield, Zap, Globe } from 'lucide-react';

const Home = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <Navbar />

            <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                {/* Hero Section */}
                <section className="container" style={{ paddingTop: '10vh', paddingBottom: '5vh', textAlign: 'center' }}>
                    <div className="animate-slide-up" style={{ marginBottom: '1rem' }}>
                        <span style={{
                            padding: '0.5rem 1.5rem',
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            borderRadius: '100px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: 'var(--accent-primary)',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                        }}>
                            v2.0 Beta • Premium CP Analytics
                        </span>
                    </div>

                    <h1 className="animate-slide-up stagger-1" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                        Architecting <span className="gradient-text">Elite Performance</span> <br />
                        for Competitive Coders.
                    </h1>

                    <p className="animate-slide-up stagger-2" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3.5rem', lineHeight: '1.6' }}>
                        Unlock deep insights into your Codeforces journey. Tracking ratings, unsolved weaknesses, and performance trends with millisecond precision.
                    </p>

                    <div className="animate-slide-up stagger-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <SearchBar />
                    </div>
                </section>

                {/* Features Group */}
                <section className="container" style={{ padding: '6rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <FeatureItem
                        icon={<Zap size={24} />}
                        title="Instant Synthesis"
                        desc="Ultra-fast parallel fetching from Codeforces API with redundant server-side caching."
                    />
                    <FeatureItem
                        icon={<Shield size={24} />}
                        title="Elite Security"
                        desc="Enterprise-grade architecture with Helmet security headers and rate-limiting protection."
                    />
                    <FeatureItem
                        icon={<Globe size={24} />}
                        title="Global Context"
                        desc="Compare worldwide rankings and track your percentile across the entire community."
                    />
                </section>
            </main>

            <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <p>© 2026 AlgoVantage Pro. Built for the Next Generation of Engineers.</p>
            </footer>
        </div>
    );
};

const FeatureItem = ({ icon, title, desc }) => (
    <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'left', transition: 'var(--transition-smooth)' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{desc}</p>
    </div>
);

export default Home;
