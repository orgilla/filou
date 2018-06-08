import React from 'react';
import ReactDOM from 'react-dom';
import {
  createRenderer,
  createComponent,
  ThemeProvider,
  Provider,
} from 'filou';

const Container = createComponent(
  ({ theme }) => ({
    backgroundColor: theme.color,
    color: 'white',
    minHeight: 300,
  }),
  'div'
);

ReactDOM.render(
  <Provider renderer={createRenderer()}>
    <ThemeProvider
      theme={{
        color: '#222233',
      }}
    >
      <Container>Hi</Container>
    </ThemeProvider>
  </Provider>,
  document.getElementById('mountNode')
);
