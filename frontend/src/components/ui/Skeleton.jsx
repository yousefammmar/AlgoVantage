import React from 'react';

const Skeleton = ({ width, height, borderRadius = '4px', style }) => {
    return (
        <div
            style={{
                width,
                height,
                borderRadius,
                background: 'linear-gradient(90deg, var(--border-color) 25%, var(--bg-color) 50%, var(--border-color) 75%)',
                backgroundSize: '200% 100%',
                animation: 'skeleton-loading 1.5s infinite linear',
                ...style,
            }}
        />
    );
};

export default Skeleton;

// Add this to index.css if not already present
// @keyframes skeleton-loading {
//   0% { background-position: 200% 0; }
//   100% { background-position: -200% 0; }
// }
