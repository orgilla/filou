import React, { Component } from 'react';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { format, addMilliseconds, startOfDay } from 'date-fns';
import MaskedTextInput from './mask-input';
import FormIcon from '../form/form-icon';

export const getMilliseconds = time => {
  let [hours = 0, minutes = 0] = time.split(' Uhr')[0].split(':');
  hours = !!hours && parseInt(hours.replace('_', '0'), 10);
  minutes = !!minutes && parseInt(minutes.replace('_', '0'), 10);

  return hours === false && minutes === false
    ? undefined
    : hours * 3.6e6 + minutes * 60000;
};

const getTimeString = milliseconds =>
  format(
    addMilliseconds(startOfDay(new Date()), parseInt(milliseconds, 10)),
    'HH:mm'
  );

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = { input: getTimeString(props.value) };
  }

  componentWillReceiveProps({ value }) {
    if (this.props.value !== value) {
      this.setState({
        input: !!value !== undefined ? getTimeString(value) : value
      });
    }
  }

  render() {
    const { value, onChange, ...rest } = this.props;
    const { input } = this.state;

    return (
      <MaskedTextInput
        mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', 'U', 'h', 'r']}
        placeholder="Zeit"
        suffix={<FormIcon type="clock-circle-o" />}
        value={input}
        onChange={e => {
          const time = e.target.value;

          if (time.search('_') === -1) onChange(getMilliseconds(time));
          else this.setState({ input: time });
        }}
        pipe={createAutoCorrectedDatePipe('HH:MM')}
        {...rest}
      />
    );
  }
}
Edit.displayName = 'EditTime';
Edit.type = 'integer';
export default Edit;
