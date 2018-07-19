import React from 'react';

const ThemeContext = React.createContext('historycomponent');

/* export class ThemeProvider extends React.Component {
  state = { theme: 'light' };

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
} */

export const { Provider } = ThemeContext;

export default ThemeContext.Consumer;

/* class ThemedButton extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => <Button theme={theme} />}
      </ThemeContext.Consumer>
    );
  }
} */
