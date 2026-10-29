// Animated space background with moving planets and stars.
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
const stars = [];
let width = window.innerWidth;
let height = window.innerHeight;
let lastTime = 0;
let elapsed = 0;

function resizeCanvas() {
  width = canvas.width = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
  height = canvas.height = window.innerHeight * Math.min(window.devicePixelRatio || 1, 2);
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(Math.min(window.devicePixelRatio || 1, 2), 0, 0, Math.min(window.devicePixelRatio || 1, 2), 0, 0);
  width = window.innerWidth;
  height = window.innerHeight;
  makeStars();
}

function makeStars() {
  stars.length = 0;
  const total = Math.min(280, Math.floor((width * height) / 4200));
  for (let i = 0; i < total; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.25,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.22 + 0.025,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function glow(x, y, radius, color) {
  const light = ctx.createRadialGradient(x, y, 0, x, y, radius);
  light.addColorStop(0, color);
  light.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlanet(x, y, radius, color, highlight, phase) {
  const pulse = 1 + Math.sin(phase) * 0.07;
  const r = radius * pulse;
  glow(x, y, r * 2.8, highlight);

  const surface = ctx.createRadialGradient(x - r * 0.38, y - r * 0.42, r * 0.04, x, y, r);
  surface.addColorStop(0, '#fff4d8');
  surface.addColorStop(0.28, color);
  surface.addColorStop(0.78, color);
  surface.addColorStop(1, '#080b18');
  ctx.fillStyle = surface;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = 'rgba(8, 12, 28, 0.18)';
  ctx.fillRect(x, y - r, r, r * 2);
  ctx.restore();
}

function drawEarth(x, y, radius, phase) {
  drawPlanet(x, y, radius, '#2678d7', 'rgba(70, 150, 255, 0.22)', phase);
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.96, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = '#45b879';
  ctx.beginPath();
  ctx.ellipse(x - radius * 0.22, y - radius * 0.18, radius * 0.3, radius * 0.19, -0.55, 0, Math.PI * 2);
  ctx.ellipse(x + radius * 0.27, y + radius * 0.22, radius * 0.22, radius * 0.13, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(235, 249, 255, 0.45)';
  ctx.lineWidth = Math.max(1, radius * 0.07);
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.86, -1.5, 1.25);
  ctx.stroke();
  ctx.restore();
}

function drawSaturn(x, y, radius, phase) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.28 + Math.sin(phase) * 0.04);
  ctx.strokeStyle = 'rgba(221, 190, 145, 0.28)';
  ctx.lineWidth = Math.max(2, radius * 0.45);
  ctx.beginPath();
  ctx.ellipse(0, 0, radius * 1.8, radius * 0.58, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  drawPlanet(x, y, radius, '#d7b78a', 'rgba(227, 188, 125, 0.18)', phase);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.28 + Math.sin(phase) * 0.04);
  ctx.strokeStyle = 'rgba(247, 220, 176, 0.8)';
  ctx.lineWidth = Math.max(1, radius * 0.09);
  ctx.beginPath();
  ctx.ellipse(0, 0, radius * 1.8, radius * 0.58, 0, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawJupiter(x, y, radius, phase) {
  drawPlanet(x, y, radius, '#c99a72', 'rgba(223, 166, 120, 0.16)', phase);
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.94, 0, Math.PI * 2);
  ctx.clip();
  for (let i = -2; i <= 2; i++) {
    ctx.strokeStyle = i % 2 ? 'rgba(255, 220, 180, 0.4)' : 'rgba(100, 61, 48, 0.35)';
    ctx.lineWidth = Math.max(1, radius * 0.13);
    ctx.beginPath();
    ctx.ellipse(x, y + i * radius * 0.25, radius * 0.9, radius * 0.12, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawOrbit(cx, cy, rx, ry, rotation) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.strokeStyle = 'rgba(150, 180, 255, 0.10)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function orbitPoint(cx, cy, rx, ry, angle, rotation) {
  const x = Math.cos(angle) * rx;
  const y = Math.sin(angle) * ry;
  return {
    x: cx + x * Math.cos(rotation) - y * Math.sin(rotation),
    y: cy + x * Math.sin(rotation) + y * Math.cos(rotation)
  };
}

function drawSpace(time) {
  if (!lastTime) lastTime = time;
  const delta = Math.min((time - lastTime) / 1000, 0.05);
  lastTime = time;
  elapsed += delta;

  ctx.clearRect(0, 0, width, height);
  const sky = ctx.createLinearGradient(0, 0, width, height);
  sky.addColorStop(0, 'rgba(4, 8, 25, 0.45)');
  sky.addColorStop(0.5, 'rgba(24, 13, 48, 0.28)');
  sky.addColorStop(1, 'rgba(2, 13, 29, 0.4)');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  glow(width * 0.18, height * 0.35, Math.min(width, height) * 0.48, 'rgba(51, 61, 150, 0.07)');
  glow(width * 0.82, height * 0.72, Math.min(width, height) * 0.4, 'rgba(96, 35, 120, 0.07)');

  stars.forEach((star) => {
    star.y += star.speed * (delta * 60);
    if (star.y > height) {
      star.y = 0;
      star.x = Math.random() * width;
    }
    const twinkle = 0.55 + Math.sin(elapsed * 1.8 + star.phase) * 0.4;
    ctx.globalAlpha = star.alpha * twinkle;
    ctx.fillStyle = '#dcecff';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  const scale = Math.min(width / 1000, height / 700, 1.15);
  const cx = width * 0.52;
  const cy = height * 0.52;
  const rx = Math.min(width * 0.39, 470);
  const ry = Math.min(height * 0.34, 260);
  const rotation = -0.12;

  // Orbit paths are intentionally faint behind the page content.
  drawOrbit(cx, cy, rx * 0.28, ry * 0.28, rotation);
  drawOrbit(cx, cy, rx * 0.43, ry * 0.42, rotation);
  drawOrbit(cx, cy, rx * 0.59, ry * 0.57, rotation);
  drawOrbit(cx, cy, rx * 0.75, ry * 0.73, rotation);
  drawOrbit(cx, cy, rx * 0.91, ry * 0.89, rotation);
  drawOrbit(cx, cy, Math.min(width * 0.47, 540), Math.min(height * 0.43, 310), rotation);

  // The Sun gently pulses instead of staying completely still.
  const sun = orbitPoint(width * 0.84, height * 0.22, width * 0.012, height * 0.014, elapsed * 0.18, 0);
  const sunSize = Math.max(17, Math.min(43, width * 0.038)) * (1 + Math.sin(elapsed * 1.3) * 0.09);
  glow(sun.x, sun.y, sunSize * 3.4, 'rgba(255, 136, 28, 0.22)');
  drawPlanet(sun.x, sun.y, sunSize, '#f5a623', 'rgba(255, 174, 48, 0.3)', elapsed * 1.2);

  const mercury = orbitPoint(cx, cy, rx * 0.28, ry * 0.28, elapsed * 0.42, rotation);
  drawPlanet(mercury.x, mercury.y, Math.max(3, 5 * scale), '#a9a39b', 'rgba(180, 170, 160, 0.1)', elapsed * 2);

  const venus = orbitPoint(cx, cy, rx * 0.43, ry * 0.42, elapsed * 0.25 + 1.4, rotation);
  drawPlanet(venus.x, venus.y, Math.max(5, 8 * scale), '#d6a66c', 'rgba(220, 165, 95, 0.13)', elapsed * 1.5);

  const earth = orbitPoint(cx, cy, rx * 0.59, ry * 0.57, elapsed * 0.19 + 2.8, rotation);
  drawEarth(earth.x, earth.y, Math.max(7, 11 * scale), elapsed);

  const mars = orbitPoint(cx, cy, rx * 0.75, ry * 0.73, elapsed * 0.14 + 4.1, rotation);
  drawPlanet(mars.x, mars.y, Math.max(6, 9 * scale), '#c75c42', 'rgba(235, 90, 65, 0.15)', elapsed * 1.4);

  const jupiter = orbitPoint(cx, cy, rx * 0.91, ry * 0.89, elapsed * 0.09 + 0.6, rotation);
  drawJupiter(jupiter.x, jupiter.y, Math.max(11, 18 * scale), elapsed * 0.7);

  const saturn = orbitPoint(cx, cy, rx * 0.75, ry * 0.73, elapsed * 0.11 + 2.2, rotation);
  drawSaturn(saturn.x, saturn.y, Math.max(9, 14 * scale), elapsed);

  const uranus = orbitPoint(cx, cy, rx * 0.59, ry * 0.57, elapsed * 0.13 + 5.2, rotation);
  drawPlanet(uranus.x, uranus.y, Math.max(5, 8 * scale), '#75d4d6', 'rgba(100, 220, 230, 0.12)', elapsed);

  const neptune = orbitPoint(cx, cy, rx * 0.43, ry * 0.42, elapsed * 0.16 + 4.7, rotation);
  drawPlanet(neptune.x, neptune.y, Math.max(5, 8 * scale), '#4169e1', 'rgba(65, 105, 225, 0.14)', elapsed * 0.8);

  const pluto = orbitPoint(cx, cy, Math.min(width * 0.47, 540), Math.min(height * 0.43, 310), elapsed * 0.055 + 3.4, rotation + 0.18);
  drawPlanet(pluto.x, pluto.y, Math.max(3, 5 * scale), '#b9a99a', 'rgba(190, 170, 150, 0.1)', elapsed * 0.6);

  // A separate Moon slowly circles Earth to make the scene feel alive.
  const moonX = earth.x + Math.cos(elapsed * 0.9) * Math.max(12, 18 * scale);
  const moonY = earth.y + Math.sin(elapsed * 0.9) * Math.max(7, 10 * scale);
  drawPlanet(moonX, moonY, Math.max(3, 4.5 * scale), '#b9c4d5', 'rgba(170, 195, 230, 0.12)', elapsed * 2);

  // Occasional shooting stars travel across the sky.
  if (Math.random() > 0.985) {
    const sx = Math.random() * width;
    const sy = Math.random() * height * 0.65;
    const trail = ctx.createLinearGradient(sx, sy, sx - 70, sy + 35);
    trail.addColorStop(0, 'rgba(210, 235, 255, 0.8)');
    trail.addColorStop(1, 'rgba(210, 235, 255, 0)');
    ctx.strokeStyle = trail;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx - 70, sy + 35);
    ctx.stroke();
  }

  requestAnimationFrame(drawSpace);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
requestAnimationFrame(drawSpace);

const cursorGlow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = event.clientX + 'px';
  cursorGlow.style.top = event.clientY + 'px';
});

document.querySelectorAll('.skill-card, .project-card').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    if (window.innerWidth < 768) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    card.style.transform = 'perspective(1000px) rotateX(' + (-y / 30) + 'deg) rotateY(' + (x / 30) + 'deg) translateY(-3px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// Mobile navigation menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
