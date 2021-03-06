import { renderToSheetList } from 'fela-dom';
import React from 'react';
import { Provider } from 'react-fela';
import createFela from './create-renderer';
import Theme from './theme-provider';

export const plugin = () => {
  const renderer = createFela();
  if (typeof window !== 'undefined') {
    return {
      decorate: App => props => (
        <Provider renderer={renderer}>
          <Theme>
            <App {...props} />
          </Theme>
        </Provider>
      ),
    };
  } else {
    return {
      decorate: App => props => (
        <Provider renderer={renderer}>
          <Theme>
            <App {...props} />
          </Theme>
        </Provider>
      ),
      template: template => {
        const fela = renderToSheetList(renderer);
        template.header.push(`
          ${fela
            .map(
              ({ type, css, media }) =>
                media
                  ? `<style type="text/css" data-fela-type="${type}" media="${media}">${css}</style>`
                  : `<style type="text/css" data-fela-type="${type}">${css}</style>`
            )
            .join('\n')}
        `);
        return template;
      },
    };
  }
};
