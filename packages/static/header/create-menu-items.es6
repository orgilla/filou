import React from 'react';

const createMenuItems = (Group, Item, menu, props = {}) => {
  const MenuItem = ({ slug, title, children, hide }) => {
    if (hide) {
      return null;
    }
    return children ? (
      <Group
        {...props}
        title={slug ? <Item to={slug}>{title}</Item> : <Item>{title}</Item>}
      >
        {children.map(item => (
          <MenuItem {...props} {...item} key={item.slug || item.title} />
        ))}
      </Group>
    ) : (
      <Item {...props} to={slug}>
        {title}
      </Item>
    );
  };
  return menu.map(item => (
    <MenuItem {...props} {...item} key={item.slug || item.title} />
  ));
};

export default createMenuItems;
