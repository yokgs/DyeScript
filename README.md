# DyeSript 
DyeScript is a powerful tool that allows you to compile your files `.dye` into `.css` and much more.
## Usage
#### compile a string as DyeScript
```javascript
dye.compile(myScript);
```
#### import `.dye` file
```javascript
dye.import("[[path]]/[[filename]].dye");
```

#### define directories 
```js
dye.dir(...directories);
```

#### activate directory for read/write 
```js
dye.open(directory);
```
#### open read-only directories
```js
dye.read(...directories);
```

#### set values
```javascript
dye.set(name,value); // saved on the current directory
```

#### get values
```javascript
dye.get(name); // get the value from current directory or other read-only directories if value is missing
```

#### generate css
```javascript
dye.export(files,path);
```
