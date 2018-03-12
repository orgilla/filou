import React, { Component, Fragment } from 'react';
import { createComponent } from 'react-fela';
import { Drawer } from '@filou/portal';
import Menu, { StackedMenu } from '@filou/menu';
import {
  FaCube,
  FaCheck,
  FaTimes,
  FaTrashAlt,
  FaArrowLeft,
  FaAngleRight
} from '@filou/icons';
import { compose, withState, withPropsOnChange } from 'recompose';
import { Icon } from 'antd';
import { get } from 'lodash';
import Form from './autoform';

const Wrapper = createComponent(
  ({ theme }) => ({
    paddingX: theme.space3,
    '& .ant-form-item-label': {
      textAlign: 'left'
    }
  }),
  'div'
);

const flatten = (fields, activeKeys = [], wrap) => {
  const active = wrap
    ? activeKeys.join('.')
    : activeKeys[activeKeys.length - 1] || '';
  const flattenFields = {};
  const innerFlatten = (f, k = '') =>
    Object.keys(f).forEach(fieldName => {
      const key = wrap && k ? `${k}.${fieldName}` : fieldName;

      if (f[fieldName].edit === 'form') {
        innerFlatten(get(f[fieldName], 'editProps.fields', {}), key);
      }

      flattenFields[key] = {
        ...f[fieldName],
        key,
        hidden: k !== active || f[fieldName].hidden
      };
    });

  innerFlatten(fields);
  return flattenFields;
};

const enhance = compose(
  withState('keys', 'setKeys', []),
  withPropsOnChange(['fields', 'keys', 'wrap'], ({ fields, keys, wrap }) => ({
    fields: flatten(fields, keys, wrap)
  })),
  withPropsOnChange(
    ['title', 'subtitle', 'keys', 'fields', 'wrap'],
    ({ title, subtitle, keys, fields, wrap }) => {
      const field = wrap
        ? fields[keys.join('.')]
        : fields[keys[keys.length - 1]];

      return {
        title: keys.length ? field.label : title,
        subtitle: keys.length ? title : subtitle
      };
    }
  ),
  withPropsOnChange(['fields'], ({ fields }) => ({
    formTabs: Object.keys(fields)
      .map(
        key => (fields[key].edit === 'form' ? { key, ...fields[key] } : null)
      )
      .filter(x => x)
  })),
  withPropsOnChange(['open'], ({ open, keys, setKeys }) => {
    if (open && keys.length > 0) {
      setKeys([]);
    }
  })
);

@enhance
export default class DrawerForm extends Component {
  getIcon = icon =>
    icon
      ? (typeof icon === 'string' && <Icon type={icon} />) || icon
      : icon === undefined && <FaCube />;

  handleClose = () => {
    const { form, hasChanged = form.isFieldsTouched(), onClose } = this.props;

    if (
      !hasChanged ||
      window.confirm('Schließen und ungespeicherte Änderungen verwerfen?')
    ) {
      onClose();
    }
  };

  resolve = args => {
    const { resolve, wrap, keys, setKeys } = this.props;
    const result = { ...args };

    if (args.edit === 'form')
      result.component = ({ id, preview, placeholder, disabled }) =>
        preview || (
          <Menu.Item
            onClick={() => setKeys(wrap ? id.split('.') : [...keys, id])}
            extra={<FaAngleRight />}
            disabled={disabled}
          >
            {placeholder || args.label}
          </Menu.Item>
        );

    return resolve ? resolve(result) : result;
  };

  renderMenu = () => {
    const {
      layout,
      form,
      title,
      subtitle,
      fields,
      keys,
      setKeys,
      loader
    } = this.props;
    const [lastKey, ...restKeys] = [...keys].reverse();

    return (
      <Fragment>
        {loader}

        <Menu
          header={
            !!title && (
              <Menu.Item large subtitle={subtitle}>
                {title}
              </Menu.Item>
            )
          }
        >
          <Wrapper>
            <Form
              layout={layout}
              fields={fields}
              resolve={this.resolve}
              form={form}
            />
          </Wrapper>

          {!!lastKey && <Menu.Space />}
          {!!lastKey && (
            <Menu.Item
              key="back"
              icon={<FaArrowLeft />}
              onClick={() => setKeys([...restKeys])}
            >
              Zurück
            </Menu.Item>
          )}
        </Menu>
      </Fragment>
    );
  };

  render() {
    const {
      icon,
      label,
      sublabel,
      open,
      onSave,
      onClose,
      onDelete,
      layout,
      width,
      color = true,
      form,
      hasChanged = form.isFieldsTouched(),
      keys,
      setKeys,
      formTabs,
      wrap
    } = this.props;
    const [lastKey, ...restKeys] = [...keys].reverse();

    return (
      <Drawer
        open={!!open}
        width={width || (layout === 'horizontal' ? 520 : 400)}
        right
        onClose={this.handleClose}
        menu={
          <Menu
            color={color}
            inverted
            collapsed
            header={
              <Menu.Item large icon={this.getIcon(icon)} subtitle={sublabel}>
                {label}
              </Menu.Item>
            }
          >
            {!!lastKey && (
              <Menu.Item
                key="back"
                icon={<FaArrowLeft />}
                onClick={() => setKeys([...restKeys].reverse())}
              >
                Zurück
              </Menu.Item>
            )}
            {!!lastKey && <Menu.Divider />}

            {!!wrap &&
              formTabs.map(field => (
                <Menu.Item
                  key={field.key}
                  icon={this.getIcon(field.icon)}
                  onClick={() =>
                    setKeys(wrap ? field.key.split('.') : [...keys, field.key])
                  }
                >
                  {field.label}
                </Menu.Item>
              ))}
            {!!wrap && !!formTabs.length && <Menu.Divider />}

            {!!onSave && (
              <Menu.Item
                icon={<FaCheck />}
                onClick={onSave}
                disabled={!hasChanged}
              >
                Speichern
              </Menu.Item>
            )}
            {!!onClose && (
              <Menu.Item icon={<FaTimes />} onClick={onClose}>
                Abbrechen
              </Menu.Item>
            )}
            {!!onDelete && (
              <Menu.Item icon={<FaTrashAlt />} onClick={onDelete}>
                Löschen
              </Menu.Item>
            )}
          </Menu>
        }
      >
        <StackedMenu keys={keys} renderMenu={this.renderMenu} />
      </Drawer>
    );
  }
}
