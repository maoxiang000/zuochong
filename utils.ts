
export const setIgnoreMouseEvents = (ignore: boolean) => {
  if (typeof window !== 'undefined' && (window as any).require) {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send('set-ignore-mouse-events', ignore, { forward: true });
    } catch (e) {
      // Not in electron or fallback
      console.warn('IPC set-ignore-mouse-events failed', e);
    }
  }
};
