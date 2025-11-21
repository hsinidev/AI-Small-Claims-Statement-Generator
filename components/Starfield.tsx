import React, { useRef, useEffect } from 'react';

const Starfield: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        // Colors updated to match the red/burgundy theme
        const colors = [
          '#ffffff', // White
          '#fecdd3', // Light Rose
          '#fda4af', // Rose
          '#e2e8f0', // Slate 200
          '#fff1f2'  // Rose 50
        ];

        const stars: { x: number, y: number, z: number, color: string, size: number }[] = [];
        const numStars = 1200; 

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 2
            });
        }

        let animationFrameId: number;
        
        const draw = () => {
            if (!ctx) return;
            
            // Clear with transparent black to allow CSS gradient to show through
            ctx.clearRect(0, 0, width, height);
            
            ctx.save();
            ctx.translate(width / 2, height / 2);

            for (let i = 0; i < numStars; i++) {
                const star = stars[i];
                star.z -= 0.5; // Smooth, slow movement

                if (star.z <= 0) {
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                    star.z = width;
                }

                const k = 128 / star.z;
                const px = star.x * k;
                const py = star.y * k;
                
                // Dynamic size based on depth
                const s = (1 - star.z / width) * star.size * 1.5;
                
                // Opacity based on depth
                const alpha = (1 - star.z / width);

                if (px >= -width / 2 && px <= width / 2 && py >= -height / 2 && py <= height / 2) {
                    ctx.fillStyle = star.color;
                    ctx.globalAlpha = alpha;
                    ctx.beginPath();
                    ctx.arc(px, py, s > 0 ? s : 0, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.restore();
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
            {/* CSS Based Nebula/Galaxy Gradient Background */}
            <div className="absolute inset-0 galaxy-gradient opacity-100"></div>
            
            {/* Animated Overlay for depth - Reddish/Burgundy tint */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(88,12,31,0.2)_0%,rgba(0,0,0,0)_60%)] animate-pulse"></div>
            
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full mix-blend-screen" />
        </div>
    );
};

export default Starfield;