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

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false });

        let w, h;
        let cx, cy;
        let scale;
        let animationFrameId;

        // Helper to parse SVG content
        const parseSVG = (text) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'image/svg+xml');
            const segments = [];

            // Helper to recursively find transforms
            const getTransform = (el) => {
                let transform = '';
                let current = el;
                while (current && current !== doc) {
                    if (current.getAttribute && current.getAttribute('transform')) {
                        transform += current.getAttribute('transform') + ' ';
                    }
                    current = current.parentNode;
                }
                return transform;
            };

            const applyTransform = (x, y, transform) => {
                if (!transform) return { x, y };
                // Simple handler for the specific rotation we know exists
                if (transform.includes('rotate(90 50 50)')) {
                    // Rotate 90 deg around 50,50: (x, y) -> (100-y, x)
                    return { x: 100 - y, y: x };
                }
                return { x, y };
            };

            // Process Lines
            doc.querySelectorAll('line').forEach(line => {
                const t = getTransform(line);
                const x1 = parseFloat(line.getAttribute('x1'));
                const y1 = parseFloat(line.getAttribute('y1'));
                const x2 = parseFloat(line.getAttribute('x2'));
                const y2 = parseFloat(line.getAttribute('y2'));

                const p1 = applyTransform(x1, y1, t);
                const p2 = applyTransform(x2, y2, t);
                segments.push({ p1, p2 });
            });

            // Process Polygons
            doc.querySelectorAll('polygon').forEach(poly => {
                const t = getTransform(poly);
                const pointsRaw = poly.getAttribute('points').trim().split(/[\s,]+/);
                const coords = [];
                for (let i = 0; i < pointsRaw.length; i += 2) {
                    coords.push({
                        x: parseFloat(pointsRaw[i]),
                        y: parseFloat(pointsRaw[i + 1])
                    });
                }

                for (let i = 0; i < coords.length; i++) {
                    const a = coords[i];
                    const b = coords[(i + 1) % coords.length];
                    const pa = applyTransform(a.x, a.y, t);
                    const pb = applyTransform(b.x, b.y, t);
                    segments.push({ p1: pa, p2: pb });
                }
            });

            return segments;
        };

        const generatePointsFromSegments = (segments, totalParticles) => {
            const points = [];

            // Calculate total length to distribute particles evenly
            let totalLength = 0;
            segments.forEach(seg => {
                seg.length = Math.hypot(seg.p2.x - seg.p1.x, seg.p2.y - seg.p1.y);
                totalLength += seg.length;
            });

            segments.forEach(seg => {
                // Proportional number of particles
                const count = Math.floor((seg.length / totalLength) * totalParticles);

                const dx = seg.p2.x - seg.p1.x;
                const dy = seg.p2.y - seg.p1.y;
                // Perpendicular vector for thickness
                const len = Math.sqrt(dx * dx + dy * dy);
                const nx = -dy / len; // Normal X
                const ny = dx / len;  // Normal Y

                for (let i = 0; i < count; i++) {
                    const t = Math.random();
                    let px = seg.p1.x + dx * t;
                    let py = seg.p1.y + dy * t;

                    // Apply thickness (random offset)
                    const offset = (Math.random() - 0.5) * THICKNESS; // Thickness in SVG units
                    px += nx * offset;
                    py += ny * offset;

                    // Normalize to -1..1 range (Assuming 0..100 SVG viewbox)
                    // (val - 50) / 50 => -1 to 1
                    points.push({
                        x: (px - 50) / 50,
                        y: (py - 50) / 50
                    });
                }
            });
            return points;
        };

        const init = async () => {
            if (!containerRef.current) return;

            // Fetch and Parse SVG
            try {
                const response = await fetch('/diamond.svg');
                const svgText = await response.text();
                const segments = parseSVG(svgText);
                const targets = generatePointsFromSegments(segments, PARTICLE_COUNT);

                // Setup Canvas
                w = containerRef.current.clientWidth;
                h = containerRef.current.clientHeight;
                const dpr = window.devicePixelRatio || 1;
                canvas.width = w * dpr;
                canvas.height = h * dpr;
                ctx.scale(dpr, dpr);

                cx = w / 2;
                cy = h / 2;
                // Scale factor: fit -1..1 diamond into screen
                scale = Math.min(w, h) * 0.35;

                // Initialize Particles
                if (particlesRef.current.length === 0) {
                    particlesRef.current = new Float32Array(targets.length * 4);
                    const randomGaussian = (mean, stdDev) => {
                        let u = 0, v = 0;
                        while (u === 0) u = Math.random();
                        while (v === 0) v = Math.random();
                        return mean + Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * stdDev;
                    };
                    const spread = Math.max(w, h) / 4.0;

                    for (let i = 0; i < targets.length; i++) {
                        const idx = i * 4;
                        particlesRef.current[idx] = randomGaussian(w / 2, spread);
                        particlesRef.current[idx + 1] = randomGaussian(h / 2, spread);
                        particlesRef.current[idx + 2] = 0.5 + Math.random();
                        particlesRef.current[idx + 3] = Math.random() * Math.PI * 2;
                    }
                }

                // Store targets
                targetRef.current = new Float32Array(targets.length * 2);
                for (let i = 0; i < targets.length; i++) {
                    targetRef.current[i * 2] = targets[i].x;
                    targetRef.current[i * 2 + 1] = targets[i].y;
                }

                // Start Loop
                if (!animationFrameId) {
                    requestRef.current = requestAnimationFrame(animate);
                }

            } catch (err) {
                console.error("Failed to load diamond SVG:", err);
            }
        };

        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const activeElapsed = Math.max(0, elapsed - ANIMATION_DELAY);
            const isActive = elapsed > ANIMATION_DELAY;

            let noiseAmp = START_NOISE;
            if (activeElapsed < NOISE_DECAY_DURATION) {
                const progress = activeElapsed / NOISE_DECAY_DURATION;
                const t = 1 - Math.pow(1 - progress, 3);
                noiseAmp = START_NOISE - (START_NOISE - END_NOISE) * t;
            } else {
                noiseAmp = END_NOISE;
            }

            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);

            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = '#FFBF00';

            const particles = particlesRef.current;
            const targets = targetRef.current;
            const len = targets.length / 2;

            if (len === 0) return; // Not ready

            for (let i = 0; i < len; i++) {
                const i4 = i * 4;
                const i2 = i * 2;

                let x = particles[i4];
                let y = particles[i4 + 1];
                const speedMod = particles[i4 + 2];

                const tx = cx + targets[i2] * scale;
                const ty = cy + targets[i2 + 1] * scale;

                if (isActive) {
                    const speed = BASE_SPEED * speedMod;
                    x += (tx - x) * speed;
                    y += (ty - y) * speed;
                }

                const phase = particles[i4 + 3];
                x += Math.sin(elapsed * 0.002 + phase) * noiseAmp;
                y += Math.cos(elapsed * 0.003 + phase) * noiseAmp;

                particles[i4] = x;
                particles[i4 + 1] = y;

                ctx.fillRect(x, y, PARTICLE_SIZE, PARTICLE_SIZE);
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        init();

        const handleResize = () => {
            // Re-calculate canvas size but don't reload particles necessarily
            // For simplicity, we can just re-run init to rescale
            init();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full drop-shadow-[0_0_6px_rgba(233,163,25,0.8)] blur-[0.3px]" />
            {/* Noise Overlay for texture */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.07] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.7%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%20opacity%3D%221%22%2F%3E%3C%2Fsvg%3E')]"></div>
        </div>
    );
};

export default ParticleCanvas;