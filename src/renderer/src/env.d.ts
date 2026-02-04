/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  // AppConfig is now imported from src/types/index.d.ts in usage
  // but for global declaration we might need to reference it or keep it here if it's used globally without import
  // However, the request is to unify types.
  // Since this is a d.ts file, we can import types.
  
  interface Window {
    electron: {
      getConfig: () => Promise<AppConfig>;
      setConfig: (config: Partial<AppConfig>) => Promise<boolean>;
      stopBreak: () => void;
      onBreakConfig: (callback: (config: { duration: number }) => void) => void;
      quitApp: () => void;
    };
  }
}

// Re-export AppConfig to be available globally if needed, or rely on import
import { AppConfig } from '../../types';

declare global {
  // Ensure AppConfig is available globally for the renderer
  type AppConfig = import('../../types').AppConfig;
}

export {};
