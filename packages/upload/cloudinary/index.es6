import { withApollo } from 'react-apollo';
import { compose, withProps } from 'recompose';
import gql from 'graphql-tag';

export default compose(
  withApollo,
  withProps({
    onChange: async (
      list,
      {
        fileList,
        client,
        app = 'test',
        setUploading,
        onSuccess = () => {},
        onError = () => {}
      }
    ) => {
      if (list) {
        fileList = list;
      }

      let remaining = fileList.length;
      setUploading(remaining);
      const timestamp = Math.round(new Date().getTime() / 1000);
      const { data } = await client.query({
        query: gql`
          query signUpload($folder: String, $timestamp: Int!, $ocr: String) {
            signUpload(folder: $folder, timestamp: $timestamp, ocr: $ocr)
          }
        `,
        variables: {
          ocr: 'adv_ocr',
          timestamp,
          folder: `/${app}`
        }
      });

      const { signUpload } = data;
      if (!signUpload) {
        throw new Error('No signature');
      }

      const values = await Promise.all(
        fileList.map(file => {
          const body = new FormData();
          body.append('folder', `/${app}`);
          body.append('api_key', `179442986443332`);
          body.append('ocr', 'adv_ocr');
          body.append('signature', signUpload);
          body.append('timestamp', timestamp);
          body.append('file', file.link ? file.link : file);
          return fetch(
            'https://api.cloudinary.com/v1_1/djyenzorc/auto/upload',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json'
              },
              body
            }
          )
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
