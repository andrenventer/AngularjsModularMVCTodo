
describe('angularjs homepage', function() {
    it('should have a title', function() {
        browser.get('http://think-a-doo.net/AngularjsModularMVC/#/');

        expect(browser.getTitle()).toEqual('AngularJS • TodoMVC');
    });
});