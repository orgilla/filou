import React from 'react';
import { createComponent } from 'react-fela';
import { Upload as AntUpload, Progress } from 'antd';
import { FaDropbox, FaFile } from '@filou/icons';
import Menu from '@filou/menu';
import { withState, compose, withHandlers } from 'recompose';
import DropboxChooser from './dropbox';

const Dragger = createComponent(
  () => ({
    '& .ant-upload': {
      padding: 0,
    },
  }),
  p => <AntUpload.Dragger {...p} />,
  p => Object.keys(p)
);
const enhance = compose(
  withState('fileList', 'setFileList', []),
  withState('isUploading', 'setUploading', 0),
  withHandlers({
    handle: props => value => {
      if (props.onChange) {
        return props.onChange(value, props);
      }
    },
  })
);
export default enhance(({ handle, isUploading }) => (
  <Menu.List title="Hochladen">
    {!!isUploading && (
      <Menu.Item>
        <Progress
          percent={100 / isUploading}
          format={() => ''}
          status="active"
        />
      </Menu.Item>
    )}
    {!isUploading && (
      <Dragger
        multiple
        name="file"
        fileList={[]}
        beforeUpload={() => false}
        onChange={info => {
          handle(info.fileList);
        }}
      >
        <Menu.Item style={{ textAlign: 'left' }} icon={<FaFile />}>
          Lokale Dateien
        </Menu.Item>
      </Dragger>
    )}
    {!isUploading && (
      <DropboxChooser
        appKey="179442986443332"
        onChange={files =>
          handle(
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
          <Menu.Item
            style={{ textAlign: 'left' }}
            icon={<FaDropbox />}
            onClick={onClick}
          >
            Dropbox
          </Menu.Item>
        )}
      </DropboxChooser>
    )}
  </Menu.List>
));
