const explosionAnimation = () => {
  const colors = ["#ffc000", "#ff3b3b", "#ff8400"];
  const bubbles = 25;

  const explode = (x: number, y: number) => {
    let particles = [];
    let ratio = window.devicePixelRatio;
    let c = document.createElement("canvas");
    let ctx = c.getContext("2d");

    c.style.position = "absolute";
    c.style.left = x - 100 + "px";
    c.style.top = y - 100 + "px";
    c.style.pointerEvents = "none";
    c.style.width = 200 + "px";
    c.style.height = 200 + "px";
    c.style.zIndex = "100";
    c.width = 200 * ratio;
    c.height = 200 * ratio;
    document.body.appendChild(c);

    for (var i = 0; i < bubbles; i++) {
      particles.push({
        x: c.width / 2,
        y: c.height / 2,
        radius: r(20, 30, 0),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: r(0, 360, 1),
        speed: r(8, 12, 0),
        friction: 0.9,
        opacity: r(0, 0.5, 1),
        yVel: 0,
        gravity: 0.1,
      });
    }

    render(particles, ctx, c.width, c.height);
    setTimeout(() => document.body.removeChild(c), 4000);
  };

  const render = (
    particles: any[],
    ctx: CanvasRenderingContext2D | null,
    width: number,
    height: number,
  ) => {
    if (ctx === null) return;
    requestAnimationFrame(() => render(particles, ctx, width, height));
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      p.x += p.speed * Math.cos((p.rotation * Math.PI) / 180);
      p.y += p.speed * Math.sin((p.rotation * Math.PI) / 180);

      p.opacity -= 0.01;
      p.speed *= p.friction;
      p.radius *= p.friction;
      p.yVel += p.gravity;
      p.y += p.yVel;

      if (p.opacity < 0 || p.radius < 0) return;

      ctx.beginPath();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    });

    return ctx;
  };

  const r = (a: number, b: number, c: number) =>
    parseFloat(
      (Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(
        c ? c : 0,
      ),
    );

  return explode;
};

type Coords = { x: number; y: number };

export default function triggerExplosionAnimation(clockCoords: Coords) {
  const { x, y } = clockCoords;
  const explode = explosionAnimation();
  setTimeout(() => {
    explode(x + 10, y - y / 2.25);
  }, 300);
  setTimeout(() => {
    explode(x + 50, y - y / 2);
  }, 100);
  setTimeout(() => {
    explode(x, y - y / 2.1);
  }, 200);
  setTimeout(() => {
    explode(x + 20, y - y / 1.7);
  }, 350);
  setTimeout(() => {
    explode(x + 80, y - y / 1.55);
  }, 200);
  setTimeout(() => {
    explode(x + 60, y - y / 2.15);
  }, 400);
  setTimeout(() => {
    explode(x + 70, y - y / 1.75);
  }, 500);
}
