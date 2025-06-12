const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let colorMode = false;
let globalSpeed = 0.5;
let pointCount = 200;
let attractionRadius = 80;

const mouse = { x: null, y: null };

// Suivi précis de la souris dans les limites du canvas
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

// Réactive la souris quand elle entre dans le canvas
canvas.addEventListener("mouseenter", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

// Désactive l'effet de la souris quand elle sort du canvas
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
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
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
