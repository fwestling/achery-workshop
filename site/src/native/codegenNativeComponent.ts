// Stands in for react-native/Libraries/Utilities/codegenNativeComponent, which react-native-svg and
// react-native-safe-area-context import from their native view specs. react-native-web has no such module,
// and the real one is React Native's Flow source. On the web those packages render their `.web`
// implementations, so the native views registered here are never drawn; this returns a placeholder that
// renders nothing.

const codegenNativeComponent = (_componentName: string) => () => null

export default codegenNativeComponent
