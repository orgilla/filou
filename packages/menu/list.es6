import React, { Children, cloneElement } from 'react';
import Title from './title';
import Item from './item';
import Divider from './divider';

const List = ({
  children,
  className,
  _ref,
  innerRef,
  ref,
  style,
  extra,
  title,
  onClick,
  collapsed
}) => (
  <div
    className={className}
    ref={_ref || innerRef || ref}
    style={style}
    onClick={!title ? onClick : null}
  >
    {title && (
      <Title collapsed={collapsed} onClick={onClick} extra={extra}>
        {title}
      </Title>
    )}
    {Children.map(
      children,
      child => (child ? cloneElement(child, { collapsed }) : child)
    )}
  </div>
);

List.Title = Title;
List.Item = Item;
List.Divider = Divider;

export default List;
