// src/declarations.d.ts

declare module "@heroicons/react/solid";
declare module "@heroicons/react/outline";
declare module "@heroicons/react/24/solid";

// —— 在下面新增 —— //
export {};

declare global {
  interface Window {
    api: {
      minimize: () => void;
      toggleMaximize: () => void;
      close: () => void;
    };
  }
}
