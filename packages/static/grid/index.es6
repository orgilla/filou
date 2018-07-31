import React from 'react';
import { createComponent } from 'react-fela';
import { Container } from '@filou/core';
import { format } from 'date-fns';
import Grid from '@filou/grid';
import Button from '../button';
import getSrc from '../get-img';
import LinkConsumer from '../link';

const Panel = createComponent(
  ({ image, theme }) => ({
    padding: '0 16px 24px 16px',
    '> a': {
      '> div': image ? {
        height: 150,
        backgroundColor: 'lightgray',
        width: '100%',
        backgroundImage: `url(${getSrc(image)})`,
        backgroundSize: 'cover'
      } : null,
      display: 'block',
      backgroundColor: '#FFFFFF',
      borderRadius: theme.borderRadius,
      overflow: 'hidden',
      height: '100%',
      boxShadow: theme.boxShadow,
      textDecoration: 'none',
      '> h3': {
        paddingX: !theme.boxShadow ? undefined : theme.space2,
        minHeight: 60,
        marginBottom: 0,
        marginTop: 0,
        paddingBottom: 0
      },
      '> p': {
        paddingX: !theme.boxShadow ? undefined : theme.space2,
        marginBottom: theme.space2,
        textDecoration: 'none'
      },
      '> span': {
        paddingX: !theme.boxShadow ? undefined : theme.space2,
        paddingY: theme.space2,
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
      <LinkConsumer>
        {Link => (
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
        )}
      </LinkConsumer>
    </div>
  ),
  p => Object.keys(p)
);

const GridPanels = ({ items }) => (
  <Container>
    <Grid size={4} marginX={-27}>
      {items.map((item, i) => (
        <Grid.Item  small={1} key={item.to || item.id || i}>
          <Panel {...item} />
        </Grid.Item>
      ))}
    </Grid>
  </Container>
);

export default GridPanels;
