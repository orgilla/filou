import React from 'react';
import { compose, toClass, withState } from 'recompose';
import SlateWriter from '@filou/slate/slate-writer';
import { Button } from 'antd';
import FormItem from '../form/form-item';

const enhance = compose(withState('isOpen', 'setOpen', false), toClass);

const Edit = enhance(
  ({
    isOpen,
    setOpen,
    'data-__field': dataField,
    'data-__meta': dataMeta,
    onChange,
    value,
    binding,
    label,
    children,
    ...p
  }) => (
    <FormItem
      label={label}
      data-__field={dataField}
      data-__meta={dataMeta}
      {...p}
    >
      <Button
        type={isOpen === true ? 'primary' : 'default'}
        onClick={() => setOpen(!isOpen)}
        style={{ width: '50%' }}
      >
        Bearbeiten
      </Button>
      <Button onClick={() => setOpen('full')} style={{ width: '50%' }}>
        Vollbildmodus
      </Button>

      {isOpen && (
        <SlateWriter
          onChange={onChange}
          value={value}
          binding={binding}
          placeholder={label || 'Hier Text eingeben!'}
          style={{ padding: 20 }}
          full={isOpen === 'full'}
          setFull={() => setOpen(false)}
        >
          {children}
        </SlateWriter>
      )}
    </FormItem>
  )
);
Edit.displayName = 'EditSlate';
Edit.type = 'object';
export default Edit;
