import React, { Component } from 'react';
import { Form } from 'antd';
import { withPropsOnChange } from 'recompose';
import { get, set } from 'lodash';
import DefaultEdits from './default-edits';
import defaultPattern from './default-pattern';
import FormItem from './form-item';
import FormIcon from './form-icon';

const reduce = (fns = [], value, props) => {
  const [fn, ...rest] = fns;

  if (fn) {
    const newValue = fn(value, props);
    if (newValue) {
      return reduce(rest, newValue);
    }
  }
  return value;
};

const defaultResolver = f => {
  const {
    edit,
    editProps,
    decoratorProps: { initialValue, rules = {}, ...decoratorProps } = {}
  } = f;

  const newEditProps = { ...editProps };
  let e = edit;

  switch (edit) {
    case 'phone':
      e = 'input';
      newEditProps.suffix = <FormIcon type="phone" />;
      // rules.pattern = 'phone';
      rules.message = 'Ungültige Nummer';
      rules.min = 4;
      rules.max = 20;
      break;

    case 'mobile':
      e = 'input';
      newEditProps.suffix = <FormIcon type="mobile" />;
      // rules.pattern = 'phone';
      rules.message = 'Ungültige Nummer';
      rules.min = 4;
      rules.max = 20;
      break;

    case 'url':
      e = 'input';
      newEditProps.suffix = <FormIcon type="link" />;
      rules.pattern = 'url';
      rules.message = 'Ungültige URL';
      rules.min = 4;
      rules.type = 'url';
      break;

    default:
  }

  const component =
    DefaultEdits[e] || DefaultEdits.test(e) || DefaultEdits.input;

  // rules.type: https://github.com/yiminghe/async-validator#type

  return {
    ...f,
    edit: e,
    decoratorProps: {
      initialValue,
      rules: [rules],
      ...decoratorProps
    },
    editProps: newEditProps,
    component
  };
};

const defaultProps = f => {
  const result = { ...f };

  if (!get(result, 'decoratorProps.rules.0.type')) {
    const type = get(f, 'component.type');
    set(result, 'decoratorProps.rules.0.type', type);

    if (type === 'date') {
      set(result, 'decoratorProps.rules.0.transform', v => new Date(v));
    }
  }
  if (!get(result, 'decoratorProps.rules.0.pattern')) {
    const pattern =
      defaultPattern[get(f, 'decoratorProps.rules.pattern')] ||
      get(f, 'decoratorProps.rules.pattern');

    if (pattern) set(result, 'decoratorProps.rules.0.pattern', pattern);
  }
  if (!get(result, 'editProps.placeholder'))
    set(result, 'editProps.placeholder', f.label);

  return result;
};

const compose = (resolvers = []) => {
  let r = [];

  if (!Array.isArray(resolvers)) {
    r = [resolvers];
  }
  r = [defaultProps, ...r.filter(x => x), defaultResolver].reverse();

  return (initial, props) => reduce(r, initial, props);
};

@withPropsOnChange(['resolve'], ({ resolve }) => ({
  resolve: compose(resolve)
}))
export default class AntForm extends Component {
  renderEdits = () => {
    const { fields = [], form, layout = 'vertical', resolve } = this.props;

    return Object.keys(fields).map((fieldName, i) => {
      const {
        edit,
        decoratorProps,
        editProps,
        component: Edit,
        hidden,
        ...field
      } = resolve(get(fields, [fieldName]));

      if (edit === 'form')
        return !hidden ? (
          <FormItem key={fieldName} layout={layout} {...field}>
            <Edit {...editProps} id={fieldName} />
          </FormItem>
        ) : null;

      return (
        <FormItem
          key={i}
          layout={layout}
          {...field}
          style={hidden ? { display: 'none' } : field.style}
        >
          {form.getFieldDecorator(fieldName, decoratorProps)(
            <Edit {...editProps} />
          )}
        </FormItem>
      );
    });
  };

  render() {
    const { layout = 'vertical', hideRequiredMark } = this.props;

    return (
      <Form layout={layout} hideRequiredMark={hideRequiredMark}>
        {this.renderEdits()}
      </Form>
    );
  }
}
