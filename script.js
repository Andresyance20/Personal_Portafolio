/* =====================================================
   SITE LOGIC - you normally don't need to edit this file.
   All text, photos, videos, map and projects live in
   content.js
   ===================================================== */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Create an element with optional class and text (text is always escaped) */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ---------- Links and contact details from content.js ---------- */
(function applySiteDetails() {
  const set = (id, href, text) => {
    const node = document.getElementById(id);
    if (!node) return;
    if (href) node.href = href;
    if (text) node.textContent = text;
  };
  set("link-linkedin", SITE.linkedin);
  set("link-github", SITE.github);
  set("link-gitlab", SITE.gitlab);
  set("link-email", "mailto:" + SITE.email);
  set("contact-email", "mailto:" + SITE.email, SITE.email);
  set("contact-linkedin", SITE.linkedin);
  set("contact-github", SITE.github, SITE.github.replace(/^https?:\/\//, ""));
  set("contact-gitlab", SITE.gitlab, SITE.gitlab.replace(/^https?:\/\//, ""));
  set("contact-location", null, SITE.location);

  if (SITE.resume) {
    const a = el("a", "btn btn-outline");
    a.href = SITE.resume;
    a.setAttribute("download", "");
    a.innerHTML = '<i class="fas fa-download"></i>';
    a.append("Download resume");
    $("#resume-slot").appendChild(a);
  }
})();

/* ---------- Navbar: scroll style, mobile menu, active link ---------- */
const navbar = $("#navbar");
const navToggle = $("#nav-toggle");
const navLinks = $("#nav-links");
const backToTop = $("#back-to-top");

function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  backToTop.classList.toggle("show", window.scrollY > 600);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  navbar.classList.toggle("menu-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navToggle.firstElementChild.className = open ? "fas fa-times" : "fas fa-bars";
}
navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
$$(".nav-link").forEach(link => link.addEventListener("click", () => setMenu(false)));

backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
);

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $$(".nav-link").forEach(link =>
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id)
      );
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$(".nav-link").forEach(link => {
  const target = document.getElementById(link.getAttribute("href").slice(1));
  if (target) sectionObserver.observe(target);
});

/* ---------- Hero: background video + typed text ---------- */
(function heroScenes() {
  const scenes = SITE.heroScenes || [];
  const videos = $$(".hero-video");
  const ui = $("#hero-scene");
  if (!scenes.length || videos.length < 2) return;

  // Respect "reduce motion": show the first poster only
  if (prefersReducedMotion) {
    videos[0].poster = scenes[0].poster || "";
    return;
  }

  const label = $("#scene-label");
  const dotsBox = $("#scene-dots");
  const pauseBtn = $("#scene-pause");
  let current = 0;       // index of the scene on screen
  let front = 0;         // which <video> element is on screen
  let userPaused = false;
  let offscreen = false;

  const dots = scenes.map((scene, i) => {
    const dot = el("button", "scene-dot");
    dot.type = "button";
    dot.setAttribute("aria-label", "Show background: " + scene.label);
    dot.addEventListener("click", () => show(i));
    dotsBox.appendChild(dot);
    return dot;
  });
  ui.hidden = false;
  if (scenes.length < 2) dotsBox.hidden = true;

  function mark(i) {
    label.textContent = scenes[i].label;
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
  }

  function show(i) {
    current = (i + scenes.length) % scenes.length;
    const incoming = videos[1 - front];
    const outgoing = videos[front];
    const scene = scenes[current];

    incoming.loop = scenes.length === 1;
    incoming.poster = scene.poster || "";
    incoming.src = scene.src;
    incoming.currentTime = 0;

    const swap = () => {
      incoming.classList.add("is-active");
      outgoing.classList.remove("is-active");
      front = 1 - front;
      mark(current);
      setTimeout(() => { if (!outgoing.classList.contains("is-active")) outgoing.pause(); }, 1200);
    };
    incoming.play().then(swap, swap);   // swap even if autoplay is blocked (the poster shows)
  }

  videos.forEach(v => v.addEventListener("ended", () => {
    if (v.classList.contains("is-active") && !userPaused) show(current + 1);
  }));

  pauseBtn.addEventListener("click", () => {
    userPaused = !userPaused;
    const active = videos[front];
    if (userPaused) active.pause(); else if (!offscreen) active.play().catch(() => {});
    pauseBtn.setAttribute("aria-label", userPaused ? "Play background video" : "Pause background video");
    pauseBtn.firstElementChild.className = userPaused ? "fas fa-play" : "fas fa-pause";
  });

  // Pause when the hero is off-screen to save battery and CPU
  new IntersectionObserver(([entry]) => {
    offscreen = !entry.isIntersecting;
    const active = videos[front];
    if (offscreen) active.pause();
    else if (!userPaused) active.play().catch(() => {});
  }, { threshold: 0.05 }).observe($("#home"));

  // First scene
  videos[0].poster = scenes[0].poster || "";
  videos[0].src = scenes[0].src;
  videos[0].loop = scenes.length === 1;
  mark(0);
  videos[0].play().catch(() => {});
})();

(function typedEffect() {
  const node = $("#typed");
  const phrases = SITE.typed;
  if (!node || !phrases.length) return;

  if (prefersReducedMotion) {
    node.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    node.textContent = phrase.slice(0, charIndex);

    let delay = deleting ? 30 : 65;
    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      delay = 1700;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  }
  tick();
})();

/* ---------- Scroll reveal + animated counters ---------- */
function yearsInRole() {
  const start = new Date(SITE.jobStart + "T00:00:00");
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const anniversary = new Date(now.getFullYear(), start.getMonth(), start.getDate());
  if (now < anniversary) years -= 1;
  return Math.max(years, 0);
}

function animateCount(node, target, suffix) {
  const done = () => { node.textContent = target + suffix; };
  if (prefersReducedMotion || target === 0) return done();
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    node.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))) + (progress === 1 ? suffix : "");
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    $$(".stat-number", entry.target).forEach(num => {
      const raw = num.dataset.count;
      animateCount(num, raw === "years" ? yearsInRole() : Number(raw), num.dataset.suffix || "");
    });
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(node => revealObserver.observe(node));

/* ---------- Filter buttons (shared by gallery and projects) ---------- */
function buildFilters(container, labels, onChange) {
  container.innerHTML = "";
  if (labels.length <= 2) { container.hidden = true; return; }   // only "All" + one kind
  labels.forEach((label, i) => {
    const btn = el("button", "filter-btn" + (i === 0 ? " active" : ""), label);
    btn.type = "button";
    btn.setAttribute("aria-pressed", String(i === 0));
    btn.addEventListener("click", () => {
      $$(".filter-btn", container).forEach(b => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      onChange(label);
    });
    container.appendChild(btn);
  });
}

/* ---------- Machines ---------- */
(function renderMachines() {
  const grid = $("#machine-grid");
  MACHINES.forEach(machine => {
    const card = el("article", "machine-card");

    let media;
    if (machine.image) {
      media = el("button", "mc-media");
      media.type = "button";
      media.setAttribute("aria-label", "View photo: " + machine.name);
      const img = el("img");
      img.src = machine.image;
      img.alt = machine.imageAlt || machine.name;
      img.loading = "lazy";
      media.appendChild(img);
      media.addEventListener("click", () =>
        openModal({
          items: [{ type: "image", src: machine.image, alt: machine.imageAlt || machine.name }],
          title: machine.name,
          description: machine.kicker
        })
      );
    } else {
      media = el("div", "mc-media");
      media.setAttribute("aria-hidden", "true");
      media.innerHTML = `<i class="fas ${machine.icon || "fa-cog"}"></i>`;
    }

    const body = el("div", "mc-body");
    body.appendChild(el("h3", "", machine.name));
    body.appendChild(el("p", "mc-kicker", machine.kicker));
    const list = el("ul");
    machine.points.forEach(point => list.appendChild(el("li", "", point)));
    body.appendChild(list);

    card.append(media, body);
    grid.appendChild(card);
  });

  const others = $("#other-systems");
  OTHER_SYSTEMS.forEach(name => others.appendChild(el("li", "", name)));
})();

/* ---------- Gallery (videos + photos) ---------- */
(function renderGallery() {
  const grid = $("#gallery-grid");
  const filtersBox = $("#gallery-filters");
  const KIND_LABEL = { video: "Videos", youtube: "Videos", image: "Photos" };

  function thumbOf(item) {
    if (item.poster) return item.poster;
    if (item.type === "youtube") return `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;
    return item.src;
  }

  GALLERY.forEach((item, index) => {
    const card = el("button", "media-card");
    card.type = "button";
    card.dataset.kind = KIND_LABEL[item.type] || "Photos";
    card.setAttribute("aria-label", (item.type === "image" ? "View photo: " : "Play video: ") + item.title);

    const img = el("img");
    img.src = thumbOf(item);
    img.alt = item.alt || "";
    img.loading = "lazy";
    card.appendChild(img);

    if (item.type !== "image") {
      const play = el("span", "media-play");
      play.innerHTML = '<i class="fas fa-play"></i>';
      card.appendChild(play);
      if (item.duration) card.appendChild(el("span", "media-badge", item.duration));
    }
    card.appendChild(el("span", "media-caption", item.title));

    card.addEventListener("click", () => {
      // The viewer steps through whatever is currently visible after filtering
      const visible = $$(".media-card", grid).filter(c => !c.hidden);
      const items = visible.map(c => GALLERY[Number(c.dataset.index)]);
      openModal({ items, index: Math.max(visible.indexOf(card), 0), showCaption: true });
    });
    card.dataset.index = String(index);
    grid.appendChild(card);
  });

  const kinds = ["All", ...new Set(GALLERY.map(g => KIND_LABEL[g.type] || "Photos"))];
  buildFilters(filtersBox, kinds, label => {
    $$(".media-card", grid).forEach(c => { c.hidden = label !== "All" && c.dataset.kind !== label; });
  });
})();

/* ---------- Skills ---------- */
(function renderSkills() {
  const grid = $("#skill-grid");
  SKILLS.forEach(group => {
    const card = el("div", "skill-card");
    const title = el("h3");
    title.innerHTML = `<i class="fas ${group.icon}"></i>`;
    title.append(group.title);
    card.appendChild(title);

    const chips = el("div", "skill-chips");
    group.items.forEach(([name, level]) => {
      const chip = el("span", "skill-chip");
      chip.appendChild(el("span", "dot " + (level === "growing" ? "growing" : "core")));
      chip.append(name);
      chip.title = level === "growing" ? "Growing" : "Core";
      chips.appendChild(chip);
    });
    card.appendChild(chips);
    grid.appendChild(card);
  });
})();

/* ---------- Countries (About section) ---------- */
(function renderCountries() {
  const list = $("#country-groups");
  if (!list) return;
  COUNTRY_GROUPS.forEach(group => {
    const li = el("li");
    const head = el("span", "cg-label");
    head.innerHTML = `<i class="fas ${group.icon}"></i>`;
    head.append(group.label);
    li.append(head, el("span", "cg-list", group.countries.join(", ")));
    list.appendChild(li);
  });
})();

/* ---------- Tools I use (illustrated gallery) ---------- */
(function renderTools() {
  const grid = $("#tool-grid");
  if (!grid) return;
  TOOLS.forEach((tool, index) => {
    const card = el("button", "tool-card");
    card.type = "button";
    card.setAttribute("aria-label", `${tool.title}: ${tool.detail}. Enlarge picture`);

    if (tool.image) {
      const img = el("img");
      img.src = tool.image;
      img.alt = tool.alt || tool.title;
      img.loading = "lazy";
      card.appendChild(img);
    } else if (typeof TOOL_ART !== "undefined" && TOOL_ART[tool.art]) {
      const wrap = el("span", "tool-art-wrap");
      wrap.innerHTML = TOOL_ART[tool.art];          // our own drawings, themed with CSS variables
      const svg = wrap.firstElementChild;
      if (svg) svg.classList.add("art");
      card.appendChild(wrap);
    }

    const text = el("span", "tool-text");
    text.append(el("strong", "", tool.title), el("span", "", tool.detail));
    card.appendChild(text);

    card.addEventListener("click", () =>
      openModal({
        items: TOOLS.map(t => t.image
          ? { type: "image", src: t.image, alt: t.alt || t.title, title: t.title, caption: t.detail }
          : { type: "art", art: t.art, alt: t.alt || t.title, title: t.title, caption: t.detail }),
        index,
        showCaption: true
      })
    );
    grid.appendChild(card);
  });
})();

/* ---------- Projects ---------- */
(function renderProjects() {
  const grid = $("#project-grid");
  const filtersBox = $("#filters");
  const KIND_LABEL = { Professional: "Professional", Software: "Software projects" };

  PROJECTS.forEach((project, index) => {
    const card = el("button", "project-card");
    card.type = "button";
    card.dataset.type = KIND_LABEL[project.type] || project.type;
    card.setAttribute("aria-label", "Open project: " + project.title);

    const media = el("div", "card-image");
    const cover = project.images && project.images[0];
    if (cover) {
      const img = el("img");
      img.src = cover.src;
      img.alt = cover.alt || project.title;
      img.loading = "lazy";
      media.appendChild(img);
      if (project.images.length > 1) {
        const badge = el("span", "card-badge");
        badge.innerHTML = '<i class="fas fa-images"></i> ';
        badge.append(String(project.images.length));
        media.appendChild(badge);
      }
    } else {
      media.classList.add("icon-only");
      media.innerHTML = `<i class="fas ${project.icon || "fa-folder-open"}"></i>`;
    }
    media.appendChild(el("span", "card-kind", KIND_LABEL[project.type] || project.type));

    const body = el("div", "card-body");
    body.appendChild(el("h3", "", project.title));
    const tags = el("div", "tags");
    project.tech.forEach(t => tags.appendChild(el("span", "tag", t)));
    body.appendChild(tags);
    body.appendChild(el("p", "", project.summary));
    const cta = el("span", "card-cta");
    cta.append("View details ");
    cta.insertAdjacentHTML("beforeend", '<i class="fas fa-arrow-right"></i>');
    body.appendChild(cta);

    card.append(media, body);
    card.addEventListener("click", () =>
      openModal({
        items: (project.images || []).map(img => ({ type: "image", src: img.src, alt: img.alt || project.title })),
        title: project.title,
        tags: project.tech,
        description: project.description,
        links: project.links
      })
    );
    grid.appendChild(card);
  });

  const kinds = ["All", ...new Set(PROJECTS.map(p => KIND_LABEL[p.type] || p.type))];
  buildFilters(filtersBox, kinds, label => {
    $$(".project-card", grid).forEach(c => { c.hidden = label !== "All" && c.dataset.type !== label; });
  });
})();

/* =====================================================
   VIEWER / PROJECT MODAL
   openModal({ items, index, title, caption, tags, description, links })
   items: [{ type: "image"|"video"|"youtube", src, poster, alt, id, portrait }]
   ===================================================== */
const modal = $("#modal");
const modalStage = $("#modal-stage");
const modalCounter = $("#modal-counter");
const modalThumbs = $("#modal-thumbs");
const modalPrev = $("#modal-prev");
const modalNext = $("#modal-next");

let viewer = { items: [], index: 0 };
let lastFocused = null;

function renderStage() {
  const item = viewer.items[viewer.index];
  modalStage.replaceChildren();
  if (!item) return;

  if (item.type === "video") {
    const v = el("video");
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.src = item.src;
    if (item.poster) v.poster = item.poster;
    if (item.portrait) v.className = "portrait";
    modalStage.appendChild(v);
    v.play().catch(() => {});
  } else if (item.type === "youtube") {
    const wrap = el("div", "yt");
    const frame = el("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.id)}?rel=0&autoplay=1`;
    frame.title = item.title || "Video";
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    wrap.appendChild(frame);
    modalStage.appendChild(wrap);
  } else if (item.type === "art") {
    const wrap = el("div", "art-wrap");
    wrap.setAttribute("role", "img");
    wrap.setAttribute("aria-label", item.alt || "");
    wrap.innerHTML = (typeof TOOL_ART !== "undefined" && TOOL_ART[item.art]) || "";
    const svg = wrap.firstElementChild;
    if (svg) svg.classList.add("art");
    modalStage.appendChild(wrap);
  } else {
    const img = el("img");
    img.src = item.src;
    img.alt = item.alt || "";
    modalStage.appendChild(img);
  }

  const many = viewer.items.length > 1;
  modalCounter.textContent = `${viewer.index + 1} / ${viewer.items.length}`;
  $$(".thumb", modalThumbs).forEach((t, i) => t.classList.toggle("active", i === viewer.index));

  if (viewer.showCaption) {
    $("#modal-title").textContent = item.title || "";
    $("#modal-description").textContent = item.caption || "";
  }
  modalPrev.hidden = modalNext.hidden = modalCounter.hidden = !many;
}

function showItem(index) {
  const n = viewer.items.length;
  if (!n) return;
  viewer.index = (index + n) % n;
  renderStage();
}

function openModal({ items = [], index = 0, title = "", tags = [], description = "", links = [], showCaption = false }) {
  viewer = { items, index, showCaption };
  lastFocused = document.activeElement;
  modal.classList.toggle("no-media", items.length === 0);

  $("#modal-title").textContent = title;
  $("#modal-description").textContent = description;

  const tagBox = $("#modal-tags");
  tagBox.replaceChildren();
  tags.forEach(t => tagBox.appendChild(el("span", "tag", t)));

  const linkBox = $("#modal-links");
  linkBox.replaceChildren();
  (links || []).forEach(l => {
    const a = el("a", "btn btn-outline", l.label);
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener";
    linkBox.appendChild(a);
  });

  modalThumbs.replaceChildren();
  if (items.length > 1) {
    items.forEach((item, i) => {
      const thumb = el("button", "thumb");
      thumb.type = "button";
      thumb.setAttribute("aria-label", `Show item ${i + 1}`);
      if (item.type === "art") {
        thumb.innerHTML = (typeof TOOL_ART !== "undefined" && TOOL_ART[item.art]) || "";
        const svg = thumb.firstElementChild;
        if (svg) svg.classList.add("art");
      } else {
        const img = el("img");
        img.alt = "";
        img.src = item.poster || (item.type === "youtube" ? `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg` : item.src);
        thumb.appendChild(img);
        if (item.type !== "image") thumb.insertAdjacentHTML("beforeend", '<span class="t-play"><i class="fas fa-play"></i></span>');
      }
      thumb.addEventListener("click", () => showItem(i));
      modalThumbs.appendChild(thumb);
    });
  }

  modal.hidden = false;
  document.body.classList.add("modal-open");
  renderStage();
  $(".modal-close", modal).focus();
}

function closeModal() {
  modal.hidden = true;
  modalStage.replaceChildren();               // also stops any playing video
  document.body.classList.remove("modal-open");
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

$$("[data-close]", modal).forEach(node => node.addEventListener("click", closeModal));
modalPrev.addEventListener("click", () => showItem(viewer.index - 1));
modalNext.addEventListener("click", () => showItem(viewer.index + 1));

document.addEventListener("keydown", e => {
  if (modal.hidden) return;
  if (e.key === "Escape") closeModal();
  const onVideo = document.activeElement && document.activeElement.tagName === "VIDEO";
  if (!onVideo && e.key === "ArrowLeft") showItem(viewer.index - 1);
  if (!onVideo && e.key === "ArrowRight") showItem(viewer.index + 1);

  // Keep keyboard focus inside the modal while it's open
  if (e.key === "Tab") {
    const focusable = $$("button:not([hidden]), a[href], video[controls]", modal).filter(n => !n.closest("[hidden]"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

// Swipe left/right on touch screens (not while using video controls)
let touchStartX = null;
modalStage.addEventListener("touchstart", e => {
  touchStartX = e.target.tagName === "VIDEO" ? null : e.changedTouches[0].clientX;
}, { passive: true });
modalStage.addEventListener("touchend", e => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) showItem(viewer.index + (dx < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });

/* ---------- Contact form (opens the visitor's email app) ---------- */
(function contactForm() {
  const form = $("#contact-form");
  const statusEl = $("#form-status");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const fields = ["name", "email", "message"].map(id => form.elements[id]);
    let valid = true;

    fields.forEach(field => {
      const ok = field.value.trim() !== "" && (field.type !== "email" || /^\S+@\S+\.\S+$/.test(field.value.trim()));
      field.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      statusEl.textContent = "Please fill in every field with a valid email address.";
      return;
    }

    const [name, email, message] = fields.map(f => f.value.trim());
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    statusEl.textContent = "Opening your email app...";
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  });

  $$("input, textarea", form).forEach(field =>
    field.addEventListener("input", () => field.classList.remove("invalid"))
  );
})();

/* ---------- Footer year ---------- */
$("#year").textContent = new Date().getFullYear();
