exports.config = {

    allScriptsTimeout: 99999,

    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:3000/',

    framework: 'jasmine',

    // Spec patterns are relative to the
    // current working directory when
    // protractor is called.
    specs: ['../../public/app/TodoModule/tests/e2e/todoSpec.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose : true,
        includeStackTrace : true
    }
};