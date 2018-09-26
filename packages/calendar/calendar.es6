import React from 'react';
import { createComponent } from 'react-fela';
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
import { compose, withPropsOnChange } from 'recompose';
import { FaChevronLeft, FaChevronRight } from '@filou/icons';
import Swipeable from 'react-swipeable';
import Caption from './caption';
import Header from './header';
import KW from './kw';
import Day from './day';
import Container from './container';
import Select from './select';

export const menuYears = (date, setDate) => (
  <Menu onClick={({ key }) => setDate(setYear(date, key))} />
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
            key: format(addDays(start, i), 'ww'),
            label: format(addDays(start, i), 'ww')
          });
        } else {
          days.push({
            date: date2,
            disabled: !isSameMonth(date2, new Date(year, month, 1)),
            today: isSameDay(date2, new Date()),
            onClick: () => onChange(date2),
            key: +date2,
            label: date2.getDate()
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
            <Select
              value={new Date(date).getMonth()}
              onChange={e => setDate(setMonth(date, e.target.value))}
            >
              <option value={0}>Januar</option>
              <option value={1}>Februar</option>
              <option value={2}>März</option>
              <option value={3}>April</option>
              <option value={4}>Mai</option>
              <option value={5}>Juni</option>
              <option value={6}>Juli</option>
              <option value={7}>August</option>
              <option value={8}>September</option>
              <option value={9}>Oktober</option>
              <option value={10}>November</option>
              <option value={11}>Dezember</option>
            </Select>
            <Select
              value={new Date(date).getYear()}
              onChange={e => setDate(setMonth(date, e.target.value))}
            >
              {Array.from(Array(10)).map((x, y) => {
                const year = parseInt(getYear(date), 10) - 4 + y;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </Select>
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
