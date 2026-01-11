import confetti from "canvas-confetti";

// --- Hàm tiện ích bên ngoài ---
export const shootConfetti = () => {
  const duration = 1500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 } });
    confetti({ particleCount: 6, spread: 80, origin: { x: 0.5, y: 0.7 } });

    if (Date.now() < end) requestAnimationFrame(frame);
  })();
};