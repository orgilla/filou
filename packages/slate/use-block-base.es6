import React, { Component } from 'react';
import { createComponent } from 'react-fela';

export default options => Block => {
  const StyledBlock = createComponent(
    ({ isSelected, theme, node }) => ({
      outline: isSelected && options.category && `2px solid ${theme.color}`
    }),
    p => <Block {...p} />,
    p => Object.keys(p)
  );

  // @dnd
  class BaseDecorator extends Component {
    static slate = options;

    setData = data => {
      const { editor } = this.props;
      const transform = editor.value
        .change()
        .setNodeByKey(this.n.key, { data: { ...this.n.data.toJS(), ...data } });
      editor.onChange(transform);
    };

    getData = (name, defaultValue) => this.n.data.get(name) || defaultValue;

    setActive = () => {
      const { node, editor } = this.props;
      const transform = editor.value.change().moveToRangeOf(node);
      editor.onChange(transform);
    };

    render() {
      const { editor, children, isSelected } = this.props;
      const { node } = this.props;
      this.n = node;

      return (
        <StyledBlock
          {...this.props}
          node={node}
          getData={this.getData}
          setData={this.setData}
          setActive={this.setActive}
          readOnly={editor.props.readOnly}
        >
          {options.isVoid === false ? children : []}
        </StyledBlock>
      );
    }
  }
  return BaseDecorator;
};
