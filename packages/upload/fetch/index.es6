import { compose, withProps } from 'recompose';

export default compose(
  withProps({
    onChange: async (
      list,
      { fileList, url, setUploading, onSuccess = () => {}, onError = () => {} }
    ) => {
      if (list) {
        fileList = list;
      }
      let remaining = fileList.length;
      setUploading(remaining);
      const values = await Promise.all(
        fileList.map(file => {
          const body = new FormData();
          body.append('file', file.link ? file.link : file);
          return fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json'
            },
            body
          })
            .then(response => response.json())
            .then(res => {
              setUploading(remaining--);
              return onSuccess(res);
            })
            .catch(error => {
              console.log(error);
              setUploading(remaining--);
              return onError(error);
            });
        })
      );
      console.log(values);
      setUploading(0);
    }
  })
);
