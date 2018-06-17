import React, { Fragment } from 'react';
import { createComponent } from 'react-fela';
import { Container as _Container } from '@filou/core';
import { withRouteData } from 'react-static';
import get from 'lodash/get';
import Markdown from '../markdown';
import Chapters from '../chapters';

const Container = createComponent(
  () => ({
    // marginRight: 360
  }),
  props => <_Container {...props} />,
  ['size']
);

const HeaderBar = createComponent(
  ({ theme }) => ({
    ...get(theme, 'filou/static.post.headerBar', {}),
    textAlign: 'left',
    '& h1': {
      margin: 0
    }
  }),
  ({ children, className }) => (
    <div className={className}>
      <Container size="small">
        <h1>{children}</h1>
      </Container>
    </div>
  )
);

const Post = ({ title, author, date, ast, children, cover, headings }) => (
  <Fragment>
    {title && <br />}
    {title && <HeaderBar>{title}&nbsp;</HeaderBar>}
    <Chapters headings={headings}>
      {cover ? <img sizes={cover.childImageSharp.sizes} /> : null}
      <Container size="small">
        {date || author ? (
          <h4 style={{ color: 'rgb(165, 164, 164)' }}>
            {author} <span style={{ fontSize: '0.8em' }}> -{date}</span>
          </h4>
        ) : null}
        {ast && <Markdown source={ast} />}
      </Container>
    </Chapters>
    {children}
  </Fragment>
);

export default withRouteData(Post);
