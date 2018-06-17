import React, { Fragment } from 'react';
import { Link } from 'react-static';

const MenuItem = ({ slug, title, children, singlePage }) => {
  const inner = slug ? <Link to={slug}>{title}</Link> : title;
  const childs =
    children && !singlePage ? (
      <ul>
        {children.map(item => (
          <MenuItem {...item} key={item.slug || item.title} />
        ))}
      </ul>
    ) : null;
  return (
    <li>
      {inner}
      {childs}
    </li>
  );
};

const Sitemap = ({ sitemap }) => (
  <Fragment>
    <ul>
      {sitemap.map(item => (
        <MenuItem {...item} key={item.slug || item.title} />
      ))}
    </ul>
    <br />
  </Fragment>
);

export default Sitemap;
