/**
 * PostCSS plugin that rewrites Tailwind's @media (prefers-color-scheme: dark)
 * rules to use class-based .dark selector instead.
 */
const plugin = () => ({
  postcssPlugin: "postcss-dark-mode-class",
  AtRule: {
    media(atRule) {
      if (atRule.params === "(prefers-color-scheme: dark)") {
        atRule.each((node) => {
          if (node.type === "rule") {
            node.selectors = node.selectors.map((sel) =>
              `:where(.dark, .dark *) ${sel}`
            );
          }
        });
        atRule.replaceWith(atRule.nodes);
      }
    },
  },
});
plugin.postcss = true;

export default plugin;
