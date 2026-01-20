const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fastmarket', {
  ping: () => ipcRenderer.invoke('app:ping'),
});
