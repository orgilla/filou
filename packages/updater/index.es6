import React, { Component } from 'react';
import { message, Button, notification } from 'antd';

let ipcRenderer;
if (process.env.IS_ELECTRON) {
  ipcRenderer = require('electron').ipcRenderer;
}

export default class Updater extends Component {
  componentDidMount() {
    if (ipcRenderer) {
      ipcRenderer.send('gdt', { status: 'start' });
      ipcRenderer.on('update', this.onUpdate);
    }
  }
  componentWillUnmount() {
    if (ipcRenderer) {
      ipcRenderer.send('gdt', { status: 'stop' });
      ipcRenderer.removeListener('gdt', this.onReceiveGdtPatient);
    }
  }
  onUpdate = (event, { type, data }) => {
    if (type === 'downloaded') {
      if (this.hide) {
        this.hide();
      }
      const key = `open${Date.now()}`;
      const btn = (
        <Button
          type="primary"
          size="small"
          onClick={() => ipcRenderer.send('update-install')}
        >
          Beenden & installieren
        </Button>
      );
      notification.open({
        message: 'Notification Title',
        description:
          'Ein Update wurde heruntergeladen. Möchten Sie es jetzt installieren?',
        btn,
        key
      });
    }
    if (type === 'error') {
      if (this.hide) {
        this.hide();
      }
    }
    if (type === 'available') {
      if (this.hide) {
        this.hide();
      }
      this.hide = message.loading('Neues Update wird heruntergeladen..', 0);
    }
  };
  render() {
    return null;
  }
}
