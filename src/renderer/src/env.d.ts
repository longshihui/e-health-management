/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface Window {
  electron: {
    getConfig: () => Promise<{ workDuration: number; breakDuration: number }>;
    setConfig: (config: {
      workDuration: number;
      breakDuration: number;
    }) => Promise<boolean>;
    stopBreak: () => void;
    onBreakConfig: (callback: (config: { duration: number }) => void) => void;
    quitApp: () => void;
  };
}
