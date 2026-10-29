// Space background: stars, a sun, Mars and the moon.
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
const stars = [];
let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  makeStars();
}

function makeStars() {
  stars.length = 0;
  const total = Math.min(180, Math.floor((width * height) / 8500));
  for (let i = 0; i < total; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.25 + 0.04
    });
  }
}

function drawPlanet(x, y, radius, color, glow) {
  const light = ctx.createRadialGradient(x - radius * 0.35, y - radius * 0.35, radius * 0.05, x, y, radius * 1.8);
  light.addColorStop(0, glow);
  light.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
  ctx.fill();

  const planet = ctx.createRadialGradient(x - radius * 0.35, y - radius * 0.4, radius * 0.05, x, y, radius);
  planet.addColorStop(0, '#fff1bd');
  planet.addColorStop(0.35, color);
  planet.addColorStop(1, '#111827');
  ctx.fillStyle = planet;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawSpace() {
  ctx.clearRect(0, 0, width, height);
  const sky = ctx.createLinearGradient(0, 0, width, height);
  sky.addColorStop(0, 'rgba(6, 10, 28, 0.25)');
  sky.addColorStop(0.55, 'rgba(22, 13, 48, 0.18)');
  sky.addColorStop(1, 'rgba(2, 12, 26, 0.25)');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  stars.forEach((star) => {
    star.y += star.speed;
    if (star.y > height) {
      star.y = 0;
      star.x = Math.random() * width;
    }
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = '#dcecff';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Keep the celestial objects subtle so the portfolio text stays readable.
  drawPlanet(width * 0.86, height * 0.22, Math.min(48, width * 0.045), '#f59e0b', 'rgba(255, 160, 40, 0.18)');
  drawPlanet(width * 0.12, height * 0.72, Math.min(25, width * 0.025), '#c45d46', 'rgba(235, 90, 65, 0.15)');

  const moonX = width * 0.73;
  const moonY = height * 0.76;
  drawPlanet(moonX, moonY, Math.min(19, width * 0.02), '#aab8ce', 'rgba(170, 195, 230, 0.13)');
  ctx.fillStyle = 'rgba(65, 77, 100, 0.55)';
  [[-5, -3, 3], [6, 5, 2], [2, -8, 2.5]].forEach(([dx, dy, r]) => {
    ctx.beginPath();
    ctx.arc(moonX + dx, moonY + dy, r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawSpace);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
drawSpace();

const cursorGlow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (event) => {
  cursorGlow.style.left = event.clientX + 'px';
  cursorGlow.style.top = event.clientY + 'px';
});

document.querySelectorAll('.skill-card, .project-card').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    card.style.transform = 'perspective(1000px) rotateX(' + (-y / 20) + 'deg) rotateY(' + (x / 20) + 'deg) translateY(-3px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
