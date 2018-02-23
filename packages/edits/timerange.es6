import React from 'react';
import { createComponent } from 'react-fela';
import { Radio, Slider } from 'antd';
import { withPropsOnChange } from 'recompose';
import { FaTimes } from '@filou/icons';

const Container = createComponent(
  ({ theme }) => ({
    height: 'auto',
    marginTop: theme.space1,
    paddingX: theme.space4,
    paddingY: theme.space1
  }),
  'div'
);

const RadioGroup = createComponent(
  ({ theme }) => ({
    width: '100%',
    display: 'flex',
    '> .ant-radio-button-wrapper': {
      flexGrow: 1,
      textAlign: 'center',
      height: 'auto',
      lineHeight: 'initial',
      padding: theme.space2,
      position: 'relative',
      '> span > svg': {
        center: true
      },
      onHover: {
        '> span > svg': {
          fill: theme.color
        }
      }
    }
  }),
  p => <Radio.Group {...p} />,
  p => Object.keys(p)
);

const numberToTime = number =>
  number % 1 === 0.5 ? `${number}`.replace('.5', ':30') : `${number}:00`;

const Edit = withPropsOnChange(['slots'], ({ slots = [9, 12, 15, 18] }) => {
  const obj = {};
  slots.forEach(m => {
    obj[m] = numberToTime(m);
  });

  return {
    obj,
    slots
  };
})(
  ({
    value: [start = 0, end = 0] = [],
    step = 0.5,
    slots,
    obj,
    onChange,
    slider = true
  }) => (
    <div>
      <RadioGroup
        onChange={e =>
          onChange(
            e.target.value
              ? e.target.value.split('|').map(v => parseInt(v, 10))
              : undefined
          )
        }
        value={[start, end].join('|')}
      >
        {slots.map(
          (mark, i) =>
            slots[i + 1] ? (
              <Radio.Button
                key={[mark * 60000 * 60, slots[i + 1] * 60000 * 60].join('|')}
                value={[mark * 60000 * 60, slots[i + 1] * 60000 * 60].join('|')}
              >
                {numberToTime(mark)}
                <br />
                {numberToTime(slots[i + 1])}
              </Radio.Button>
            ) : (
              <Radio.Button
                key="all"
                value={[
                  Math.min(...slots) * 60000 * 60,
                  Math.max(...slots) * 60000 * 60
                ].join('|')}
              >
                {numberToTime(Math.min(...slots))}
                <br />
                {numberToTime(Math.max(...slots))}
              </Radio.Button>
            )
        )}
        <Radio.Button key="cancel">
          <FaTimes size={16} />
        </Radio.Button>
      </RadioGroup>

      {!!slider && (
        <Container className="ant-input">
          <Slider
            range
            min={Math.min(...slots)}
            max={Math.max(...slots)}
            marks={obj}
            tipFormatter={v => numberToTime(v)}
            step={step}
            onChange={([s, e]) => onChange([s * 60000 * 60, e * 60000 * 60])}
            value={
              start && end
                ? [start / (60000 * 60), end / (60000 * 60)]
                : undefined
            }
          />
        </Container>
      )}
    </div>
  )
);
Edit.displayName = 'EditTimerange';
Edit.type = 'array';
export default Edit;
