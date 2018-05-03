'use strict';
const gutil = require('gulp-util');
const through = require('through2');
const parser = require('json-schema-ref-parser');

/**
 * Dereference a jsonschema
 */
function bundler(file, opts, cb) {
	parser.bundle(file.path, opts, (err, schema) => {
		if (err) {
			this.emit('error', new gutil.PluginError('gulp-jsonschema-bundle', err, {fileName: file.path}));
		} else {
			file.contents = Buffer.from(JSON.stringify(schema));
			this.push(file);
		}
		cb();
	});
}

/**
 * Typical gulp plugin boilerplate
 */
module.exports = function (opts) {
	opts = opts || {};

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-jsonschema-bundle', 'Streaming not supported'));
			return;
		}

		try {
			bundler.call(this, file, opts, cb);
		} catch (err) {
			cb(new gutil.PluginError('gulp-jsonschema-bundle', err));
		}
	});
};
