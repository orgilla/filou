import { Form } from 'antd';
import validateMessages from './validate-messages';

export default (name, transform) => {
  if (typeof name === 'function') {
    transform = name;
    name = undefined;
  }
  if (!name) name = 'value';

  return Form.create({
    mapPropsToFields: props => {
      let value = props[name] || {};
      if (transform) {
        value = transform(value, props) || value;
      }

      const obj = {};
      Object.keys(value).forEach(field => {
        obj[field] = Form.createFormField({
          value: value[field]
        });
      });

      return obj;
    },
    validateMessages
  });
};
