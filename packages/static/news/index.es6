import React, { Fragment } from 'react';
import { createComponent } from 'react-fela';
import { Container } from '@filou/core';
import { withRouteData, Link } from 'react-static';
import Table from '../table';
import Button from '../button';
import { format } from 'date-fns';

const Links = createComponent(({ theme }) => ({
  marginTop: 40,
  padding: 15,
  flexDirection: 'column',
  '> a': {
    textDecoration: 'none'
  },
  '> a[data-active=true]': {
    textDecoration: 'underline',
    color: theme.color
  }
}));

const News = ({ types, items, children }) => {
  const hash = typeof location !== 'undefined' ? location.hash : null;
  const selectedType = hash && types.find(x => hash === `#${x.toLowerCase()}`);
  return (
    <Fragment>
      <Container>
        <Links>
          <Link data-active={!selectedType} to="/news">
            Alle
          </Link>
          {types.map(type => (
            <Fragment key={type}>
              <span> / </span>
              <Link
                data-active={selectedType === type}
                to={`#${type.toLowerCase()}`}
              >
                {type}
              </Link>
            </Fragment>
          ))}
        </Links>
      </Container>
      <Container>
        <Table columns={['Name', 'Datum', 'Typ']}>
          {items
            .filter(x => !selectedType || selectedType === x.type)
            .map(({ slug, title, text, date, image, id, type }) => (
              <Table.Tr key={id} active={new Date(date) > new Date()}>
                <Table.Td>
                  <Link to={`/news/${slug}`}>{title}</Link>
                </Table.Td>
                <Table.Td>{format(date, 'DD.MM.YYYY HH:mm')}</Table.Td>
                <Table.Td>
                  <Button>{type}</Button>
                </Table.Td>
              </Table.Tr>
            ))}
        </Table>
      </Container>
    </Fragment>
  );
};

export default withRouteData(News);
