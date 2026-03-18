/**
 * PostCSS plugin that converts Tailwind v4 dark mode from
 * @media (prefers-color-scheme: dark) / plain selectors
 * to class-based .dark selector.
 *
 * Handles two cases:
 * 1. Rules wrapped in @media (prefers-color-scheme: dark) — unwrap and prefix
 * 2. Bare .dark\: rules not in any media query — prefix them directly
 */
const DARK_PREFIX = ":where(.dark, .dark *)";
const DARK_SELECTOR_RE = /\.dark\\/;

function prefixSelectors(rule) {
  rule.selectors = rule.selectors.map((sel) => `${DARK_PREFIX} ${sel}`);
}

function isAlreadyPrefixed(rule) {
  return rule.selectors.some((sel) => sel.includes(":where(.dark"));
}

function hasDarkSelector(rule) {
  return rule.selectors.some((sel) => DARK_SELECTOR_RE.test(sel));
}

/** Recursively prefix all dark: rules inside a node (for @supports etc.) */
function prefixDarkRulesInside(node) {
  node.walk((child) => {
    if (child.type === "rule" && hasDarkSelector(child) && !isAlreadyPrefixed(child)) {
      prefixSelectors(child);
    }
  });
}

const plugin = () => ({
  postcssPlugin: "postcss-dark-mode-class",

  // 1. Unwrap @media (prefers-color-scheme: dark) and prefix all contents
  AtRule: {
    media(atRule) {
      if (atRule.params === "(prefers-color-scheme: dark)") {
        atRule.each((node) => {
          if (node.type === "rule") {
            prefixSelectors(node);
          } else if (node.type === "atrule") {
            prefixDarkRulesInside(node);
          }
        });
        atRule.replaceWith(atRule.nodes);
      }
    },
  },

  // 2. Catch any bare dark: rules that weren't inside a media query
  Rule(rule) {
    if (hasDarkSelector(rule) && !isAlreadyPrefixed(rule)) {
      prefixSelectors(rule);
    }
  },
});

plugin.postcss = true;

export default plugin;
