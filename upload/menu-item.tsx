import React, { Fragment } from 'react';
import { Upload as AntUpload, Progress } from 'antd';
import { FaDropbox, FaUpload } from '@filou/icons';
import { withApollo } from 'react-apollo';
import Menu from '@filou/menu';
import { withState, compose, withHandlers } from 'recompose';
import gql from 'graphql-tag';
import DropboxChooser from './dropbox';

const enhance = compose(
  withState('fileList', 'setFileList', []),
  withState('isUploading', 'setUploading', 0),
  withApollo,
  withHandlers({
    onChange: ({
      fileList,
      client,
      app = 'test',
      setUploading,
      onSuccess = () => {},
      onError = () => {},
    }) => async list => {
      if (list) {
        fileList = list;
      }

      let remaining = fileList.length;
      setUploading(remaining);
      const timestamp = Math.round(new Date().getTime() / 1000);
      const { data } = await client.query({
        query: gql`
          query signUpload($folder: String, $timestamp: Int!) {
            signUpload(folder: $folder, timestamp: $timestamp)
          }
        `,
        variables: {
          timestamp,
          folder: `/${app}`,
        },
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
          body.append('signature', signUpload);
          body.append('timestamp', timestamp);
          body.append('file', file.link ? file.link : file);
          return fetch(
            'https://api.cloudinary.com/v1_1/djyenzorc/auto/upload',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
              },
              body,
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
    },
  })
);
export default enhance(({ onChange, isUploading }) => (
  <Fragment>
    {!!isUploading && (
      <Menu.Item>
        <Progress percent={100 / isUploading} status="active" />
      </Menu.Item>
    )}
    {!isUploading && (
      <AntUpload.Dragger
        multiple
        name="file"
        fileList={[]}
        beforeUpload={() => false}
        onChange={info => {
          onChange(info.fileList);
        }}
      >
        <p className="ant-upload-drag-icon">
          <FaUpload />
        </p>
        <p className="ant-upload-text">Klicken oder Dateien hierher ziehen</p>
        <p className="ant-upload-hint">
          Unterstützt Dokumente, Bilder und Videos kleiner als 50mb.
        </p>
      </AntUpload.Dragger>
    )}
    {!isUploading && (
      <Menu.List title="Andere Anbieter">
        <DropboxChooser
          appKey="179442986443332"
          onChange={files =>
            onChange(
              files.map(x => ({
                name: x.link.split('/').pop(),
                link: x.link,
                uid: x.id,
              }))
            )
          }
          // onCancel={() => this.onCancel()}
          multiselect
          extensions={[]}
        >
          {({ onClick }) => (
            <Menu.Item icon={<FaDropbox />} onClick={onClick}>
              Dropbox
            </Menu.Item>
          )}
        </DropboxChooser>
      </Menu.List>
    )}
  </Fragment>
));

/*

astModified
:
1516953587482
lastModifiedDate
:
Fri Jan 26 2018 08:59:47 GMT+0100 (CET) {}
name
:
"logo.png"
size
:
195768
type
:
"image/png"
uid
:
"rc-upload-1516986576261-19"
webkitRelativePath
:
""


*/

/*
bytes
:
228390
icon
:
"https://www.dropbox.com/static/images/icons64/page_white_picture.png"
id
:
"id:mNRiVQrvHmUAAAAAAA8kaw"
isDir
:
false
link
:
"https://dl.dropboxusercontent.com/1/view/0gtryvajvtgpp92/Artboard%202.png"
name
:
"Artboard 2.png"
thumbnailLink
:
"https://api-content.dropbox.com/r11/t/AACYbtaW2oX66eWH-H3m_47aOqzos0eblvOOLZDeA5FxOA/12/2561865/png/1517004000/0/2/Artboard%202.png/EMCu_AEYm9SQRyAHKAc/BO5FFGkN-qwohoBk9EiuyngMxb1rZ15oi4OF83SuOXw?bounding_box=75&mode=fit"

*/
