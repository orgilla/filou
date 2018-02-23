import React from 'react';
import AutoSizer from '@filou/core/autosizer';
import Form from './form';

export default ({ layout = 'auto', ...rest }) =>
  layout === 'auto' ? (
    <AutoSizer steps={[0, 400]}>
      {({ step }) => (
        <Form {...rest} layout={step === 400 ? 'horizontal' : 'vertical'} />
      )}
    </AutoSizer>
  ) : (
    <Form {...rest} layout={layout} />
  );
