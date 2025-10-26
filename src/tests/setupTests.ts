import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

if (!globalThis.ResizeObserver) {
  // Attach the polyfill globally so jsdom understands it
  globalThis.ResizeObserver = Polyfill;
}
