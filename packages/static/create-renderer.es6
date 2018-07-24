import { createRenderer } from 'filou';

export default typography => {
  const renderer = createRenderer();
  if (typography) {
    renderer.renderStatic(typography.toString());
    if (
      typeof window !== 'undefined' &&
      typography.options.googleFonts &&
      typography.options.googleFonts.length
    ) {
      const WebFont = require('webfontloader');
      WebFont.load({
        google: {
          families: typography.options.googleFonts.reduce(
            (result, item) => [
              ...result,
              `${item.name}:${item.styles.join(',')}`
            ],
            []
          )
        }
      });
    }
  }
  return renderer;
};
