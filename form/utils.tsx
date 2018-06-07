export const layout = {
  vertical: {},
  horizontal: { labelCol: { span: 7 }, wrapperCol: { span: 17 } },
  inline: {}
};

export const onEnterFocus = ref => e => {
  if (e.key === 'Enter') {
    return ref() && ref().refs && ref().refs.input.focus();
  }
  return false;
};

export const onEnterOk = onOk => e => {
  if (e.key === 'Enter') {
    onOk();
  }
};
