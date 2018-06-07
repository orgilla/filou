import React from 'react';
import { withState, withPropsOnChange, compose } from 'recompose';
import { isEmpty } from 'lodash';

const enhance = compose(
  withState('isOpen', 'setOpen', false),
  withPropsOnChange(['value'], ({ value }) => ({
    value: (Array.isArray(value) ? value : [value]).filter(x => !isEmpty(x)),
  }))
);
export default renderFn =>
  enhance(props => {
    const { onChange, value, isOpen, setOpen, multi } = props;

    return (
      <div>
        <div
          onClick={() =>
            imagePick((value = []) => {
              onChange(multi ? value : value[0]);
              setOpen(false);
            })
          }
        >
          {renderFn(value, props)}
        </div>
      </div>
    );
  });
