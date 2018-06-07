import { compose, withProps } from 'recompose';

export default compose(
  withProps({
    onChange: (
      list,
      { fileList, setUploading, onSuccess = () => {}, onError = () => {} }
    ) => {
      if (list) {
        fileList = list;
      }
      console.log('Starting upload of', fileList.length);
      setUploading(fileList.length);
      fileList.map(file => {
        console.log('Upload', file.link ? file.link : file);
        onSuccess(file);
      });
      setUploading(0);
      console.log('Done');
    }
  })
);
