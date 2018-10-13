import { browser, element, by } from 'protractor';
import { NavBarPage, SignInPage } from './../page-objects/jhi-page-objects';

const expect = chai.expect;

<%_
let elementGetter = `getText()`;
if (enableTranslation) {
    elementGetter = `getAttribute('jhiTranslate')`;
}
_%>

describe('dashboard', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    const dashboardMenu = element(by.id('dashboard-menu'));

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage(true);
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
    });

    beforeEach(async () => {
        await dashboardMenu.click();
    });

    it('should load BarChart', async () => {
        await element(by.css('[routerLink="barchart"]')).click();
        <%_ if (enableTranslation) { _%>
        const expect1 = /dashboard.barchart.home.title/;
        <%_ } else { _%>
        const expect1 = /BarChart/;
        <%_ } _%>
        element.all(by.css('h2 span')).first().<%- elementGetter %>.then(value => {
            expect(value).to.eq(expect1);
        });
    });

    it('should load DoughnutChart', async () => {
        await element(by.css('[routerLink="doughnutchart"]')).click();
        <%_ if (enableTranslation) { _%>
        const expect1 = /dashboard.doughnutchart.home.title/;
        <%_ } else { _%>
        const expect1 = /DoughnutChart/;
        <%_ } _%>
        element.all(by.css('h2 span')).first().<%- elementGetter %>.then(value => {
            expect(value).to.eq(expect1);
        });
    });

    it('should load LineChart', async () => {
        await element(by.css('[routerLink="linechart"]')).click();
        <%_ if (enableTranslation) { _%>
        const expect1 = /dashboard.linechart.home.title/;
        <%_ } else { _%>
        const expect1 = /LineChart/;
        <%_ } _%>
        element.all(by.css('h2 span')).first().<%- elementGetter %>.then(value => {
            expect(value).to.eq(expect1);
        });
    });

    it('should load PieChart', async () => {
        await element(by.css('[routerLink="piechart"]')).click();
        <%_ if (enableTranslation) { _%>
        const expect1 = /dashboard.piechart.home.title/;
        <%_ } else { _%>
        const expect1 = /PieChart/;
        <%_ } _%>
        element.all(by.css('h2 span')).first().<%- elementGetter %>.then(value => {
            expect(value).to.eq(expect1);
        });
    });

    it('should load PolarAreaChart', async () => {
        await element(by.css('[routerLink="polarareachart"]')).click();
        <%_ if (enableTranslation) { _%>
        const expect1 = /dashboard.polarareachart.home.title/;
        <%_ } else { _%>
        const expect1 = /PolarAreaChart/;
        <%_ } _%>
        element.all(by.css('h2 span')).first().<%- elementGetter %>.then(value => {
            expect(value).to.eq(expect1);
        });
    });

    it('should load RadarChart', async () => {
        await element(by.css('[routerLink="radarchart"]')).click();
        <%_ if (enableTranslation) { _%>
        const expect1 = /dashboard.radarchart.home.title/;
        <%_ } else { _%>
        const expect1 = /RadarChart/;
        <%_ } _%>
        element.all(by.css('h2 span')).first().<%- elementGetter %>.then(value => {
            expect(value).to.eq(expect1);
        });
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
