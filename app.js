/* app.js — site-wide enhancements + config hydration
   - Reads window.SITE from site-config.js
   - Hydrates common elements across pages
   - Adds: scroll reveal, mobile nav, cursor spotlight, back-to-top, mailto form
*/

(() => {
  const S = window.SITE || {};
  const brand = S.brand || {};
  const ops = S.operations || {};
  const banner = S.banner || {};
  const today = S.today || {};
  const menu = S.menu || {};
  const ev = S.firstEvent || {};
  const imgs = S.images || {};
  const contact = S.contact || {};

  const $ = (id) => document.getElementById(id);

  const setText = (id, value) => {
    const el = $(id);
    if (!el) return;
    if (value === undefined || value === null) return;
    const v = String(value);
    if (v.trim().length === 0) return;
    el.textContent = v;
  };

  const setHref = (id, href) => {
    const el = $(id);
    if (!el || !href) return;
    el.setAttribute("href", href);
  };

  const setSrc = (id, src) => {
    const el = $(id);
    if (!el || !src) return;
    el.setAttribute("src", src);
  };

  // Year
  const year = new Date().getFullYear();
  const y = $("y");
  if (y) y.textContent = String(year);
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(year)));

  // Brand
  setText("brandName", brand.name);
  setText("brandName2", brand.name);
  if ($("brandSub")) {
    const city = brand.city || "Rochester, NY";
    setText("brandSub", city);
  }
  // Pills (optional)
  const pillCity = $("pillCity");
  if (pillCity) pillCity.textContent = `${brand.city || "Rochester, NY"} pop-up`;
  const pillCashless = $("pillCashless");
  if (pillCashless) pillCashless.textContent = ops.cardOnly ? "💳 Card only (no cash)" : "💳 Payment options vary";


  const logo = $("brandLogo");
  if (logo && brand.logoSrc) logo.src = brand.logoSrc;
  if (logo && brand.logoAlt) logo.alt = brand.logoAlt;

  // Optional per-page hero copy
  setText("tagline", brand.tagline);
  if ($("mantra")) {
    if (brand.mantra) setText("mantra", brand.mantra);
    else $("mantra").style.display = "none";
  }

  // Banner
  if (banner.enabled) {
    const b = $("banner");
    if (b) b.style.display = "flex";
    setText("banner1", banner.line1);
    setText("banner2", banner.line2);
  }

  // Images
  setSrc("heroImg1", imgs.hero1);
  setSrc("heroImg2", imgs.hero2);
  setSrc("aboutImg1", imgs.about1);
  setSrc("aboutImg2", imgs.about2);

  // Contact links
  if (contact.instagramHandle) {
    const igHref = `https://instagram.com/${contact.instagramHandle}`;
    setHref("igBtn", igHref);
    setText("igBtn", `Instagram @${contact.instagramHandle}`);

    setHref("igLink", igHref);
    setText("igLink", `@${contact.instagramHandle}`);

    setHref("igLink2", igHref);
    setText("igLink2", `@${contact.instagramHandle}`);
  }

  if (contact.email) {
    const mailHref = `mailto:${contact.email}`;
    setHref("emailBtn", mailHref);
    setText("emailBtn", contact.email);

    setHref("emailLink", mailHref);
    setText("emailLink", contact.email);

    setHref("emailLink2", mailHref);
    setText("emailLink2", contact.email);
  }

  // Status (Home + Find Us)
  const isLive = !!ops.inOperation;

  const statusLabel = $("statusLabel");
  const todaySpot = $("todaySpot") || $("spot");
  const todayHours = $("todayHours") || $("hours");
  const mapsBtn = $("mapsBtn") || $("navlink");

  if (todaySpot || todayHours || statusLabel || mapsBtn) {
    if (!isLive) {
      if (statusLabel) statusLabel.textContent = "Status:";
      if (todaySpot) todaySpot.textContent = "Not currently in operation";
      if (todayHours) todayHours.textContent = ev.name ? `Next service: ${ev.name} (Fri–Sun)` : "Next service: coming soon";
      if (mapsBtn) mapsBtn.href = ev.maps || mapsBtn.href;
    } else {
      if (statusLabel) statusLabel.textContent = "Today:";
      if (todaySpot && today.status) todaySpot.textContent = today.status;
      if (todayHours && today.hours) todayHours.textContent = today.hours;
      if (mapsBtn && today.maps) mapsBtn.href = today.maps;
    }
  }

  // First Event fields (Home + Find Us)
  setText("eventName", ev.name);
  setText("eventDates", ev.dates);
  if (ev.locationName || ev.address) {
    setText("eventWhere", `${ev.locationName || ""}${ev.locationName && ev.address ? " — " : ""}${ev.address || ""}`.trim());
  }
  setText("eventSchedule", ev.servingSchedule || ev.schedule);
  setText("eventAdmission", ev.admission);
  setText("eventHighlights", ev.highlights);
  setText("eventMusic", ev.music);
  setText("eventParking", ev.parkingTransit || ev.parking);

  setHref("eventLink", ev.link);
  setHref("eventMaps", ev.maps);
  setHref("eventMaps2", ev.maps);

  // Menu fields
  setText("itemName", menu.featuredItemName);
  setText("itemDesc", menu.featuredItemDesc);
  setText("featuredDesc", menu.featuredItemDesc);
  setText("pricingNote", menu.pricingNote);

  const fillList = (id, items) => {
    const ul = $(id);
    if (!ul || !Array.isArray(items) || !items.length) return;
    ul.innerHTML = "";
    items.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
  };

  fillList("includesList", menu.includes);
  fillList("menuIncludes", menu.includes);
  fillList("menuAddons", menu.addOns);
  fillList("menuDrinks", menu.drinks);

  // Map embed (Find Us)
  const mapEmbed = $("mapEmbed");
  if (mapEmbed) {
    const q = isLive ? (today.maps || "") : (ev.address || ev.locationName || brand.city || "Rochester, NY");
    const src = `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
    mapEmbed.setAttribute("src", src);
  }

  // Nav active (auto)
  try {
    const path = (location.pathname || "/").replace(/\/index\.html$/, "/");
    const hash = location.hash || "";
    const links = Array.from(document.querySelectorAll(".nav a"));

    links.forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("aria-current") === "page") a.removeAttribute("aria-current");
    });

    let active = null;

    if (hash) {
      const exactHref = `${path}${hash}`;
      active = links.find((a) => (a.getAttribute("href") || "") === exactHref) || null;
    }

    if (!active) {
      active =
        links.find((a) => {
          const href = a.getAttribute("href") || "";
          return href.indexOf("#") === -1 && href === path;
        }) ||
        links.find((a) => {
          const href = a.getAttribute("href") || "";
          const hrefPath = (href.split("#")[0] || "/").replace(/\/index\.html$/, "/");
          return hrefPath === path;
        }) ||
        null;
    }

    if (active) {
      active.classList.add("active");
      active.setAttribute("aria-current", "page");
    }
  } catch (_) {}

  // Mobile nav toggle
  const toggle = $("navToggle");
  const root = document.documentElement;
  if (toggle) {
    const close = () => {
      root.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const open = root.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!t) return;
      if (t === toggle || toggle.contains(t)) return;
      const nav = document.getElementById(toggle.getAttribute("aria-controls") || "");
      if (nav && (t === nav || nav.contains(t))) return;
      if (root.classList.contains("nav-open")) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // Cursor spotlight
  const prefersReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduce) {
    const onMove = (e) => {
      const x = Math.round(e.clientX);
      const y = Math.round(e.clientY);
      document.documentElement.style.setProperty("--mx", `${x}px`);
      document.documentElement.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      document.documentElement.style.setProperty("--mx", `${Math.round(t.clientX)}px`);
      document.documentElement.style.setProperty("--my", `${Math.round(t.clientY)}px`);
    }, { passive: true });
  }

  // Scroll reveal
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            ent.target.classList.add("in");
            io.unobserve(ent.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // Back to top button
  const mkToTop = () => {
    const btn = document.createElement("button");
    btn.className = "toTop";
    btn.type = "button";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 5l7 7-1.4 1.4L13 8.8V20h-2V8.8L6.4 13.4 5 12l7-7z" fill="currentColor"/>
      </svg>
    `;

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReduce ? "auto" : "smooth" });
    });

    document.body.appendChild(btn);

    const onScroll = () => {
      const show = window.scrollY > 700;
      btn.classList.toggle("show", show);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  };

  mkToTop();


  // Scroll polish: progress line + header state
  const topbar = document.querySelector(".topbar");
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  const onScrollPolish = () => {
    const scrolled = window.scrollY > 20;
    if (topbar) topbar.classList.toggle("is-scrolled", scrolled);

    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pct = Math.min(1, Math.max(0, window.scrollY / max));
    progress.style.transform = `scaleX(${pct})`;
  };

  window.addEventListener("scroll", onScrollPolish, { passive: true });
  window.addEventListener("resize", onScrollPolish, { passive: true });
  onScrollPolish();

  const floatingMenuCta = document.querySelector(".floating-menu-cta");
  const heroPrime = document.querySelector(".hero-cinematic, .hero-prime, .hero");
  const onFloatingCta = () => {
    if (!floatingMenuCta || !heroPrime) return;
    const rect = heroPrime.getBoundingClientRect();
    const show = rect.bottom < 120;
    floatingMenuCta.classList.toggle("show", show);
  };
  window.addEventListener("scroll", onFloatingCta, { passive: true });
  window.addEventListener("resize", onFloatingCta, { passive: true });
  onFloatingCta();

  // Mailto form (Contact page)
  const form = $("mailtoForm");
  if (form && contact.email) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const reason = String(fd.get("reason") || "").trim();
      const date = String(fd.get("date") || "").trim();
      const headcount = String(fd.get("headcount") || "").trim();
      const details = String(fd.get("details") || "").trim();
      const phone = String(fd.get("phone") || "").trim();

      const subject = `Travana Tacos Inquiry — ${reason || "Question"}`;

      const lines = [
        "Hi Travana Tacos,",
        "",
        name ? `My name is ${name}.` : "My name is …",
        reason ? `I’m reaching out about: ${reason}` : "I’m reaching out about: …",
        date ? `Date/time: ${date}` : "Date/time: …",
        headcount ? `Expected headcount: ${headcount}` : "Expected headcount: …",
        phone ? `Phone: ${phone}` : "Phone: …",
        "",
        "Details:",
        details || "…",
        "",
        "Thanks!",
        name || ""
      ];

      const body = lines.join("\n");

      const href = `mailto:${encodeURIComponent(contact.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
    });
  }

  // Copy buttons (if present)
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        const targetId = btn.getAttribute("data-copy") || "";
        const el = document.getElementById(targetId);
        const text = el ? (el.textContent || el.value || "") : "";
        if (!text) return;
        await navigator.clipboard.writeText(text);
        const prev = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = prev), 900);
      } catch (_) {
        // no-op
      }
    });
  });
})();