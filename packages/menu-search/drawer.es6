import React, { Component } from 'react';
import { FaSearch, FaFile } from '@filou/icons';
import { Drawer } from '@filou/portal';
import Menu from '@filou/menu';

export default class SearchDrawer extends Component {
  componentWillReceiveProps({ open }) {
    if (open && !this.props.open) {
      this.input.focus();
    }
  }

  render() {
    const {
      open,
      onClose,
      value,
      placeholder,
      onChange,
      results = [],
      header,
    } = this.props;
    return (
      <Drawer
        color="white"
        open={open}
        onClose={() => {
          onClose();
        }}
      >
        <Menu color="white" collapsed header={header}>
          <Menu.Item onClick={onClose} icon={<FaSearch />} />
        </Menu>
        <Menu
          header={
            <Menu.Item large style={{ padding: 0 }}>
              <Menu.Input
                innerRef={x => {
                  this.input = x;
                }}
                placeholder={placeholder}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
              />
            </Menu.Item>
          }
        >
          {results.map(item => (
            <Menu.Item
              key={item.id}
              onClick={onClose}
              icon={item.icon || <FaFile />}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    );
  }
}
