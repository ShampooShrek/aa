declare global {
  interface Window {
    app: {
      send: (channel: string, args: any) => void
      on: (channel: string, listener: (event: any, args: any[]) => void) => void
    }
  }
}

export {}