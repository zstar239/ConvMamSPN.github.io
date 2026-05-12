const fallbackManifest = {
  "domains": [
    {
      "id": "speed",
      "title": "SPEED",
      "subtitle": "Synthetic source-domain results",
      "description": "Predictions on synthetic spacecraft images with precise pose annotations.",
      "images": [
        "speed_best_img000192.jpg.png",
        "speed_best_img001079.jpg.png",
        "speed_best_img005589.jpg.png",
        "speed_best_img006658.jpg.png",
        "speed_best_img006732.jpg.png",
        "speed_best_img007889.jpg.png",
        "speed_best_img008966.jpg.png",
        "speed_best_img009464.jpg.png",
        "speed_best_img012234.jpg.png",
        "speed_best_img013532.jpg.png"
      ]
    },
    {
      "id": "synthetic",
      "title": "SPEED+ Synthetic",
      "subtitle": "Synthetic training-domain visualization",
      "description": "Predictions on synthetic spacecraft images.",
      "images": [
        "synthetic_best_img002848.jpg.png",
        "synthetic_best_img002878.jpg.png",
        "synthetic_best_img003077.jpg.png",
        "synthetic_best_img003157.jpg.png",
        "synthetic_best_img003200.jpg.png",
        "synthetic_best_img003261.jpg.png",
        "synthetic_best_img032827.jpg.png",
        "synthetic_best_img032902.jpg.png",
        "synthetic_best_img053030.jpg.png",
        "synthetic_best_img058328.jpg.png"
      ]
    },
    {
      "id": "lightbox",
      "title": "SPEED+ Lightbox",
      "subtitle": "Real target-domain results",
      "description": "Qualitative results under the Lightbox domain with background and illumination shift.",
      "images": [
        "lightbox_best_img000848.jpg.png",
        "lightbox_best_img000884.jpg.png",
        "lightbox_best_img001483.jpg.png",
        "lightbox_best_img002371.jpg.png",
        "lightbox_best_img003360.jpg.png",
        "lightbox_best_img003905.jpg.png",
        "lightbox_best_img006309.jpg.png",
        "lightbox_best_img006487.jpg.png",
        "lightbox_best_img006638.jpg.png",
        "lightbox_best_img006739.jpg.png"
      ]
    },
    {
      "id": "sunlamp",
      "title": "SPEED+ Sunlamp",
      "subtitle": "Real target-domain results",
      "description": "Qualitative results under strong illumination and severe appearance shift.",
      "images": [
        "sunlamp_best_img000342.jpg.png",
        "sunlamp_best_img000418.jpg.png",
        "sunlamp_best_img000524.jpg.png",
        "sunlamp_best_img001264.jpg.png",
        "sunlamp_best_img001542.jpg.png",
        "sunlamp_best_img001571.jpg.png",
        "sunlamp_best_img001732.jpg.png",
        "sunlamp_best_img001878.jpg.png",
        "sunlamp_best_img001957.jpg.png",
        "sunlamp_best_img002641.jpg.png"
      ]
    }
  ]
};

const state = new Map();
const intervals = new Map();

function normalizeImagePath(name) {
  if (!name) return "";
  if (name.startsWith("http") || name.startsWith("assets/")) return name;
  return `assets/visual/${name}`;
}

function placeholderPath(id) {
  return `assets/placeholders/${id || "domain"}.svg`;
}

async function loadManifest() {
  try {
    const res = await fetch("assets/visual/manifest.json?v=" + Date.now(), { cache: "no-store" });
    if (!res.ok) throw new Error("manifest not found");
    const data = await res.json();
    if (!data.domains || !Array.isArray(data.domains)) throw new Error("invalid manifest");
    return data;
  } catch (error) {
    console.info("Using fallback visual manifest:", error.message);
    return fallbackManifest;
  }
}

function renderVisualGrid(manifest) {
  const root = document.getElementById("visualGrid");
  if (!root) return;
  root.innerHTML = "";

  manifest.domains.slice(0, 4).forEach((domain, domainIndex) => {
    const images = Array.isArray(domain.images) && domain.images.length > 0 ? domain.images : [placeholderPath(domain.id)];
    const safeId = domain.id || `domain-${domainIndex}`;
    const card = document.createElement("article");
    card.className = "visual-card";
    card.dataset.domain = safeId;
    const dots = images.map((_, i) => `<span class="dot${i === 0 ? " active" : ""}" aria-hidden="true"></span>`).join("");
    card.innerHTML = `
      <div class="visual-top">
        <h3>${domain.title || safeId}</h3>
      </div>
      <div class="carousel-frame">
        <img alt="${domain.title || safeId} qualitative result" loading="lazy" />
      </div>
      <div class="carousel-controls">
        <div class="dots">${dots}</div>
        <div class="carousel-count" aria-label="Current image index">1/${images.length}</div>
        <div class="carousel-buttons">
          <button class="carousel-btn prev" type="button" aria-label="Previous image">‹</button>
          <button class="carousel-btn next" type="button" aria-label="Next image">›</button>
        </div>
      </div>
    `;
    root.appendChild(card);
    state.set(safeId, { domain, images, index: 0, card });
    updateCarousel(safeId, 0);
    card.querySelector(".prev").addEventListener("click", () => stepCarousel(safeId, -1));
    card.querySelector(".next").addEventListener("click", () => stepCarousel(safeId, 1));
    card.addEventListener("mouseenter", () => stopAuto(safeId));
    card.addEventListener("mouseleave", () => startAuto(safeId, 2800 + domainIndex * 300));
    startAuto(safeId, 2800 + domainIndex * 300);
  });
}

function updateCarousel(id, index) {
  const item = state.get(id);
  if (!item) return;
  const { domain, images, card } = item;
  const length = images.length || 1;
  const nextIndex = ((index % length) + length) % length;
  item.index = nextIndex;
  const rawName = images[nextIndex];
  const img = card.querySelector("img");
  const count = card.querySelector(".carousel-count");
  const dots = Array.from(card.querySelectorAll(".dot"));
  img.onerror = () => {
    img.onerror = null;
    img.src = placeholderPath(domain.id);
  };
  img.src = normalizeImagePath(rawName);
  img.alt = `${domain.title || domain.id} qualitative result ${nextIndex + 1}`;
  if (count) count.textContent = `${nextIndex + 1}/${length}`;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === nextIndex));
}

function stepCarousel(id, direction) {
  const item = state.get(id);
  if (!item) return;
  updateCarousel(id, item.index + direction);
}

function startAuto(id, delay = 3000) {
  stopAuto(id);
  const item = state.get(id);
  if (!item || item.images.length <= 1) return;
  intervals.set(id, window.setInterval(() => stepCarousel(id, 1), delay));
}

function stopAuto(id) {
  const timer = intervals.get(id);
  if (timer) window.clearInterval(timer);
  intervals.delete(id);
}

function initCopyButtons() {
  document.querySelectorAll("[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = document.getElementById(btn.dataset.copyTarget);
      if (!target) return;
      const text = target.innerText;
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => { btn.textContent = old; }, 1200);
      } catch (_) {
        btn.textContent = "Select text";
      }
    });
  });
}

function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  initCopyButtons();
  initMobileMenu();
  renderVisualGrid(await loadManifest());
});
