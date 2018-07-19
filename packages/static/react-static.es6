import React from 'react';
import { Link, Route } from 'react-static';
import { Provider } from './link';
import { Provider as HistoryProvider } from './history';

const ReactStaticLink = ({ className, to, children, onClick, ...rest }) => (
  <Link to={to} className={className}>
    {children}
  </Link>
);

const ReactStaticHistory = props => (
  <Route>{({ location }) => props.children(location)}</Route>
);

export default ({ children }) => (
  <HistoryProvider value={ReactStaticHistory}>
    <Provider value={ReactStaticLink}>{children}</Provider>
  </HistoryProvider>
);
