import debugFactory from "debug";

export const getDebugger = (namespace: string) =>
  debugFactory(`mapbox-toolkit:${namespace}`);
