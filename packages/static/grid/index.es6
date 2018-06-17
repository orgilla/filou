import React from 'react';
import { createComponent } from 'react-fela';
import { Container } from '@filou/core';
import { format } from 'date-fns';
import { Link } from 'react-static';
import Grid from '@filou/grid';
import Button from '../button';
import getSrc from '../get-img';

const Panel = createComponent(
  ({ image }) => ({
    padding: '0 16px 24px 16px',
    '> a': {
      '> div': {
        height: 150,
        backgroundColor: 'lightgray',
        width: '100%',
        backgroundImage: `url(${getSrc(image)})`,
        backgroundSize: 'cover'
      },
      display: 'block',
      backgroundColor: '#FFFFFF',
      borderRadius: 4,
      overflow: 'hidden',
      height: '100%',
      boxShadow: '0 1px 5px rgba(45, 45, 45, 0.09)',
      textDecoration: 'none',
      '> h3': {
        paddingX: 10,
        minHeight: 60,
        marginBottom: 0,
        marginTop: 0,
        paddingBottom: 0
      },
      '> p': {
        paddingX: 10,
        marginBottom: 10,
        textDecoration: 'none'
      },
      '> span': {
        paddingX: 10,
        paddingY: 10,
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'row',
        '> b': {
          flex: 1
        }
      }
    }
  }),
  ({ title, image, text, date, className, type, ...rest }) => (
    <div className={className}>
      <Link {...rest}>
        <div />
        <span>
          {date && <span>{format(date, 'DD.MM.YYYY HH:mm')}</span>}
          <b />
          {type && <Button>{type}</Button>}
        </span>
        <h3>{title}</h3>
        <p>{text}</p>
      </Link>
    </div>
  ),
  p => Object.keys(p)
);

const GridPanels = ({ items }) => (
  <Container>
    <Grid size={4} padding={16} marginX={false}>
      {items.map(item => (
        <Grid.Item small={1} key={item.to || item.id}>
          <Panel {...item} />
        </Grid.Item>
      ))}
    </Grid>
  </Container>
);

export default GridPanels;
