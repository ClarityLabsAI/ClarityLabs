import React, { useEffect, useRef } from 'react';
import { BRAND_GOLD as GOLD } from '../constants/theme';

const ChladniPlate = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef(null);
  const animationRef = useRef(null);

  // Perf-sensitive: keep particle count moderate to stay responsive.
  const particleCount = 12000;
  const m = 3;
  const n = 2;
  const mPI = m * Math.PI;
  const nPI = n * Math.PI;
  const exclusionW = 0.62;  // Width of center exclusion zone (for text)
  const exclusionH = 0.42;  // Height of center exclusion zone

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
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
    
    const inExclusion = (px, py) => {
      return Math.abs(px) < exclusionW && Math.abs(py) < exclusionH;
    };
    
    // Initialize particles
    if (!particlesRef.current) {
      const x = new Float32Array(particleCount);
      const y = new Float32Array(particleCount);
      const vx = new Float32Array(particleCount);
      const vy = new Float32Array(particleCount);
      const age = new Float32Array(particleCount);
      
      for (let i = 0; i < particleCount; i++) {
        let px, py;
        do {
          px = Math.random() * 2 - 1;
          py = Math.random() * 2 - 1;
        } while (inExclusion(px, py));
        x[i] = px;
        y[i] = py;
        age[i] = Math.random() * 100;
      }
      
      particlesRef.current = { x, y, vx, vy, age };
    }
    
    const p = particlesRef.current;
    let lastTime = 0;
    const frameInterval = 1000 / 60;
    
    const animate = (currentTime) => {
      animationRef.current = requestAnimationFrame(animate);
      
      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      for (let i = 0; i < particleCount; i++) {
        let px = p.x[i];
        let py = p.y[i];
        
        const outOfBounds = px < -1 || px > 1 || py < -1 || py > 1;
        const inCenter = inExclusion(px, py);
        
        if (outOfBounds || inCenter) {
          do {
            px = Math.random() * 2 - 1;
            py = Math.random() * 2 - 1;
          } while (inExclusion(px, py));
          p.x[i] = px;
          p.y[i] = py;
          p.vx[i] = 0;
          p.vy[i] = 0;
        }
        
        const cg = chladniWithGrad(px, py);
        
        const force = 0.0005;
        const damping = 0.94;
        
        p.vx[i] = (p.vx[i] - cg.dx * cg.value * force + (Math.random() - 0.5) * 0.00015) * damping;
        p.vy[i] = (p.vy[i] - cg.dy * cg.value * force + (Math.random() - 0.5) * 0.00015) * damping;
        
        p.x[i] = px + p.vx[i];
        p.y[i] = py + p.vy[i];
        
        p.age[i] += 0.3;
        
        const screenX = centerX + px * scaleX;
        const screenY = centerY + py * scaleY;
        
        const absValue = Math.abs(cg.value);
        const lightness = 50 + Math.sin(p.age[i] * 0.03) * 8;
        const alpha = 0.65 + Math.sin(p.age[i] * 0.04) * 0.15;
        const baseHue = 43; // approx GOLD hue
        const hue = baseHue + absValue * 4;
        const saturation = 78 + absValue * 10;
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.fillRect(screenX - 1, screenY - 1, 2, 2);
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