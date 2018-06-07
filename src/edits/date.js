import React, { Component } from 'react';
import { Popover } from 'antd';
import { format, isValid, startOfDay, compareAsc } from 'date-fns';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import Calendar from '@filou/calendar';
import MaskedTextInput from './mask-input';
import FormIcon from '../form/form-icon';

const getDate = date => !!date && new Date(date.split('.').reverse());
const getDateString = date =>
  date ? format(new Date(date), 'DD.MM.YYYY') : undefined;

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = { input: getDateString(props.value) };
  }

  componentWillReceiveProps({ value }) {
    if (compareAsc(new Date(this.props.value), new Date(value)) !== 0) {
      this.setState({
        input: !value ? undefined : getDateString(value),
      });
    }
  }

  render() {
    const {
      value,
      onChange,
      calendar: CalendarComponent,
      ...rest
    } = this.props;
    const { input } = this.state;
    const Cal = CalendarComponent || Calendar;

    return (
      <MaskedTextInput
        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
        placeholder="Datum"
        suffix={
          <Popover
            placement="bottomRight"
            trigger="click"
            content={<Cal value={value} arrows onChange={onChange} />}
          >
            <FormIcon type="calendar" onClick={() => {}} />
          </Popover>
        }
        value={input}
        onChange={e => {
          const date = e.target.value;

          if (!date) {
            onChange();
          } else if (date.search('_') === -1 && isValid(getDate(date))) {
            onChange(startOfDay(getDate(date)));
          } else {
            this.setState({ input: date });
          }
        }}
        pipe={createAutoCorrectedDatePipe('dd.mm.yyyy')}
        {...rest}
      />
    );
  }
}
Edit.displayName = 'EditColor';
Edit.type = 'date';
export default Edit;
