import React, { useEffect, useRef } from 'react';

const ParticleCanvas = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const requestRef = useRef();
    const particlesRef = useRef([]);
    const targetRef = useRef([]);

    // Configuration
    const PARTICLE_COUNT = 5000; // Adjusted
    const PARTICLE_SIZE = 1;   // Adjusted
    const BASE_SPEED = 0.03;
    const THICKNESS = 1.0;
    // Noise Configuration
    const START_NOISE = 1.5;
    const END_NOISE = 0.2;
    const NOISE_DECAY_DURATION = 5000;
    const ANIMATION_DELAY = 1000; // Wait 1s before starting convergence

    // Diamond Geometry Definition (Normalized -1 to 1)
    const getDiamondPoints = (count) => {
        const points = [];

        // Helper to add points along a line segment
        const addLine = (x1, y1, x2, y2, density = 1) => {
            const dist = Math.hypot(x2 - x1, y2 - y1);
            const numPoints = Math.floor(dist * count * density / 12); // Heuristic for distribution

            for (let i = 0; i < numPoints; i++) {
                const t = Math.random();
                // Base position on the line
                let px = x1 + (x2 - x1) * t;
                let py = y1 + (y2 - y1) * t;

                // Add "Thickness" by scattering perpendicular to the line
                // Vector along line
                const dx = x2 - x1;
                const dy = y2 - y1;
                // Perpendicular vector (normalized)
                const len = Math.sqrt(dx * dx + dy * dy);
                const nx = -dy / len;
                const ny = dx / len;

                // Random offset [-THICKNESS/2, THICKNESS/2] (converted to norm coords approx)
                const offset = (Math.random() - 0.5) * 0.015 * THICKNESS;

                px += nx * offset;
                py += ny * offset;

                points.push({ x: px, y: py });
            }
        };

        // --- RADIANT CUT GEOMETRY (HORIZONTAL) ---
        const ox = 0.9, oy = 0.75; // Outer Width/Height
        const oc = 0.2; // Corner cut

        const ix = 0.55, iy = 0.45; // Inner Table
        const ic = 0.1;

        // Outer Octagon
        const o_tl = [-ox + oc, -oy], o_tr = [ox - oc, -oy];
        const o_rt = [ox, -oy + oc], o_rb = [ox, oy - oc];
        const o_br = [ox - oc, oy], o_bl = [-ox + oc, oy];
        const o_lb = [-ox, oy - oc], o_lt = [-ox, -oy + oc];

        // Inner Octagon
        const i_tl = [-ix + ic, -iy], i_tr = [ix - ic, -iy];
        const i_rt = [ix, -iy + ic], i_rb = [ix, iy - ic];
        const i_br = [ix - ic, iy], i_bl = [-ix + ic, iy];
        const i_lb = [-ix, iy - ic], i_lt = [-ix, -iy + ic];

        // Midpoints for stars
        const om_t = [0, -oy], om_b = [0, oy];
        const om_r = [ox, 0], om_l = [-ox, 0];

        const drawPoly = (pts) => {
            for (let i = 0; i < pts.length; i++) {
                const a = pts[i];
                const b = pts[(i + 1) % pts.length];
                addLine(a[0], a[1], b[0], b[1]);
            }
        };

        // 1. Outer Rim
        drawPoly([o_tl, o_tr, o_rt, o_rb, o_br, o_bl, o_lb, o_lt]);
        // 2. Inner Table
        drawPoly([i_tl, i_tr, i_rt, i_rb, i_br, i_bl, i_lb, i_lt]);

        // 3. Connecting Bevels
        addLine(...i_tl, ...o_tl); addLine(...i_tr, ...o_tr);
        addLine(...i_rt, ...o_rt); addLine(...i_rb, ...o_rb);
        addLine(...i_br, ...o_br); addLine(...i_bl, ...o_bl);
        addLine(...i_lb, ...o_lb); addLine(...i_lt, ...o_lt);

        // 4. Star Facets
        addLine(...i_tl, ...om_t); addLine(...i_tr, ...om_t);
        addLine(...i_bl, ...om_b); addLine(...i_br, ...om_b);
        addLine(...i_rt, ...om_r); addLine(...i_rb, ...om_r);
        addLine(...i_lt, ...om_l); addLine(...i_lb, ...om_l);

        // 5. Cross/Diagonals - REMOVED
        // addLine(-ix+ic, -iy, ix-ic, iy);
        // addLine(ix-ic, -iy, -ix+ic, iy);

        return points;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false });

        let w, h;
        let cx, cy;
        let scale;

        const init = () => {
            if (!containerRef.current) return;
            // Use client dimensions of the container, not window
            w = containerRef.current.clientWidth;
            h = containerRef.current.clientHeight;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);

            cx = w / 2;
            cy = h / 2;
            // STRICT BOUNDING: Scale to fit the SMALLER dimension of the CONTAINER
            scale = Math.min(w, h) * 0.35; // Reduced size (was 0.45)

            // 1. Generate Target Shape (Normalized)
            const targets = getDiamondPoints(PARTICLE_COUNT);

            // 2. Initialize Particles
            // Gaussian distribution (Box-Muller transform) for organic "cloud" feel
            if (particlesRef.current.length === 0) {
                particlesRef.current = new Float32Array(targets.length * 4);

                const randomGaussian = (mean, stdDev) => {
                    let u = 0, v = 0;
                    while (u === 0) u = Math.random();
                    while (v === 0) v = Math.random();
                    const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
                    return mean + num * stdDev;
                };

                const spread = Math.max(w, h) / 4.0; // Reduced spread: particles start closer to center

                for (let i = 0; i < targets.length; i++) {
                    const idx = i * 4;
                    // Gaussian distribution centered on screen
                    particlesRef.current[idx] = randomGaussian(w / 2, spread);
                    particlesRef.current[idx + 1] = randomGaussian(h / 2, spread);

                    // Random speed modifier: 0.5x to 1.5x
                    particlesRef.current[idx + 2] = 0.5 + Math.random();

                    // Random Phase for sine-wave noise (0 to 2PI)
                    particlesRef.current[idx + 3] = Math.random() * Math.PI * 2;
                }
            }

            // Store targets (scaled)
            targetRef.current = new Float32Array(targets.length * 2);
            for (let i = 0; i < targets.length; i++) {
                targetRef.current[i * 2] = targets[i].x;
                targetRef.current[i * 2 + 1] = targets[i].y;
            }
        };

        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            const activeElapsed = Math.max(0, elapsed - ANIMATION_DELAY);
            const isActive = elapsed > ANIMATION_DELAY;

            // Calculate current noise amplitude
            // Linear interpolation from START to END over DURATION, starting after DELAY
            let noiseAmp = START_NOISE;
            if (activeElapsed < NOISE_DECAY_DURATION) {
                const progress = activeElapsed / NOISE_DECAY_DURATION;
                // Ease out cubic for smoother decay
                const t = 1 - Math.pow(1 - progress, 3);
                noiseAmp = START_NOISE - (START_NOISE - END_NOISE) * t;
            } else {
                noiseAmp = END_NOISE;
            }

            // Clear
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            // Glow & Blending Settings
            ctx.globalCompositeOperation = 'screen'; // Makes overlapping particles brighter
            ctx.fillStyle = '#E9A319'; // Brand Gold

            const particles = particlesRef.current;
            const targets = targetRef.current;
            const len = targets.length / 2; // Number of points

            for (let i = 0; i < len; i++) {
                const i4 = i * 4;  // Particle index (stride 4)
                const i2 = i * 2;  // Target index (stride 2)

                let x = particles[i4];
                let y = particles[i4 + 1];
                const speedMod = particles[i4 + 2];

                // Calculate Target Position in Screen Space
                const tx = cx + targets[i2] * scale;
                const ty = cy + targets[i2 + 1] * scale;

                // 1. Attraction Force (Move towards target) - ONLY AFTER DELAY
                if (isActive) {
                    const speed = BASE_SPEED * speedMod;
                    x += (tx - x) * speed;
                    y += (ty - y) * speed;
                }

                // 2. Smooth Drift (Sine Wave)
                // Using the stored phase and elapsed time to create a smooth, slow oscillation
                const phase = particles[i4 + 3];
                x += Math.sin(elapsed * 0.002 + phase) * noiseAmp;
                y += Math.cos(elapsed * 0.003 + phase) * noiseAmp;

                // Update
                particles[i4] = x;
                particles[i4 + 1] = y;

                ctx.fillRect(x, y, PARTICLE_SIZE, PARTICLE_SIZE);
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        init();
        window.addEventListener('resize', init);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', init);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full drop-shadow-[0_0_6px_rgba(250,204,21,0.8)] blur-[0.3px]" />
            {/* Noise Overlay for texture */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.07] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.7%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%20opacity%3D%221%22%2F%3E%3C%2Fsvg%3E')]"></div>
        </div>
    );
};

export default ParticleCanvas;