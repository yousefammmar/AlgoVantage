import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Radar } from 'react-chartjs-2';
import { useTheme } from '../../../hooks/useTheme';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ChartWidget = ({ type = 'line', data, options, title }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: type === 'radar',
                labels: {
                    color: isDark ? '#94a3b8' : '#475569',
                    font: { family: 'Outfit', size: 12, weight: '500' }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 15, 20, 0.9)',
                titleFont: { family: 'Outfit', size: 14, weight: '700' },
                bodyFont: { family: 'Outfit', size: 13 },
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1
            }
        },
        scales: type === 'line' ? {
            x: {
                ticks: { color: isDark ? '#64748b' : '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } },
                grid: { display: false }
            },
            y: {
                ticks: { color: isDark ? '#64748b' : '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } },
                grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }
            }
        } : type === 'radar' ? {
            r: {
                grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
                angleLines: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
                pointLabels: {
                    color: isDark ? '#cbd5e1' : '#475569',
                    font: { family: 'Outfit', size: 11, weight: '600' }
                },
                ticks: { display: false }
            }
        } : {}
    };

    return (
        <div className="glass-panel" style={{
            padding: '2rem',
            height: '420px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {title && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                        {title}
                    </h3>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }}></div>
                </div>
            )}
            <div style={{ flex: 1, position: 'relative' }}>
                {type === 'line' && <Line data={data} options={{ ...defaultOptions, ...options }} />}
                {type === 'radar' && <Radar data={data} options={{ ...defaultOptions, ...options }} />}
            </div>
        </div>
    );
};

export default ChartWidget;
