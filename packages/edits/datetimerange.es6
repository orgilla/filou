import React from 'react';
import {
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

  if (mode === 'slots') {
    return (
      <div>
        <EditDate
          value={start}
          onChange={v => {
            const s = differenceInMilliseconds(start, startOfDay(start));
            const e = differenceInMilliseconds(end, startOfDay(end));

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
                  differenceInMilliseconds(end, startOfDay(end))
                ]
              : undefined
          }
          onChange={v =>
            onChange(
              Array.isArray(v) && v[0] && v[1]
                ? [
                    addMilliseconds(startOfDay(start || new Date()), v[0]),
                    addMilliseconds(startOfDay(end || new Date()), v[1])
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
            start && end ? differenceInMilliseconds(end, start) : undefined
          }
          onChange={v => onChange([start, addMilliseconds(new Date(start), v)])}
        />
      ) : (
        <EditDateTime
          value={end}
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
