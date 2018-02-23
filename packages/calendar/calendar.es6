import React from 'react';
import { createComponent } from 'react-fela';
import locale from 'date-fns/locale/de';
import {
  format,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  compareAsc,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  setYear,
  getYear,
  setMonth,
  getMonth,
  isSunday,
  isSameDay,
  startOfDay
} from 'date-fns';
import { Menu, Dropdown } from 'antd';
import { compose, withPropsOnChange } from 'recompose';
import { FaChevronLeft, FaChevronRight } from 'icon88';
import Swipeable from 'react-swipeable';
import Caption from './caption';
import Header from './header';
import KW from './kw';
import Day from './day';
import Container from './container';

const menuMonths = (date, setDate) => (
  <Menu onClick={({ key }) => setDate(setMonth(date, key))}>
    <Menu.Item key={0}>Januar</Menu.Item>
    <Menu.Item key={1}>Februar</Menu.Item>
    <Menu.Item key={2}>März</Menu.Item>
    <Menu.Item key={3}>April</Menu.Item>
    <Menu.Item key={4}>Mai</Menu.Item>
    <Menu.Item key={5}>Juni</Menu.Item>
    <Menu.Item key={6}>Juli</Menu.Item>
    <Menu.Item key={7}>August</Menu.Item>
    <Menu.Item key={8}>September</Menu.Item>
    <Menu.Item key={9}>Oktober</Menu.Item>
    <Menu.Item key={10}>November</Menu.Item>
    <Menu.Item key={11}>Dezember</Menu.Item>
  </Menu>
);

const menuYears = (date, setDate) => (
  <Menu onClick={({ key }) => setDate(setYear(date, key))}>
    {Array.from(Array(10)).map((x, y) => {
      const year = parseInt(getYear(date), 10) - 4 + y;

      return <Menu.Item key={year}>{year}</Menu.Item>;
    })}
  </Menu>
);

const enhance = (...enhancers) =>
  compose(
    withPropsOnChange(['date'], ({ date, onChange }) => {
      const year = getYear(date);
      const month = getMonth(date); // 0 = Januar, ...
      const start = startOfWeek(
        isSunday(new Date(year, month, 1))
          ? new Date(year, month, 2)
          : new Date(year, month, 1),
        { weekStartsOn: 1 }
      );
      const end = endOfWeek(endOfMonth(new Date(year, month, 1)), {
        weekStartsOn: 1
      });
      let i = 0;
      const days = [];
      while (compareAsc(addDays(start, i), end) < 0) {
        const date2 = addDays(start, i - 1);

        if (!(i % 7)) {
          days.push({
            date: date2,
            isSunday: true,
            key: format(addDays(start, i), 'WW'),
            label: format(addDays(start, i), 'WW')
          });
        } else {
          days.push({
            date: date2,
            disabled: !isSameMonth(date2, new Date(year, month, 1)),
            today: isSameDay(date2, new Date()),
            onClick: () => onChange(date2),
            key: format(date2, 'X'),
            label: format(date2, 'DD')
          });
        }
        i += 1;
      }
      return {
        year,
        month,
        start: +start,
        end: +end,
        days
      };
    }),
    withPropsOnChange(['value'], ({ value }) => ({
      value: +startOfDay(value || new Date())
    })),
    ...enhancers,
    withPropsOnChange(['days', 'value', 'data'], props => {
      const { value, days, getDayProps } = props;

      return {
        days: days.map(({ label, isSunday, date, key, ...rest }) => {
          if (isSunday) {
            return (
              <Caption key={key} {...rest}>
                {label}
              </Caption>
            );
          }
          const dayProps = (getDayProps && getDayProps(date, props)) || {};
          return (
            <Day
              key={key}
              {...rest}
              active={!compareAsc(date, value)}
              {...dayProps}
            >
              {label}
            </Day>
          );
        })
      };
    })
  );

const Calendar = (...enhancers) =>
  enhance(...enhancers)(
    createComponent(
      ({ theme }) => ({
        userSelect: 'none',
        '> h4': {
          color: theme.dark2,
          textAlign: 'center',
          marginY: theme.space1,
          position: 'relative',
          fontWeight: 300,
          '> svg': {
            centerY: true,
            cursor: 'pointer',
            fill: theme.dark2,
            onHover: {
              opacity: 0.5
            }
          },
          '> svg:first-of-type': {
            left: theme.space1
          },
          '> svg:last-of-type': {
            right: theme.space1
          }
        }
      }),
      ({ className, days, date, setDate, arrows = true }) => (
        <Swipeable
          className={className}
          onSwipedRight={() => {
            setDate(subMonths(date, 1));
          }}
          onSwipedLeft={() => {
            setDate(addMonths(date, 1));
          }}
        >
          <h4>
            <Dropdown overlay={menuMonths(date, setDate)}>
              <span>{format(date, 'MMMM', { locale })}</span>
            </Dropdown>{' '}
            <Dropdown overlay={menuYears(date, setDate)}>
              <span>{format(date, 'YYYY', { locale })}</span>
            </Dropdown>
            {!!arrows && (
              <FaChevronLeft
                size={12}
                onClick={() => setDate(subMonths(date, 1))}
              />
            )}
            {!!arrows && (
              <FaChevronRight
                size={12}
                onClick={() => setDate(addMonths(date, 1))}
              />
            )}
          </h4>
          <Container>
            <KW>KW</KW>
            <Header>MO</Header>
            <Header>DI</Header>
            <Header>MI</Header>
            <Header>DO</Header>
            <Header>FR</Header>
            <Header>SA</Header>
            {days}
          </Container>
        </Swipeable>
      ),
      p => Object.keys(p)
    )
  );

export const createCalendar = Calendar;
export default Calendar();
