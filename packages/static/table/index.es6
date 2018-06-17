import React from 'react';
import { createComponent } from 'react-fela';

const Thead = createComponent(
  ({ theme }) => ({
    '> tr': {
      textAlign: 'left',
      '> th': {
        padding: theme.space2,
        borderBottom: `2px solid ${theme.color}`
      }
    }
  }),
  'thead',
  p => Object.keys(p)
);

const Tbody = createComponent(() => ({}), 'tbody', p => Object.keys(p));

const Tfoot = createComponent(
  ({ theme }) => ({
    '> tr': {
      textAlign: 'right',
      '> td': {
        fontSize: theme.fontSizeSmall,
        paddingX: theme.space2,
        paddingY: theme.space1,
        borderTop: `1px solid ${theme.color}`
      }
    }
  }),
  'tfoot',
  p => Object.keys(p)
);

const Tr = createComponent(
  ({ theme, active }) => ({
    cursor: 'pointer',
    backgroundColor: active && theme.dark5,
    onHover: {
      backgroundColor: theme.dark4
    }
  }),
  'tr',
  p => Object.keys(p)
);

const Td = createComponent(
  ({ theme }) => ({
    padding: theme.space2
  }),
  'td',
  p => Object.keys(p)
);

const Table = createComponent(
  () => ({
    width: '100%',
    borderSpacing: 0
  }),
  ({ columns, children, foot, head, ...rest }) => (
    <table {...rest}>
      {columns && (
        <Thead>
          <tr>{columns.map((column, i) => <th key={i}>{column}</th>)}</tr>
        </Thead>
      )}
      <Tbody>
        {head}
        {children}
      </Tbody>
      {foot && <Tfoot>{foot}</Tfoot>}
    </table>
  ),
  p => Object.keys(p)
);
Table.displayName = 'Table';
Table.Tr = Tr;
Table.Td = Td;

export default Table;
