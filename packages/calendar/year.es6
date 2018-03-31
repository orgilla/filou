import React, { Fragment } from 'react';
import { createComponent } from 'react-fela';
import locale from 'date-fns/locale/de';
import {
  format,
  startOfWeek,
  endOfWeek,
  endOfYear,
  compareAsc,
  addDays,
  addYears,
  subYears,
  isSameYear,
  getYear,
  isSunday,
  isSameDay,
  startOfDay
} from 'date-fns';
import { Dropdown } from 'antd';
import { compose, withPropsOnChange } from 'recompose';
import { FaChevronLeft, FaChevronRight } from '@filou/icons';
import Swipeable from 'react-swipeable';
import Caption from './caption';
import Header from './header';
import KW from './kw';
import Day from './day';
import Container from './container';
import { menuYears } from './calendar';

const enhance = (...enhancers) =>
  compose(
    withPropsOnChange(['date'], ({ date, onChange }) => {
      const year = getYear(date);
      const start = startOfWeek(
        isSunday(new Date(year, 0, 1))
          ? new Date(year, 0, 2)
          : new Date(year, 0, 1),
        { weekStartsOn: 1 }
      );
      const end = endOfWeek(endOfYear(new Date(year, 0, 1)), {
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
            key: format(addDays(start, i), `WW.${i}`),
            label: format(addDays(start, i), 'WW')
          });
        } else {
          days.push({
            date: date2,
            disabled: !isSameYear(date2, new Date(year, 0, 1)),
            today: isSameDay(date2, new Date()),
            onClick: () => onChange(date2),
            key: format(date2, 'X'),
            label: (
              <span>
                {format(date2, 'DD')}
                {/* <small>{format(date2, 'M')}</small> */}
              </span>
            )
          });
        }
        i += 1;
      }
      return {
        year,
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

      let lastMonth = -1;
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
          const isOdd = date.getMonth() % 2;

          const isNewMonth = lastMonth !== date.getMonth();
          lastMonth = date.getMonth();
          const active = !compareAsc(date, value);
          return (
            <Day
              key={key}
              isOdd={isOdd}
              {...rest}
              active={active}
              placeholder={isNewMonth ? format(date, 'MMM.', { locale }) : null}
              {...dayProps}
            >
              {label}
            </Day>
          );
        })
      };
    })
  );

const Year = (...enhancers) =>
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
            setDate(subYears(date, 1));
          }}
          onSwipedLeft={() => {
            setDate(addYears(date, 1));
          }}
        >
          <h4>
            <Dropdown overlay={menuYears(date, setDate)}>
              <span>{format(date, 'YYYY', { locale })}</span>
            </Dropdown>
            {!!arrows && (
              <FaChevronLeft
                size={12}
                onClick={() => setDate(subYears(date, 1))}
              />
            )}
            {!!arrows && (
              <FaChevronRight
                size={12}
                onClick={() => setDate(addYears(date, 1))}
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

export const createYear = Year;
export default Year();
