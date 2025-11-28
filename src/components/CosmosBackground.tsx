import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface Comet {
  x: number;
  y: number;
  speed: number;
  length: number;
  angle: number;
  opacity: number;
}

export const CosmosBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Theme-based colors
    const getThemeColors = () => {
      switch (theme) {
        case 'white':
          return {
            star: 'rgba(100, 100, 120, ',
            comet: 'rgba(120, 120, 140, ',
          };
        case 'cyberpunk':
          return {
            star: 'rgba(138, 43, 226, ',
            comet: 'rgba(75, 0, 130, ',
          };
        default: // black
          return {
            star: 'rgba(200, 200, 220, ',
            comet: 'rgba(180, 180, 200, ',
          };
      }
    };

    // Create stars
    const stars: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    // Create comets
    const comets: Comet[] = [];
    const maxComets = 3;

    const createComet = () => {
      const side = Math.floor(Math.random() * 4);
      let x, y, angle;

      switch (side) {
        case 0: // top
          x = Math.random() * canvas.width;
          y = -50;
          angle = Math.PI / 4 + Math.random() * Math.PI / 4;
          break;
        case 1: // right
          x = canvas.width + 50;
          y = Math.random() * canvas.height;
          angle = Math.PI - Math.random() * Math.PI / 4;
          break;
        case 2: // bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 50;
          angle = -Math.PI / 4 - Math.random() * Math.PI / 4;
          break;
        default: // left
          x = -50;
          y = Math.random() * canvas.height;
          angle = Math.random() * Math.PI / 4;
      }

      return {
        x,
        y,
        speed: Math.random() * 3 + 2,
        length: Math.random() * 60 + 40,
        angle,
        opacity: Math.random() * 0.4 + 0.3,
      };
    };

    // Animation loop
    let animationId: number;
    let lastCometTime = Date.now();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getThemeColors();

      // Draw and update stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${colors.star}${star.opacity})`;
        ctx.fill();

        // Move star
        star.x -= star.speed;
        if (star.x < -10) {
          star.x = canvas.width + 10;
          star.y = Math.random() * canvas.height;
        }
      });

      // Create new comets randomly
      const now = Date.now();
      if (comets.length < maxComets && now - lastCometTime > 3000 + Math.random() * 4000) {
        comets.push(createComet());
        lastCometTime = now;
      }

      // Draw and update comets
      comets.forEach((comet, index) => {
        const gradient = ctx.createLinearGradient(
          comet.x,
          comet.y,
          comet.x - Math.cos(comet.angle) * comet.length,
          comet.y - Math.sin(comet.angle) * comet.length
        );
        gradient.addColorStop(0, `${colors.comet}${comet.opacity})`);
        gradient.addColorStop(1, `${colors.comet}0)`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(
          comet.x - Math.cos(comet.angle) * comet.length,
          comet.y - Math.sin(comet.angle) * comet.length
        );
        ctx.stroke();

        // Move comet
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;

        // Remove comet if out of bounds
        if (
          comet.x < -100 ||
          comet.x > canvas.width + 100 ||
          comet.y < -100 ||
          comet.y > canvas.height + 100
        ) {
          comets.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};
