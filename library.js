(function(module) {
	"use strict";

	var async = require('async'),
		fs = require('fs'),
		path = require('path'),
		translator = module.parent.require('../public/src/translator'),
		templates = module.parent.require('templates.js'),
		app;

	var Widget = {
		templates: {}
	};

	Widget.renderDbSearchWidget = function(widget, callback) {
		var html = Widget.templates['dbsearch.tpl'];

		html = translator.translate(html, function(html) {
			html = templates.parse(html, {cid: widget.data.cid || false});

			callback(null, html);
		});
	};

	Widget.defineWidgets = function(widgets, callback) {
		widgets = widgets.concat([
			{
				widget: "dbsearch",
				name: "DB Search",
				description: "Any text, html, or embedded script.",
				content: Widget.templates['admin/dbsearch.tpl']
			}
		]);

		callback(null, widgets);
	};

	Widget.init = function(express, middleware, controllers, callback) {
		app = express;

		var templatesToLoad = [
			"dbsearch.tpl",
			"admin/dbsearch.tpl"
		];

		function loadTemplate(template, next) {
			fs.readFile(path.resolve(__dirname, './public/templates/' + template), function (err, data) {
				if (err) {
					console.log(err.message);
					return next(err);
				}
				Widget.templates[template] = data.toString();
				next(null);
			});
		}

		async.each(templatesToLoad, loadTemplate);

		callback();
	};

	module.exports = Widget;
}(module));