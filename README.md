# DyeSript 
DyeScript is a powerful tool that allows you to compile your files `.dye` into `.css` and much more.
## Usage
#### compile a string as DyeScript
```javascript
dye.compile(myScript);
```
#### import `.dye`
```javascript
dye.import("[[url]]/[[filename]].dye");
```
#### set values
```javascript
dye.set(name,value);
```

#### get values
```javascript
dye.get(name);
```

#### generate css
```javascript
dye.export(files,url);
```
