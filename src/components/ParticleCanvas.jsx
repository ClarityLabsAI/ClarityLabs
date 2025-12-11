import React, { useEffect, useRef } from 'react';

const ChladniPlate = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef(null);
    const animationRef = useRef(null);

    // Perf-sensitive: keep particle count moderate to stay responsive.
    const particleCount = 5000;
    const m = 3;
    const n = 2;
    const mPI = m * Math.PI;
    const nPI = n * Math.PI;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height, scaleX, scaleY, centerX, centerY;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            centerX = width / 2;
            centerY = height / 2;
            scaleX = width / 2;
            scaleY = height / 2;
        };
        resize();
        window.addEventListener('resize', resize);

        // Classic Chladni equation + analytic gradient (avoids extra sampling)
        const chladniWithGrad = (px, py) => {
            const cosNpx = Math.cos(nPI * px);
            const sinNpx = Math.sin(nPI * px);
            const cosMpx = Math.cos(mPI * px);
            const sinMpx = Math.sin(mPI * px);
            const cosNpy = Math.cos(nPI * py);
            const sinNpy = Math.sin(nPI * py);
            const cosMpy = Math.cos(mPI * py);
            const sinMpy = Math.sin(mPI * py);

            const value = cosNpx * cosMpy - cosMpx * cosNpy;
            const dx = -nPI * sinNpx * cosMpy + mPI * sinMpx * cosNpy;
            const dy = -mPI * cosNpx * sinMpy + nPI * cosMpx * sinNpy;
            return { value, dx, dy };
        };

        // Initialize particles
        if (!particlesRef.current) {
            const x = new Float32Array(particleCount);
            const y = new Float32Array(particleCount);
            const vx = new Float32Array(particleCount);
            const vy = new Float32Array(particleCount);
            const particleTime = new Float32Array(particleCount); // Renamed from 'age'
            const ampFactor = new Float32Array(particleCount);
            const phaseX = new Float32Array(particleCount); // Independent phase for X offset
            const phaseY = new Float32Array(particleCount); // Independent phase for Y offset

            for (let i = 0; i < particleCount; i++) {
                x[i] = Math.random() * 2 - 1;
                y[i] = Math.random() * 2 - 1;
                particleTime[i] = Math.random() * 100; // Renamed from 'age'
                ampFactor[i] = Math.random();
                phaseX[i] = Math.random() * Math.PI * 2;
                phaseY[i] = Math.random() * Math.PI * 2;
            }

            particlesRef.current = { x, y, vx, vy, particleTime, ampFactor, phaseX, phaseY };
        }

        const p = particlesRef.current;
        let lastTime = 0;
        const startTime = performance.now();
        const frameInterval = 1000 / 60;

        const animate = (currentTime) => {
            animationRef.current = requestAnimationFrame(animate);

            const delta = currentTime - lastTime;
            if (delta < frameInterval) return;
            lastTime = currentTime - (delta % frameInterval);

            // Decay Logic
            const timeSinceStart = currentTime - startTime;
            const startAmp = 30.0;
            const minAmp = 0.5; // Reduced final amplitude
            const decayDuration = 5000;
            let currentMaxAmp = startAmp - (startAmp - minAmp) * (timeSinceStart / decayDuration);
            if (currentMaxAmp < minAmp) currentMaxAmp = minAmp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particleCount; i++) {
                let px = p.x[i];
                let py = p.y[i];

                const outOfBounds = px < -1 || px > 1 || py < -1 || py > 1;

                if (outOfBounds) {
                    px = Math.random() * 2 - 1;
                    py = Math.random() * 2 - 1;
                    p.x[i] = px;
                    p.y[i] = py;
                    p.vx[i] = 0;
                    p.vy[i] = 0;
                }

                const cg = chladniWithGrad(px, py);

                // Delay the ordering effect
                const force = timeSinceStart < 300 ? 0 : 0.00002;
                const damping = 0.94;

                p.vx[i] = (p.vx[i] - cg.dx * cg.value * force) * damping;
                p.vy[i] = (p.vy[i] - cg.dy * cg.value * force) * damping;

                p.x[i] = px + p.vx[i];
                p.y[i] = py + p.vy[i];

                p.particleTime[i] += 0.3; // Renamed from 'age'

                const screenX = centerX + px * scaleX;
                const screenY = centerY + py * scaleY;

                // Sinusoidal Breathing Offset
                const currentAmp = 1 + p.ampFactor[i] * (currentMaxAmp - 1);
                const oscX = Math.sin(currentTime * 0.002 + p.phaseX[i]);
                const oscY = Math.sin(currentTime * 0.002 + p.phaseY[i]);
                const offsetX = currentAmp * oscX;
                const offsetY = currentAmp * oscY;

                const absValue = Math.abs(cg.value);
                const lightness = 50 + Math.sin(p.particleTime[i] * 0.002) * 2; // Renamed from 'age'
                const alpha = 0.65 + Math.sin(p.particleTime[i] * 0.002) * 0.03; // Renamed from 'age'

                const baseHue = 43; // approx GOLD hue
                const hue = baseHue + absValue * 4;
                const saturation = 78 + absValue * 10;
                ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
                ctx.fillRect(screenX + offsetX - 1, screenY + offsetY - 1, 2, 2);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
            }}
        />
    );
};

export default ChladniPlate;