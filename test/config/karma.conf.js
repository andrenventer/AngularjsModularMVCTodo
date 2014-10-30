module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../../',
		frameworks: ['jasmine'],
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'public/app/*.js',
			'public/app/**/*.js',
			'public/app/**/source/*.js',
			'public/app/**/test*/unit/*.js'
		],
		autoWatch: true,
		singleRun: true,
		browsers: ['Chrome']
	});
};
