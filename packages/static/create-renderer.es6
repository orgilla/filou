import { createRenderer } from 'filou';

export default typography => {
  const renderer = createRenderer({ monolithic: false });
  if (typography) {
    renderer.renderStatic(typography.toString());
    if (typeof window !== 'undefined' && typography.options.googleFonts) {
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
