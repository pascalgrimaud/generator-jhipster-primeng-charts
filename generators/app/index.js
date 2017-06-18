const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require('../../package.json');
const shelljs = require('shelljs');
const fs = require('fs');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterUtils = require('generator-jhipster/generators/util');
const JhipsterGenerator = generator.extend({});
util.inherits(JhipsterGenerator, BaseGenerator);

// Stores JHipster variables
const jhipsterVar = { moduleName: 'primeng-charts' };

// Stores JHipster functions
const jhipsterFunc = {};

module.exports = JhipsterGenerator.extend({

    initializing: {
        compose() {
            this.composeWith('jhipster:modules',
                { jhipsterVar, jhipsterFunc },
                this.options.testmode ? { local: require.resolve('generator-jhipster/generators/modules') } : null
            );
        },
        displayLogo() {
            // Have Yeoman greet the user.
            this.log(`Welcome to the ${chalk.bold.yellow('JHipster primeng-charts')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
        },
        checkclientFramework: function () {
            if (jhipsterVar.clientFramework !== 'angular2') {
                this.env.error(chalk.red.bold('ERROR!') + ' This module works only for Angular2\n');
            }
        }
    },

    _getConfig() {
        const fromPath = '.yo-rc.json';
        if (shelljs.test('-f', fromPath)) {
            const fileData = this.fs.readJSON(fromPath);
            if (fileData && fileData['generator-jhipster']) {
                return fileData['generator-jhipster'];
            } else return false;
        } else {
            return false;
        }
    },

    prompting() {
        const done = this.async();
        const prompts = [
            {
                type: 'confirm',
                name: 'confirmation',
                message: 'Do you want to install PrimeNG and charts?',
                default: true
            }
        ];

        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        });
    },

    writing() {
        const config = this._getConfig();

        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        console.log('==========================>'+this.config.get('baseName'));

        this.enableTranslation = config.enableTranslation;
        this.languages = config.languages;
        this.angular2AppName = jhipsterVar.angular2AppName;


        this.baseName = jhipsterVar.baseName;
        this.packageName = jhipsterVar.packageName;
        this.angularAppName = jhipsterVar.angularAppName;
        this.clientFramework = jhipsterVar.clientFramework;
        this.clientPackageManager = jhipsterVar.clientPackageManager;
        const javaDir = jhipsterVar.javaDir;
        const resourceDir = jhipsterVar.resourceDir;
        const webappDir = jhipsterVar.webappDir;
        this.enableTranslation = jhipsterVar.enableTranslation;

        this.message = this.props.message;

        this.log('\n--- some config read from config ---');
        this.log(`baseName=${config.baseName}`);
        this.log(`packageName=${config.packageName}`);
        this.log(`angularAppName=${config.angularAppName}`);
        this.log(`clientFramework=${config.clientFramework}`);
        this.log(`clientPackageManager=${config.clientPackageManager}`);
        this.log(`javaDir=${javaDir}`);
        this.log(`resourceDir=${resourceDir}`);
        this.log(`webappDir=${webappDir}`);
        this.log(`\nmessage=${this.message}`);
        this.log('------\n');

        // add dependencies
        // see utils.js -> rewriteJSONFile, with 2 tab ?
        this.addNpmDependency('@angular/animations', '4.1.3');
        this.addNpmDependency('chart.js', '2.5.0');
        this.addNpmDependency('primeng', '4.0.1');

        // add module to app.module.ts
        this.addAngularModule(jhipsterVar.angular2AppName, 'Dashboard', 'dashboard', 'dashboard', this.enableTranslation, this.clientFramework);

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
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.dashboard.barchart">BarChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="doughnutchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.dashboard.doughnutchart">BarChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="linechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.dashboard.linechart">LineChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="piechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.dashboard.piechart">PieChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="polarareachart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.dashboard.polarareachart">PolarAreaChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="radarchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
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
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span>BarChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="doughnutchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span>DoughnutChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="linechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span>LineChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="piechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span>PieChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="polarareachart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span>PolarAreaChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="radarchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-asterisk" aria-hidden="true"></i>
                            <span>RadarChart</span>
                        </a>
                    </li>
                </ul>
            </li>`;
        }
        jhipsterUtils.rewriteFile({
            file: 'src/main/webapp/app/layouts/navbar/navbar.component.html',
            needle: 'jhipster-needle-add-element-to-menu',
            splicable: [`${dashboardMenu}`]
        }, this);

        // add chart to vendor
        jhipsterUtils.rewriteFile({
            file: 'src/main/webapp/app/vendor.ts',
            needle: 'jhipster-needle-add-element-to-vendor',
            splicable: [`import 'chart.js/src/chart.js';`]
        }, this);

        // copy all translations
        if (this.enableTranslation) {
            const trad = `"dashboard": {
                "main": "Dashboard",
                "barchart": "BarChart",
                "doughnutchart": "DoughnutChart",
                "linechart": "LineChart",
                "piechart": "PieChart",
                "polarareachart": "PolarAreaChart",
                "radarchart": "RadarChart"
            },`;
            this.languages.forEach((language) => {
                // this.addElementTranslationKey('dashboard',`${trad}`,language);
                this.template(`src/main/webapp/i18n/en/dashboard.json`, `src/main/webapp/i18n/${language}/dashboard.json`);
                jhipsterUtils.rewriteFile({
                    file: `src/main/webapp/i18n/${language}/global.json`,
                    needle: 'jhipster-needle-menu-add-element',
                    splicable: [`${trad}`]
                }, this);
            });
        }

        // copy all files
        this.template('src/main/webapp/app/dashboard/dashboard.module.ts', 'src/main/webapp/app/dashboard/dashboard.module.ts');

        this.template('src/main/webapp/app/dashboard/barchart/index.ts', 'src/main/webapp/app/dashboard/barchart/index.ts');
        this.template('src/main/webapp/app/dashboard/barchart/barchart.component.html', 'src/main/webapp/app/dashboard/barchart/barchart.component.html');
        this.template('src/main/webapp/app/dashboard/barchart/barchart.component.ts', 'src/main/webapp/app/dashboard/barchart/barchart.component.ts');
        this.template('src/main/webapp/app/dashboard/barchart/barchart.module.ts', 'src/main/webapp/app/dashboard/barchart/barchart.module.ts');
        this.template('src/main/webapp/app/dashboard/barchart/barchart.route.ts', 'src/main/webapp/app/dashboard/barchart/barchart.route.ts');

        this.template('src/main/webapp/app/dashboard/doughnutchart/index.ts', 'src/main/webapp/app/dashboard/doughnutchart/index.ts');
        this.template('src/main/webapp/app/dashboard/doughnutchart/doughnutchart.component.html', 'src/main/webapp/app/dashboard/doughnutchart/doughnutchart.component.html');
        this.template('src/main/webapp/app/dashboard/doughnutchart/doughnutchart.component.ts', 'src/main/webapp/app/dashboard/doughnutchart/doughnutchart.component.ts');
        this.template('src/main/webapp/app/dashboard/doughnutchart/doughnutchart.module.ts', 'src/main/webapp/app/dashboard/doughnutchart/doughnutchart.module.ts');
        this.template('src/main/webapp/app/dashboard/doughnutchart/doughnutchart.route.ts', 'src/main/webapp/app/dashboard/doughnutchart/doughnutchart.route.ts');

        this.template('src/main/webapp/app/dashboard/linechart/index.ts', 'src/main/webapp/app/dashboard/linechart/index.ts');
        this.template('src/main/webapp/app/dashboard/linechart/linechart.component.html', 'src/main/webapp/app/dashboard/linechart/linechart.component.html');
        this.template('src/main/webapp/app/dashboard/linechart/linechart.component.ts', 'src/main/webapp/app/dashboard/linechart/linechart.component.ts');
        this.template('src/main/webapp/app/dashboard/linechart/linechart.module.ts', 'src/main/webapp/app/dashboard/linechart/linechart.module.ts');
        this.template('src/main/webapp/app/dashboard/linechart/linechart.route.ts', 'src/main/webapp/app/dashboard/linechart/linechart.route.ts');

        this.template('src/main/webapp/app/dashboard/piechart/index.ts', 'src/main/webapp/app/dashboard/piechart/index.ts');
        this.template('src/main/webapp/app/dashboard/piechart/piechart.component.html', 'src/main/webapp/app/dashboard/piechart/piechart.component.html');
        this.template('src/main/webapp/app/dashboard/piechart/piechart.component.ts', 'src/main/webapp/app/dashboard/piechart/piechart.component.ts');
        this.template('src/main/webapp/app/dashboard/piechart/piechart.module.ts', 'src/main/webapp/app/dashboard/piechart/piechart.module.ts');
        this.template('src/main/webapp/app/dashboard/piechart/piechart.route.ts', 'src/main/webapp/app/dashboard/piechart/piechart.route.ts');

        this.template('src/main/webapp/app/dashboard/polarareachart/index.ts', 'src/main/webapp/app/dashboard/polarareachart/index.ts');
        this.template('src/main/webapp/app/dashboard/polarareachart/polarareachart.component.html', 'src/main/webapp/app/dashboard/polarareachart/polarareachart.component.html');
        this.template('src/main/webapp/app/dashboard/polarareachart/polarareachart.component.ts', 'src/main/webapp/app/dashboard/polarareachart/polarareachart.component.ts');
        this.template('src/main/webapp/app/dashboard/polarareachart/polarareachart.module.ts', 'src/main/webapp/app/dashboard/polarareachart/polarareachart.module.ts');
        this.template('src/main/webapp/app/dashboard/polarareachart/polarareachart.route.ts', 'src/main/webapp/app/dashboard/polarareachart/polarareachart.route.ts');

        this.template('src/main/webapp/app/dashboard/radarchart/index.ts', 'src/main/webapp/app/dashboard/radarchart/index.ts');
        this.template('src/main/webapp/app/dashboard/radarchart/radarchart.component.html', 'src/main/webapp/app/dashboard/radarchart/radarchart.component.html');
        this.template('src/main/webapp/app/dashboard/radarchart/radarchart.component.ts', 'src/main/webapp/app/dashboard/radarchart/radarchart.component.ts');
        this.template('src/main/webapp/app/dashboard/radarchart/radarchart.module.ts', 'src/main/webapp/app/dashboard/radarchart/radarchart.module.ts');
        this.template('src/main/webapp/app/dashboard/radarchart/radarchart.route.ts', 'src/main/webapp/app/dashboard/radarchart/radarchart.route.ts');
    },

    install() {
        let logMsg =
            `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            } else if (this.clientFramework === 'angular1') {
                this.spawnCommand('gulp', ['install']);
            }
        };
        const installConfig = {
            bower: false,
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        this.installDependencies(installConfig);
    },

    end() {
        this.log('End of primeng-charts generator');
    }
});
