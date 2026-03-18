/**
 * PostCSS plugin that converts Tailwind v4 dark mode to class-based .dark
 *
 * Runs in OnceExit (after all other processing) to handle both:
 * - Production: dark rules inside @media (prefers-color-scheme: dark)
 * - Dev/Turbopack: dark rules as bare selectors
 */
const DARK_PREFIX = ":where(.dark, .dark *)";

function hasDarkSelector(selectors) {
  return selectors.some((s) => /\.dark\\:/.test(s));
}

function isAlreadyPrefixed(selectors) {
  return selectors.some((s) => s.includes(":where(.dark"));
}

function prefixRule(rule) {
  if (hasDarkSelector(rule.selectors) && !isAlreadyPrefixed(rule.selectors)) {
    rule.selectors = rule.selectors.map((s) => `${DARK_PREFIX} ${s}`);
  }
}

const plugin = () => ({
  postcssPlugin: "postcss-dark-mode-class",
  OnceExit(root) {
    // Step 1: Unwrap all @media (prefers-color-scheme: dark) blocks
    root.walkAtRules("media", (atRule) => {
      if (/prefers-color-scheme:\s*dark/.test(atRule.params)) {
        atRule.replaceWith(atRule.nodes);
      }
    });

    // Step 2: Prefix ALL bare .dark\: selectors with :where(.dark, .dark *)
    root.walkRules((rule) => {
      prefixRule(rule);
    });
  },
});

plugin.postcss = true;

export default plugin;
