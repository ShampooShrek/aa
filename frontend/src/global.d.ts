declare global {
  interface Window {
    api: {
      send: (channel: string, args: any) => void
      on: (channel: string, listener: (event: any, args: any[]) => void) => void
    }
  }
}