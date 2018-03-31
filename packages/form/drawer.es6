import React, { Component, Fragment } from 'react';
import { createComponent } from 'react-fela';
import { Drawer } from '@filou/portal';
import Menu, { StackedMenu } from '@filou/menu';
import {
  FaCube,
  FaCheck,
  FaTimes,
  FaTrash,
  FaArrowLeft,
  FaAngleRight,
  FaAngleLeft,
  FaHome
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
        key: k ? `${k}.${fieldName}` : fieldName,
        hidden: k !== active || f[fieldName].hidden
      };
    });

  innerFlatten(fields);
  return flattenFields;
};

const enhanceFields = compose(
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
  )
);

const Fields = enhanceFields(
  ({ layout, fields, form, resolve, title, subtitle, keys, setKeys }) => (
    <Menu
      header={
        !!title && (
          <Menu.Item
            large
            subtitle={subtitle}
            icon={
              keys.length > 0 && (
                <FaAngleLeft
                  onClick={() => setKeys(keys.splice(0, keys.length - 1))}
                />
              )
            }
          >
            {title}
          </Menu.Item>
        )
      }
    >
      <Wrapper>
        <Form layout={layout} fields={fields} resolve={resolve} form={form} />
      </Wrapper>
    </Menu>
  )
);

const enhance = compose(
  withState('keys', 'setKeys', []),
  withPropsOnChange(['fields'], ({ fields }) => {
    const tabs = Object.keys(fields)
      .map(
        key => (fields[key].edit === 'form' ? { key, ...fields[key] } : null)
      )
      .filter(x => x);
    return {
      formTabs: tabs,
      first: tabs.map(x => x.key).filter((x, i) => i === 0)
    };
  }),
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

  renderMenu = (keys, key) => {
    const { loader, first } = this.props;

    return (
      <Fragment>
        {loader}
        <Fields {...this.props} resolve={this.resolve} keys={keys} />
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
      onSaveClose,
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
      tabs,
      loading
    } = this.props;
    const [lastKey, ...restKeys] = [...keys].reverse();

    const isTabbbed = formTabs.length > 0;

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
            {!!onSave &&
              !loading && (
                <Menu.Item
                  icon={<FaCheck />}
                  onClick={onSave}
                  disabled={!hasChanged}
                >
                  Speichern
                </Menu.Item>
              )}
            {!!onSaveClose &&
              !loading && (
                <Menu.Item
                  icon={<FaCheck />}
                  onClick={onSaveClose}
                  disabled={!hasChanged}
                >
                  Speichern & Schließen
                </Menu.Item>
              )}
            {!!onClose && (
              <Menu.Item icon={<FaTimes />} onClick={onClose}>
                Abbrechen
              </Menu.Item>
            )}
            {!!onDelete && (
              <Menu.Item icon={<FaTrash />} onClick={onDelete}>
                Löschen
              </Menu.Item>
            )}

            {!!lastKey && !tabs && <Menu.Divider />}
            {!!lastKey &&
              !tabs && (
                <Menu.Item
                  key="back"
                  icon={<FaArrowLeft />}
                  onClick={() => setKeys([...restKeys].reverse())}
                >
                  Zurück
                </Menu.Item>
              )}
            {!!tabs &&
              isTabbbed && (
                <Fragment>
                  <Menu.Divider />
                  <Menu.Item
                    key="back"
                    icon={<FaHome />}
                    onClick={() => setKeys([...restKeys].reverse())}
                  >
                    Übersicht
                  </Menu.Item>

                  <Menu.Divider />

                  {formTabs.map(field => (
                    <Menu.Item
                      key={field.key}
                      icon={this.getIcon(field.icon)}
                      onClick={() => setKeys(field.key.split('.'))}
                    >
                      {field.label}
                    </Menu.Item>
                  ))}
                </Fragment>
              )}
          </Menu>
        }
      >
        {!!tabs && isTabbbed ? (
          <StackedMenu keys={keys} renderMenu={this.renderMenu} />
        ) : (
          this.renderMenu(keys)
        )}
      </Drawer>
    );
  }
}
