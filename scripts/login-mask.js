// Punch a rounded hole from .card-fill exactly where .highlight sits
(function () {
  const container = document.querySelector(".container");
  const cardFill = container.querySelector(".card-fill");
  const holeEl = container.querySelector(".highlight");

  function applyMask() {
    if (!container || !cardFill || !holeEl) return;

    const c = container.getBoundingClientRect();
    const h = holeEl.getBoundingClientRect();

    const x = Math.round(h.left - c.left);
    const y = Math.round(h.top - c.top);
    const w = Math.round(h.width);
    const ht = Math.round(h.height);

    // Read the (px) corner radius from .highlight
    const cs = getComputedStyle(holeEl);
    // Use the top-left radius; you can average or read others if asymmetrical
    const r = Math.round(parseFloat(cs.borderTopLeftRadius) || 0);

    // Build a tiny SVG that is a white rounded-rect; we’ll XOR it from the full mask
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${ht}">
          <rect width="${w}" height="${ht}" rx="${r}" ry="${r}" fill="white"/>
        </svg>`.replace(/\n+/g, "");

    const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
    const base = "linear-gradient(#fff 0 0)";

    // WebKit/Blink (Chrome/Safari/Edge)
    cardFill.style.webkitMaskImage = `${base}, ${url}`;
    cardFill.style.webkitMaskRepeat = "no-repeat, no-repeat";
    cardFill.style.webkitMaskSize = `100% 100%, ${w}px ${ht}px`;
    cardFill.style.webkitMaskPosition = `0 0, ${x}px ${y}px`;
    cardFill.style.webkitMaskComposite = "xor, source-over";

    // Spec-ish (Firefox is improving here; if unsupported, you just get the solid card)
    cardFill.style.maskImage = `${base}, ${url}`;
    cardFill.style.maskRepeat = "no-repeat, no-repeat";
    cardFill.style.maskSize = `100% 100%, ${w}px ${ht}px`;
    cardFill.style.maskPosition = `0 0, ${x}px ${y}px`;
    cardFill.style.maskComposite = "exclude, add";
  }

  // Apply on load, on resize, and whenever .highlight changes size
  const ro = new ResizeObserver(applyMask);
  ro.observe(container);
  ro.observe(holeEl);

  window.addEventListener("resize", applyMask, { passive: true });
  window.addEventListener("orientationchange", applyMask, { passive: true });

  // In case fonts load and shift layout
  window.addEventListener("load", applyMask);
  applyMask();
})();
