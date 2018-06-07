import React from 'react';
import { createComponent } from 'react-fela';
import Gravatar from 'react-gravatar';

const getInitials = name => {
  if (name) {
    const array = name.split(' ');

    switch (array.length) {
      case 1:
        return array[0].charAt(0).toUpperCase();
      default:
        return (
          array[0].charAt(0).toUpperCase() +
          array[array.length - 1].charAt(0).toUpperCase()
        );
    }
  }
  return false;
};

export default createComponent(
  ({ theme, name, size = 30 }) => ({
    display: 'block',
    borderRadius: '50%',
    background: `url(https://invatar0.appspot.com/svg/${getInitials(
      name
    )}.jpg?s=${Math.round(size * 0.8)}&bg=${encodeURIComponent(
      theme.color
    )}&color=${encodeURIComponent(theme.light)}) center center no-repeat, ${
      theme.color
    }`,
  }),
  ({ size, ...p }) => <Gravatar {...p} protocol="https://" size={size} />,
  ['email', 'name', 'default', 'size']
);
