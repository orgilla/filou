import React from 'react';

const createMenuItems = (Group, Item, menu = [], props = {}) => {
  const MenuItem = ({ slug, title, children, hide, ...rest }) => {
    if (hide) {
      return null;
    }
    const childs =
      children &&
      children
        .filter(x => x.hide !== true)
        .map((item, i) => (
          <MenuItem {...props} {...item} key={item.slug || item.title || i} />
        ));
    return childs && childs.length ? (
      <Group
        {...props}
        {...rest}
        title={slug ? <Item to={slug}>{title}</Item> : <Item>{title}</Item>}
      >
        {childs}
      </Group>
    ) : (
      <Item {...props} {...rest} to={slug}>
        {title}
      </Item>
    );
  };
  return menu.map((item, i) => (
    <MenuItem {...props} {...item} key={item.slug || item.title || i} />
  ));
};

export default createMenuItems;
