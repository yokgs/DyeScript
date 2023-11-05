export function DyeScript2ReactNative(assembledStyles) {
    let { reactnative } = ReactNativeBuilder(assembledStyles);
    console.log('Building React StyleSheet...');
    return reactnative;
}