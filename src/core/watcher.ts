function DyeAssembler(path, options) {
    options.from = process.cwd();
    let assembledStyles = assemble(DyeInterpreter(path, [], options));
    return assembledStyles;
}

function DyeInterpreter(path, sharedCollections, options) {
    console.log('dint', options)
    let code = fetchLocal(path, options);
    let parsedCode = parser(code, options);
    options.path = checkLibrary(path, options);
    let store = interpreter(parsedCode, sharedCollections, options);
    return store;
}