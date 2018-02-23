import React from 'react';
import { createComponent } from 'react-fela';
import { getColor } from './colors-provider';

export const Heading = createComponent(
  ({
    fontSize,
    theme,
    padding,
    marginBottom,
    marginTop,
    textAlign,
    thin,
    color,
    palette,
    center
  }) => ({
    color: getColor(theme, color, palette),
    textAlign: center ? 'center' : textAlign,
    fontWeight: thin && 200,
    padding,
    fontSize,
    lineHeight: fontSize ? `${fontSize}px` : undefined,
    marginTop: marginTop !== undefined ? marginTop : undefined,
    marginBottom: marginBottom !== undefined ? marginBottom : 15
  }),
  ({ level, children, ...rest }) => {
    if (!level) {
      level = 1;
    }
    return React.createElement(`h${level}`, rest, children);
  },
  ['level', 'itemProp']
);

export const SectionHeading = ({ title, description, children, level = 0 }) => (
  <div key={0}>
    <Heading
      level={1 + level}
      marginBottom={0}
      textAlign="center"
      light
      color
      thin
    >
      {title || children}
    </Heading>
    {description && (
      <Heading level={3 + level} marginTop={0} textAlign="center" thin>
        {description}
      </Heading>
    )}
  </div>
);

export const H1 = props => <Heading {...props} level={1} />;
export const H2 = props => <Heading {...props} level={2} />;
export const H3 = props => <Heading {...props} level={3} />;
export const H4 = props => <Heading {...props} level={4} />;
export const H5 = props => <Heading {...props} level={5} />;
export const H6 = props => <Heading {...props} level={6} />;
