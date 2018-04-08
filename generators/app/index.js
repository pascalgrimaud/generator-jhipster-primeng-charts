const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require('../../package.json');
const semver = require('semver');
const shelljs = require('shelljs');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const JhipsterGenerator = generator.extend({});
util.inherits(JhipsterGenerator, BaseGenerator);

const ANGULAR_VERSION = '5.2.8';
const CHARTJS_VERSION = '2.7.2';
const PRIMENG_VERSION = '5.2.4';

module.exports = JhipsterGenerator.extend({
    constructor: function (...args) { // eslint-disable-line object-shorthand
        generator.apply(this, args);

        this.option('default', {
            type: String,
            required: false,
            description: 'default option'
        });

        this.defaultOption = this.options.default;
    },

    initializing: {
        readConfig() {
            this.jhipsterAppConfig = this.getJhipsterAppConfig();
            if (!this.jhipsterAppConfig) {
                this.error('Can\'t read .yo-rc.json');
            }
        },

        readPackageJson() {
            const fromPath = 'package.json';
            this.libAngularVersion = ANGULAR_VERSION;
            if (shelljs.test('-f', fromPath)) {
                const fileData = this.fs.readJSON(fromPath);
                if (fileData && fileData.dependencies) {
                    if (fileData.dependencies['@angular/common']) {
                        this.libAngularVersion = fileData.dependencies['@angular/common'];
                    }
                    if (fileData.dependencies['@angular/animations']) {
                        this.libAngularAnimationsVersion = fileData.dependencies['@angular/animations'];
                    }
                    if (fileData.dependencies.primeng) {
                        this.libPrimeNgVersion = fileData.dependencies.primeng;
                    }
                    if (fileData.dependencies['chart.js']) {
                        this.libChartJsVersion = fileData.dependencies['chart.js'];
                    }
                }
            }
        },

        displayLogo() {
            // Have Yeoman greet the user.
            this.log('');
            this.log(`${chalk.white('  ██████╗  ██████╗  ██╗ ███╗   ███╗ ███████╗')}${chalk.red(' ███╗   ██╗  ██████╗')}`);
            this.log(`${chalk.white('  ██╔══██╗ ██╔══██╗ ██║ ████╗ ████║ ██╔════╝')}${chalk.red(' ████╗  ██║ ██╔════╝')}`);
            this.log(`${chalk.white('  ██████╔╝ ██████╔╝ ██║ ██╔████╔██║ █████╗  ')}${chalk.red(' ██╔██╗ ██║ ██║  ███╗')}`);
            this.log(`${chalk.white('  ██╔═══╝  ██╔══██╗ ██║ ██║╚██╔╝██║ ██╔══╝  ')}${chalk.red(' ██║╚██╗██║ ██║   ██║')}`);
            this.log(`${chalk.white('  ██║      ██║  ██║ ██║ ██║ ╚═╝ ██║ ███████╗')}${chalk.red(' ██║ ╚████║ ╚██████╔╝')}`);
            this.log(`${chalk.white('  ╚═╝      ╚═╝  ╚═╝ ╚═╝ ╚═╝     ╚═╝ ╚══════╝')}${chalk.red(' ╚═╝  ╚═══╝  ╚═════╝')}`);
            this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster primeng-charts')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
        },
        checkclientFramework() {
            if (this.jhipsterAppConfig.clientFramework !== 'angular2' && this.jhipsterAppConfig.clientFramework !== 'angularX') {
                this.env.error(`${chalk.red.bold('ERROR!')} This module works only for Angular2...`);
            }
        },
        checkJhipster() {
            const jhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
            const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
            if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
                this.warning(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
            }
        }
    },

    prompting() {
        const prompts = [
            {
                type: 'confirm',
                name: 'confirmation',
                message: 'Do you want to install PrimeNG and charts?',
                default: true
            }
        ];
        if (!this.defaultOption) {
            const done = this.async();
            this.prompt(prompts).then((props) => {
                this.props = props;
                // To access props later use this.props.someOption;
                done();
            });
        }
    },

    writing() {
        if (this.defaultOption === undefined && !this.props.confirmation) {
            return;
        }

        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        // init all variables
        this.anyError = false;

        this.enableTranslation = this.jhipsterAppConfig.enableTranslation;
        this.languages = this.jhipsterAppConfig.languages;
        this.baseName = this.jhipsterAppConfig.baseName;
        this.clientFramework = this.jhipsterAppConfig.clientFramework;
        this.clientPackageManager = this.jhipsterAppConfig.clientPackageManager;
        this.protractorTests = this.jhipsterAppConfig.testFrameworks.indexOf('protractor') !== -1;
        this.angular2AppName = this.getAngular2AppName();

        const CLIENT_MAIN_SRC_DIR = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
        const CLIENT_TEST_SRC_DIR = jhipsterConstants.CLIENT_TEST_SRC_DIR;

        // add dependencies
        try {
            if (this.libAngularAnimationsVersion) {
                // the version already exists, so try to upgrade instead
                this.replaceContent('package.json',
                    `"@angular/animations": "${this.libAngularAnimationsVersion}"`,
                    `"@angular/animations": "${this.libAngularVersion}"`);
            } else {
                this.addNpmDependency('@angular/animations', `${this.libAngularVersion}`);
            }
            if (this.libChartJsVersion) {
                // the version already exists, so try to upgrade instead
                this.replaceContent('package.json', `"chart.js": "${this.libChartJsVersion}"`, `"chart.js": "${CHARTJS_VERSION}"`);
            } else {
                this.addNpmDependency('chart.js', `${CHARTJS_VERSION}`);
            }
            if (this.libPrimeNgVersion) {
                // the version already exists, so try to upgrade instead
                this.replaceContent('package.json', `"primeng": "${this.libPrimeNgVersion}"`, `"primeng": "${PRIMENG_VERSION}"`);
            } else {
                this.addNpmDependency('primeng', `${PRIMENG_VERSION}`);
            }
        } catch (e) {
            this.log(`${chalk.red.bold('ERROR!')}`);
            this.log('  Problem when adding the new librairies in your package.json');
            this.log('  You need to add manually:\n');
            this.log(`  "@angular/animations": "${this.libAngularVersion}",`);
            this.log(`  "chart.js": "${CHARTJS_VERSION}",`);
            this.log(`  "primeng": "${PRIMENG_VERSION}"`);
            this.log('');
            this.anyError = true;
        }

        // add module to app.module.ts
        try {
            this.addAngularModule(this.angular2AppName, 'Dashboard', 'dashboard', 'dashboard', this.enableTranslation, this.clientFramework);
        } catch (e) {
            this.log(`${chalk.red.bold('ERROR!')}`);
            this.log('  Problem when updating your app.module.ts');
            this.log('  You need to import manually the new dashboard.module.ts:\n');
            this.log(`${chalk.yellow.bold(`  import { ${this.angular2AppName}DashboardModule } from './dashboard/dashboard.module';`)}`);
            this.log('\n  and:\n');
            this.log(`${chalk.yellow.bold(`  ${this.angular2AppName}DashboardModule,`)}\n`);
            this.anyError = true;
        }

        // add element to menu
        let dashboardMenu;
        if (this.enableTranslation) {
            dashboardMenu = `<li *ngSwitchCase="true" ngbDropdown class="nav-item dropdown pointer" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <a class="nav-link dropdown-toggle" ngbDropdownToggle href="javascript:void(0);" id="dashboard-menu">
                    <span>
                        <i class="fa fa-area-chart" aria-hidden="true"></i>
                        <span jhiTranslate="global.menu.dashboard.main">Dashboard</span>
                        <b class="caret"></b>
                    </span>
                </a>
                <ul class="dropdown-menu" ngbDropdownMenu>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="barchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-bar-chart" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.dashboard.barchart">BarChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="doughnutchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o-notch" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.dashboard.doughnutchart">BarChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="linechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-line-chart" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.dashboard.linechart">LineChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="piechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-pie-chart" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.dashboard.piechart">PieChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="polarareachart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-bullseye" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.dashboard.polarareachart">PolarAreaChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="radarchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-star-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.dashboard.radarchart">RadarChart</span>
                        </a>
                    </li>
                </ul>
            </li>`;
        } else {
            dashboardMenu = `<li *ngSwitchCase="true" ngbDropdown class="nav-item dropdown pointer" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <a class="nav-link dropdown-toggle" ngbDropdownToggle href="javascript:void(0);" id="dashboard-menu">
                    <span>
                        <i class="fa fa-area-chart" aria-hidden="true"></i>
                        <span>Dashboard</span>
                        <b class="caret"></b>
                    </span>
                </a>
                <ul class="dropdown-menu" ngbDropdownMenu>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="barchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-bar-chart" aria-hidden="true"></i>
                            <span>BarChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="doughnutchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o-notch" aria-hidden="true"></i>
                            <span>DoughnutChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="linechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-line-chart" aria-hidden="true"></i>
                            <span>LineChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="piechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-pie-chart" aria-hidden="true"></i>
                            <span>PieChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="polarareachart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-bullseye" aria-hidden="true"></i>
                            <span>PolarAreaChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="radarchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-star-o" aria-hidden="true"></i>
                            <span>RadarChart</span>
                        </a>
                    </li>
                </ul>
            </li>`;
        }
        try {
            this.rewriteFile(
                `${CLIENT_MAIN_SRC_DIR}app/layouts/navbar/navbar.component.html`,
                'jhipster-needle-add-element-to-menu',
                `${dashboardMenu}`);
        } catch (e) {
            this.log(`${chalk.red.bold('ERROR!')}`);
            this.log(`  Missing needle 'jhipster-needle-add-element-to-menu' in ${CLIENT_MAIN_SRC_DIR}app/layouts/navbar/navbar.component.html`);
            this.log('  You need to add manually the menu:\n');
            this.log(`            ${dashboardMenu}`);
            this.log('');
            this.anyError = true;
        }

        // add protractor tests
        if (this.protractorTests) {
            const dashboardSpec = '\'./e2e/dashboard/dashboard.spec.ts\',';
            try {
                this.rewriteFile(
                    `${CLIENT_TEST_SRC_DIR}protractor.conf.js`,
                    'jhipster-needle-add-protractor-tests',
                    `${dashboardSpec}`);
            } catch (e) {
                this.log(`${chalk.red.bold('ERROR!')}`);
                this.log(`  Missing needle 'jhipster-needle-add-protractor-tests' in ${CLIENT_MAIN_SRC_DIR}protractor.conf.js`);
                this.log('  You need to add manually in specs item:\n');
                this.log(`            ${dashboardSpec}`);
                this.log('');
                this.anyError = true;
            }
            this.template(`${CLIENT_TEST_SRC_DIR}e2e/dashboard/_dashboard.spec.ts`, `${CLIENT_TEST_SRC_DIR}e2e/dashboard/dashboard.spec.ts`);
        }

        // add chart to vendor
        try {
            this.rewriteFile(
                `${CLIENT_MAIN_SRC_DIR}app/vendor.ts`,
                'jhipster-needle-add-element-to-vendor',
                'import \'chart.js/src/chart.js\';');
        } catch (e) {
            this.log(`${chalk.red.bold('ERROR!')}`);
            this.log(`  Missing needle 'jhipster-needle-add-element-to-vendor' in ${CLIENT_MAIN_SRC_DIR}app/vendor.ts`);
            this.log('  You need to add manually:\n');
            this.log(`${chalk.yellow.bold('import \'chart.js/src/chart.js\';')}`);
            this.log('');
            this.anyError = true;
        }

        // copy all translations
        if (this.enableTranslation) {
            const dashboardTranslation = `"dashboard": {
                "main": "Dashboard",
                "barchart": "BarChart",
                "doughnutchart": "DoughnutChart",
                "linechart": "LineChart",
                "piechart": "PieChart",
                "polarareachart": "PolarAreaChart",
                "radarchart": "RadarChart"
            },`;
            this.languages.forEach((language) => {
                this.template(`${CLIENT_MAIN_SRC_DIR}i18n/en/dashboard.json`, `${CLIENT_MAIN_SRC_DIR}i18n/${language}/dashboard.json`);
                try {
                    this.rewriteFile(
                        `${CLIENT_MAIN_SRC_DIR}i18n/${language}/global.json`,
                        'jhipster-needle-menu-add-element',
                        `${dashboardTranslation}`);
                } catch (e) {
                    this.log(`${chalk.red.bold('ERROR!')}`);
                    this.log(`  Missing needle 'jhipster-needle-menu-add-element' in ${CLIENT_MAIN_SRC_DIR}i18n/${language}/global.json`);
                    this.log('  You need to add manually:');
                    this.log(`${dashboardTranslation}`);
                    this.log('');
                    this.anyError = true;
                }
            });
        }

        // copy all dashboard files
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/dashboard.module.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/dashboard.module.ts`);

        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/barchart/index.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/barchart/index.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/barchart/barchart.component.html`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/barchart/barchart.component.html`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/barchart/barchart.component.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/barchart/barchart.component.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/barchart/barchart.module.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/barchart/barchart.module.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/barchart/barchart.route.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/barchart/barchart.route.ts`);

        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/doughnutchart/index.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/doughnutchart/index.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/doughnutchart/doughnutchart.component.html`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/doughnutchart/doughnutchart.component.html`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/doughnutchart/doughnutchart.component.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/doughnutchart/doughnutchart.component.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/doughnutchart/doughnutchart.module.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/doughnutchart/doughnutchart.module.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/doughnutchart/doughnutchart.route.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/doughnutchart/doughnutchart.route.ts`);

        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/linechart/index.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/linechart/index.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/linechart/linechart.component.html`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/linechart/linechart.component.html`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/linechart/linechart.component.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/linechart/linechart.component.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/linechart/linechart.module.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/linechart/linechart.module.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/linechart/linechart.route.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/linechart/linechart.route.ts`);

        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/piechart/index.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/piechart/index.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/piechart/piechart.component.html`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/piechart/piechart.component.html`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/piechart/piechart.component.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/piechart/piechart.component.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/piechart/piechart.module.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/piechart/piechart.module.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/piechart/piechart.route.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/piechart/piechart.route.ts`);

        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/polarareachart/index.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/polarareachart/index.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/polarareachart/polarareachart.component.html`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/polarareachart/polarareachart.component.html`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/polarareachart/polarareachart.component.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/polarareachart/polarareachart.component.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/polarareachart/polarareachart.module.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/polarareachart/polarareachart.module.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/polarareachart/polarareachart.route.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/polarareachart/polarareachart.route.ts`);

        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/radarchart/index.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/radarchart/index.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/radarchart/radarchart.component.html`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/radarchart/radarchart.component.html`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/radarchart/radarchart.component.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/radarchart/radarchart.component.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/radarchart/radarchart.module.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/radarchart/radarchart.module.ts`);
        this.template(`${CLIENT_MAIN_SRC_DIR}app/dashboard/radarchart/radarchart.route.ts`, `${CLIENT_MAIN_SRC_DIR}app/dashboard/radarchart/radarchart.route.ts`);
    },

    install() {
        if (this.defaultOption === undefined && !this.props.confirmation) {
            return;
        }

        if (!this.anyError) {
            let logMsg = `\nTo install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;
            logMsg += `\nTo build the front manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} run webpack:build\n`)}`;
            const injectDependenciesAndConstants = (err) => {
                if (err) {
                    this.warning('Install of dependencies failed!');
                    this.log(logMsg);
                }
                if (this.clientFramework === 'angular2' || this.clientFramework === 'angularX') {
                    this.spawnCommandSync(this.clientPackageManager, ['run', 'webpack:build']);
                }
            };
            const installConfig = {
                bower: false,
                npm: this.clientPackageManager !== 'yarn',
                yarn: this.clientPackageManager === 'yarn',
                callback: injectDependenciesAndConstants
            };
            if (this.options['skip-install']) {
                this.log(logMsg);
            } else {
                this.installDependencies(installConfig);
            }
        } else {
            this.log('');
            if (this.clientPackageManager === 'yarn') {
                this.warning(`There is some problem. You need to resolve them, and launch ${chalk.yellow.bold('yarn install')}`);
            } else {
                this.warning(`There is some problem. You need to resolve them, and launch ${chalk.yellow.bold('npm install')}`);
            }
        }
    },

    end() {
        this.log('End of primeng-charts generator');
    }
});
