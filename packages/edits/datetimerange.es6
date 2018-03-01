import React from 'react';
import {
  isBefore,
  startOfDay,
  endOfDay,
  addMilliseconds,
  differenceInMilliseconds
} from 'date-fns';
import EditDate from './date';
import EditDateTime from './datetime';
import EditTimeRange from './timerange';
import EditDuration from './duration';

const Edit = ({ value = [], onChange, mode, slots, ...props }) => {
  const [start, end] = value;
  const endFn = (!!end && (isBefore(start, end) ? end : start)) || undefined;

  if (mode === 'slots') {
    return (
      <div>
        <EditDate
          value={start}
          onChange={v => {
            const s = differenceInMilliseconds(start, startOfDay(start));
            const e = differenceInMilliseconds(endFn, startOfDay(endFn));

            return onChange([
              addMilliseconds(startOfDay(v), s),
              addMilliseconds(startOfDay(v), e)
            ]);
          }}
          style={{ paddingBottom: '0.25rem' }}
          {...props}
        />
        <EditTimeRange
          slots={slots}
          value={
            start && end
              ? [
                  differenceInMilliseconds(start, startOfDay(start)),
                  differenceInMilliseconds(endFn, startOfDay(endFn))
                ]
              : undefined
          }
          onChange={v =>
            onChange(
              Array.isArray(v) && v[0] && v[1]
                ? [
                    addMilliseconds(startOfDay(start || new Date()), v[0]),
                    addMilliseconds(startOfDay(endFn || new Date()), v[1])
                  ]
                : undefined
            )
          }
        />
      </div>
    );
  }

  return (
    <div>
      <EditDateTime
        value={start}
        onChange={v => onChange([v, end])}
        style={{ paddingBottom: '0.25rem' }}
        {...props}
      />
      {mode ? (
        <EditDuration
          mode={mode}
          value={
            start && endFn ? differenceInMilliseconds(endFn, start) : undefined
          }
          onChange={v => onChange([start, addMilliseconds(new Date(start), v)])}
        />
      ) : (
        <EditDateTime
          value={endFn}
          onChange={v => onChange([start, endOfDay(v)])}
          {...props}
        />
      )}
    </div>
  );
};
Edit.displayName = 'EditDatetimerange';
Edit.type = 'array';
export default Edit;
