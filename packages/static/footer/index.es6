import React from 'react';
import { createComponent } from 'react-fela';
import Grid from '@filou/grid';
import { Container } from '@filou/core';
import get from 'lodash/get';

const Footer = createComponent(
  ({ theme }) => ({
    position: 'relative',
    bottom: 0,
    paddingBottom: 10,
    // borderTop: '1px solid lightgray',
    left: 0,
    width: '100%',
    // height: 61,
    // paddingY: 60,
    overflow: 'hidden',
    '& .o-nav-item-lvl-0': {
      padding: 5,
      paddingX: 12
    },
    '> div': {
      paddingTop: 30,
      '> nav > div > div > div > div > span': {},
      '& a': {
        onHover: {}
      }
    },
    ...get(theme, 'filou/static/FooterContainer', {})
  }),
  ({ className, children }) => (
    <div className={className}>
      <Container>
        <Grid size={12} marginX={false}>
          {children}
        </Grid>
      </Container>
    </div>
  ),
  p => Object.keys(p)
);

Footer.Column = props => (
  <Grid.Item medium={4} padding={10} {...props}>
    {props.title && <h3>{props.title}</h3>}
    {props.children}
  </Grid.Item>
);

export default Footer;
export const Column = Footer.Column;
