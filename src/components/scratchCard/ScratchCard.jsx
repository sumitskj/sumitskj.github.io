import { useEffect } from "react";

function ScratchCard() {
  useEffect(() => {
    initScratching();
  }, []);

  const initScratching = () => {
    const canvas = document.getElementById("scratchCanvas");
    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Fill canvas with scratch layer
    ctx.fillStyle = "#999";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal", canvas.width / 2, canvas.height / 2 + 8);

    let isDrawing = false;

    function getXY(e) {
      if (e.touches) {
        const rect = canvas.getBoundingClientRect();
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      } else {
        return {
          x: e.offsetX,
          y: e.offsetY,
        };
      }
    }

    function clearCircle(x, y) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2, false);
      ctx.fill();
    }

    function startDrawing(e) {
      e.preventDefault();
      isDrawing = true;
      const { x, y } = getXY(e);
      clearCircle(x, y);
    }

    function draw(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const { x, y } = getXY(e);
      clearCircle(x, y);
    }

    function stopDrawing() {
      isDrawing = false;
    }

    // Mouse events
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    // Touch events
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);
  };
  return (
    <div class="relative w-[300px] h-[150px] border-2 shadow-lg bg-white touch-none">
      <div class="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800 z-0">
        🎉 You Win! 🎉
      </div>

      <canvas id="scratchCanvas" class="absolute inset-0 z-10"></canvas>
    </div>
  );
}

export default ScratchCard;
