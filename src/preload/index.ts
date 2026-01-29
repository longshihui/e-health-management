import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getConfig: () => ipcRenderer.invoke('get-config'),
  setConfig: (config: { workDuration: number; breakDuration: number }) => ipcRenderer.invoke('set-config', config),
  stopBreak: () => ipcRenderer.send('stop-break'),
  onBreakConfig: (callback: (config: { duration: number }) => void) => {
    ipcRenderer.on('break-config', (_event, value) => callback(value));
  },
  quitApp: () => ipcRenderer.send('app-quit')
});
