/* =====================================================
   THEME ENGINE - you normally don't need to edit this file.
   Choose your colors in content.js (THEME).
   It runs before the page is drawn, so there is no color flash.
   ===================================================== */
(function applyTheme() {
  const HEX = /^#[0-9a-f]{6}$/i;
  const toRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const toHex = rgb => "#" + rgb.map(n => Math.round(n).toString(16).padStart(2, "0")).join("");
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);      // t=0 -> a, t=1 -> b

  const wanted = new URLSearchParams(location.search).get("theme") || THEME.preset;
  let colors = wanted === "custom" ? THEME.custom : THEME_PRESETS[wanted];
  if (!colors || !HEX.test(colors.dark) || !HEX.test(colors.mid) || !HEX.test(colors.accent)) {
    if (colors) console.warn("Theme colors must look like #1a2b3c. Using the default theme.");
    else console.warn('Unknown theme "' + wanted + '". Using the default theme.');
    colors = THEME_PRESETS.maroon;
  }

  const dark = toRgb(colors.dark), mid = toRgb(colors.mid), accent = toRgb(colors.accent);
  const black = [0, 0, 0], white = [255, 255, 255];
  const hl = (THEME.highlights || []).filter(h => HEX.test(h));

  const vars = {
    "--accent-dark": colors.dark,
    "--accent-mid": colors.mid,
    "--accent": colors.accent,
    "--accent-dark-rgb": dark.join(", "),
    "--accent-rgb": accent.join(", "),
    "--accent-deep": toHex(mix(dark, black, 0.45)),      // icon-card gradient start
    "--accent-deeper": toHex(mix(dark, black, 0.77)),    // icon-card gradient middle
    "--accent-tint": toHex(mix(accent, white, 0.6)),     // text on tags and pills
    // tool illustrations
    "--art-rose": colors.accent,
    "--art-dark": colors.dark,
    "--art-mid": colors.mid,
    "--art-a": hl[0] || "#5fb8b0",
    "--art-b": hl[1] || "#e9b44c",
    "--art-bg1": toHex(mix(dark, black, 0.6)),
    "--art-bg2": toHex(mix(dark, black, 0.84))
  };
  const style = document.documentElement.style;
  Object.entries(vars).forEach(([k, v]) => style.setProperty(k, v));
})();
