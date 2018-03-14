import React, { Component } from 'react';
import { message, Button, notification } from 'antd';

let ipcRenderer;
if (process.env.IS_ELECTRON) {
  ipcRenderer = require('electron').ipcRenderer;
}

export default class Updater extends Component {
  componentDidMount() {
    if (ipcRenderer) {
      ipcRenderer.on('update', this.onUpdate);
      this.interval = setInterval(this.check, 1000 * 60);
      this.check();
    }
  }
  componentWillUnmount() {
    if (ipcRenderer) {
      if (this.hide) {
        this.hide();
      }
      clearInterval(this.interval);
      ipcRenderer.removeListener('update', this.onUpdate);
    }
  }
  onUpdate = (event, { type, data }) => {
    if (type === 'downloaded') {
      if (this.hide) {
        this.hide();
      }
      const btn = (
        <Button
          type="primary"
          size="small"
          onClick={() => ipcRenderer.send('update', { type: 'install' })}
        >
          Neu starten
        </Button>
      );
      notification.open({
        message: 'Update bereit',
        description:
          'Ein Update wurde installiert, aber das Programm muss neu gestartet werden um die neue Version zu nutzen.',
        btn,
        placement: 'bottomRight',
        duration: 0,
        key: 'update'
      });
    }
    if (type === 'error') {
      if (this.hide) {
        this.hide();
      }
      // this.hide = message.info('Neues Update verfügbar.', 0);
    }
    if (type === 'available') {
      if (this.hide) {
        this.hide();
      }
      // this.hide = message.info('Neues Update verfügbar.', 0);
    }
  };
  check = () => {
    ipcRenderer.send('update', { type: 'check' });
  };
  render() {
    return null;
  }
}
