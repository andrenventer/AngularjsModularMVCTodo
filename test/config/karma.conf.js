module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../../',
		frameworks: ['jasmine'],
		files: [
			'public/bower_components/angular/angular.js',
			'public/bower_components/angular-route/angular-route.js',
			'public/bower_components/angular-mocks/angular-mocks.js',
			'public/app/*.js',
			'public/app/**/*.js',
			'public/app/**/source/*.js',
			'public/app/**/test*/unit/*.js'
		],
		exclude:[
			'public/app/**/test*/e2e/*.js'
		],
		autoWatch: true,
		singleRun: false,
		browsers: ['PhantomJS']
	});
};
