import React, { useRef, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function VideoPlayerCanvas({ camera, privacyMasking, aiOverlaysEnabled, zoomLevel = 1.0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let tick = 0;

    const renderFrame = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Clean dark canvas stream background
      ctx.fillStyle = '#0B0F17';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Perspective platform lines
      ctx.strokeStyle = '#1F2937';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.4);
      ctx.lineTo(canvas.width, canvas.height * 0.4);
      ctx.moveTo(canvas.width * 0.2, canvas.height * 0.4);
      ctx.lineTo(0, canvas.height);
      ctx.moveTo(canvas.width * 0.8, canvas.height * 0.4);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.stroke();

      // Commuters
      const numPeople = camera?.camera_id === 'CAM-202' ? 6 : 3;
      for (let i = 0; i < numPeople; i++) {
        const px = (canvas.width * 0.2) + (i * 50) + (Math.sin((tick + i * 20) * 0.03) * 15);
        const py = (canvas.height * 0.45) + (i * 25);
        const pw = 28;
        const ph = 65;

        // Silhouette
        ctx.fillStyle = '#1F2937';
        ctx.fillRect(px, py, pw, ph);

        // Face Privacy Pixelation (Clean slate blur box)
        if (privacyMasking) {
          ctx.fillStyle = 'rgba(156, 163, 175, 0.9)';
          ctx.fillRect(px + 6, py + 2, 16, 16);
        }

        // Bounding Boxes if Overlays enabled
        if (aiOverlaysEnabled) {
          ctx.strokeStyle = '#111827';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(px, py, pw, ph);

          // Tag Label
          ctx.fillStyle = '#111827';
          ctx.fillRect(px, py - 16, 68, 16);
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 9px Inter, sans-serif';
          ctx.fillText(`Person #${101 + i}`, px + 4, py - 4);
        }
      }

      // Special Incident Bounding Box for CAM-002 / CAM-003 (Clean Red Solid Outline)
      if ((camera?.camera_id === 'CAM-002' || camera?.camera_id === 'CAM-003') && aiOverlaysEnabled) {
        const ox = canvas.width * 0.58;
        const oy = canvas.height * 0.62;
        const ow = 45;
        const oh = 35;

        ctx.strokeStyle = '#DC2626';
        ctx.lineWidth = 2;
        ctx.strokeRect(ox, oy, ow, oh);

        ctx.fillStyle = '#DC2626';
        ctx.fillRect(ox, oy - 20, 130, 20);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.fillText('Unattended Bag 96.4%', ox + 5, oy - 5);
      }

      // Telemetry Overlay
      ctx.fillStyle = 'rgba(17, 24, 39, 0.88)';
      ctx.fillRect(10, 10, 210, 38);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, 210, 38);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(camera?.location || 'Camera Stream', 18, 25);
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(`${camera?.camera_id || 'CAM'} · LIVE · 30.0 FPS`, 18, 40);

      animationId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [camera, privacyMasking, aiOverlaysEnabled]);

  return (
    <div className="relative w-full h-full bg-slate-950 rounded-lg overflow-hidden border border-slate-200">
      <canvas
        ref={canvasRef}
        width={480}
        height={270}
        className="w-full h-full object-cover transition-transform"
        style={{ transform: `scale(${zoomLevel})` }}
      />
      {camera?.status === 'ALERT' && (
        <div className="absolute top-3 right-3 bg-red-600 text-white border border-red-500 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
          <AlertCircle className="w-3 h-3" /> ALERT ACTIVE
        </div>
      )}
    </div>
  );
}
