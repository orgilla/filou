import React from 'react';
import { Input } from 'antd';
import { withPropsOnChange } from 'recompose';

const durations = {
  seconds: {
    min: 0,
    max: 300,
    step: 15,
    defaultValue: 60,
    addonAfter: 'Sekunden',
    scalar: 1000
  },
  minutes: {
    min: 0,
    max: 300,
    step: 15,
    defaultValue: 60,
    addonAfter: 'Minuten',
    scalar: 60000
  },
  hours: {
    min: 0,
    max: 48,
    step: 1,
    defaultValue: 1,
    addonAfter: 'Stunden',
    scalar: 60000 * 60
  },
  days: {
    min: 0,
    max: 31,
    step: 1,
    defaultValue: 1,
    addonAfter: 'Tage',
    scalar: 60000 * 60 * 24
  },
  weeks: {
    min: 0,
    max: 52,
    step: 1,
    defaultValue: 1,
    addonAfter: 'Wochen',
    scalar: 60000 * 60 * 24 * 7
  },
  months: {
    min: 0,
    max: 24,
    step: 1,
    defaultValue: 1,
    addonAfter: 'Monate',
    scalar: 60000 * 60 * 24 * 31
  },
  years: {
    min: 0,
    max: 50,
    step: 1,
    defaultValue: 1,
    addonAfter: 'Jahre',
    scalar: 60000 * 60 * 24 * 365
  }
};

const enhance = withPropsOnChange(
  ['value', 'onChange', 'mode'],
  ({ value, onChange, mode }) => {
    const props = durations[mode] || durations.minutes;

    return {
      ...props,
      value: `${
        value || value === 0
          ? parseInt(value, 10) / props.scalar || 0
          : undefined
      }`,
      onFocus: v => v.target.select(),
      onChange: v => {
        v = parseInt(v.target.value, 10);
        onChange(v || v === 0 ? v * props.scalar : undefined);
      }
    };
  }
);

const Edit = enhance(props => <Input style={{ width: '100%' }} {...props} />);
Edit.displayName = 'EditDuration';
Edit.type = 'integer';
export default Edit;
