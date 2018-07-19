import React from 'react';

let LinkComponent = () => console.warn('Overwrite LinkComponent') || null;
let HistoryComponent = () => console.warn('Overwrite HistoryComponent') || null;

export const setLink = renderer => {
  LinkComponent = renderer;
};
export const setHistory = renderer => {
  HistoryComponent = renderer;
};
export const Link = props => <LinkComponent {...props} />;
export const History = props => <HistoryComponent {...props} />;
