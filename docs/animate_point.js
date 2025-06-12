const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let colorMode = false;
let globalSpeed = 0.5;
let pointCount = 200;
let attractionRadius = 80;
let arcMinDistance = 30;
let useCurves = false;
let useZigzag = false;
let useLightning = false;
let useWave = false;



const mouse = { x: null, y: null };

// Suivi précis de la souris dans les limites du canvas
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

canvas.addEventListener("mouseenter", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

canvas.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

function getRandomColor() {
  if (!colorMode) return { r: 255, g: 255, b: 255 };
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

class Point {
  constructor() {
    this.radius = Math.random() * 2 + 1;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 0.8 + 0.2;
    this.dx = Math.cos(angle) * speed;
    this.dy = Math.sin(angle) * speed;
    this.color = getRandomColor();
  }

  move() {
    this.x += this.dx * globalSpeed;
    this.y += this.dy * globalSpeed;

    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

    if (mouse.x !== null && mouse.y !== null) {
      const dxMouse = mouse.x - this.x;
      const dyMouse = mouse.y - this.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      if (distMouse < attractionRadius) {
        const force = (attractionRadius - distMouse) / attractionRadius;
        const directionX = dxMouse / distMouse;
        const directionY = dyMouse / distMouse;

        this.x += directionX * force * 5;
        this.y += directionY * force * 5;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
    ctx.fill();
  }
}

let points = [];

function generatePoints() {
  points = Array.from({ length: pointCount }, () => new Point());
}

function mixColors(c1, c2) {
  return {
    r: Math.floor((c1.r + c2.r) / 2),
    g: Math.floor((c1.g + c2.g) / 2),
    b: Math.floor((c1.b + c2.b) / 2),
  };
}

function connectPoints() {
  const maxDist = 120;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const opacity = 1 - dist / maxDist;
        const color = mixColors(points[i].color, points[j].color);

        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;

        ctx.beginPath();

        if (useCurves) {
          // Mode courbes (quadratic Bézier)
          const midX = (points[i].x + points[j].x) / 2;
          const midY = (points[i].y + points[j].y) / 2;
          const controlX = midX + (dy / dist) * dist * 0.3;
          const controlY = midY - (dx / dist) * dist * 0.3;
          ctx.moveTo(points[i].x, points[i].y);
          ctx.quadraticCurveTo(controlX, controlY, points[j].x, points[j].y);
        } else if (useZigzag) {
          // Mode zigzag fort
          const offset = dist * 0.6;
          const directionX = dx / dist;
          const directionY = dy / dist;
          const normalX = -directionY;
          const normalY = directionX;

          const midX = (points[i].x + points[j].x) / 2 + normalX * offset;
          const midY = (points[i].y + points[j].y) / 2 + normalY * offset;

          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(midX, midY);
          ctx.lineTo(points[j].x, points[j].y);
        } else if (useLightning) {
          // ⚡ Mode éclair : segments anguleux chaotiques
          const steps = 5;
          const offset = 15;
          const path = [];

          for (let s = 0; s <= steps; s++) {
            const t = s / steps;
            const x = points[i].x + (points[j].x - points[i].x) * t;
            const y = points[i].y + (points[j].y - points[i].y) * t;
            const ox = (Math.random() - 0.5) * offset;
            const oy = (Math.random() - 0.5) * offset;
            path.push({ x: x + ox, y: y + oy });
          }

          ctx.moveTo(path[0].x, path[0].y);
          for (let k = 1; k < path.length; k++) {
            ctx.lineTo(path[k].x, path[k].y);
          }
        } else if (useWave) {
          // 🌊 Mode onde sinusoïdale
          const segments = 30;
          const amplitude = 10;
          const directionX = dx / dist;
          const directionY = dy / dist;
          const normalX = -directionY;
          const normalY = directionX;

          ctx.moveTo(points[i].x, points[i].y);

          for (let s = 1; s <= segments; s++) {
            const t = s / segments;
            const px = points[i].x + dx * t;
            const py = points[i].y + dy * t;
            const waveOffset = Math.sin(t * Math.PI * 2) * amplitude;

            const x = px + normalX * waveOffset;
            const y = py + normalY * waveOffset;

            ctx.lineTo(x, y);
          }

          ctx.lineTo(points[j].x, points[j].y);
        } else {
          // Mode lignes droites simple
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
        }

        ctx.stroke();
      }
    }
  }
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points.forEach((p) => {
    p.move();
    p.draw();
  });
  connectPoints();
  requestAnimationFrame(animate);
}

generatePoints();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  generatePoints();
});

// 🎛️ Interactions avec les contrôles HTML
document.getElementById("colorModeToggle").addEventListener("change", (e) => {
  colorMode = e.target.checked;
  generatePoints();
});

document.getElementById("sliderVitesse").addEventListener("input", (e) => {
  globalSpeed = parseFloat(e.target.value);
});

document.getElementById("sliderPoints").addEventListener("input", (e) => {
  pointCount = parseInt(e.target.value);
  generatePoints();
});

document.getElementById("sliderRayon").addEventListener("input", (e) => {
  attractionRadius = parseInt(e.target.value);
});

document.querySelectorAll('input[name="lineMode"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    useCurves = e.target.value === "curves";
    useZigzag = e.target.value === "zigzag";
    useLightning = e.target.value === "lightning";
    useWave = e.target.value === "wave";
  });
});





