/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  // No client-side environment variables - API keys are handled server-side
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
