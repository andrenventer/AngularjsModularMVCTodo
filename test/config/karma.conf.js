module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../../',
		frameworks: ['jasmine'],
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'app/*.js',
			'app/**/*.js',
			'app/**/source/*.js',
			'app/**/test*/unit/*.js'
		],
		autoWatch: true,
		singleRun: false,
		browsers: ['Chrome']
	});
};
