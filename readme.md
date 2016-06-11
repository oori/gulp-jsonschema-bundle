# gulp-jsonschema-bundle

[![Build Status](https://travis-ci.org/oori/gulp-jsonschema-bundle.svg?branch=master)](https://travis-ci.org/oori/gulp-jsonschema-bundle)
[![Dependencies](https://david-dm.org/oori/gulp-jsonschema-bundle.svg)](https://david-dm.org/oori/gulp-jsonschema-bundle)
[![Inline docs](http://inch-ci.org/github/oori/gulp-jsonschema-bundle.svg?branch=master)](http://inch-ci.org/github/oori/gulp-jsonschema-bundle)
[![npm](http://img.shields.io/npm/v/gulp-jsonschema-bundle.svg)](https://www.npmjs.com/package/gulp-jsonschema-bundle)
[![License](https://img.shields.io/npm/l/gulp-jsonschema-bundle.svg)](LICENSE)

> Gulp plugin to bundle external $ref references (*file+http*) into a single json schema

## Install

```
$ npm install --save-dev gulp-jsonschema-bundle
```


## Usage

```js
var gulp = require('gulp');
var jsonschemaBundle = require('gulp-jsonschema-bundle');

var schemaFiles = '*.schema.json',
	definitionsFiles = 'definitions/' + schemaFiles,
	buildFolder = 'build';

gulp.task('resolve-schema', function() {
	var stream = gulp.src( schemaFiles )
		.pipe( jsonschemaBundle() )
		.pipe( gulp.dest(buildFolder) );
	return stream;
});


gulp.task('watch-schema', function() {
	var watcher = gulp.watch( [schemaFiles,definitionsFiles], ['resolve-schema']);

	watcher.on('change', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});

gulp.task('default', ['resolve-schema','watch-schema']);
```


## API
Currently, dependant on [json-schema-ref-parser](https://github.com/BigstickCarpet/json-schema-ref-parser)

### jsonschemaBundle([options])

#### options

see: [bundle](https://github.com/BigstickCarpet/json-schema-ref-parser/blob/master/docs/ref-parser.md#bundleschema-options-callback)

## License

MIT © [oori](https://github.com/oori)
