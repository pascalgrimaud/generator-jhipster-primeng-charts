const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require('../../package.json');
const BaseGenerator = require('generator-jhipster/generators/generator-base');

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
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        console.log('==========================>'+this.config.get('baseName'));

        this.baseName = jhipsterVar.baseName;
        this.packageName = jhipsterVar.packageName;
        this.angularAppName = jhipsterVar.angularAppName;
        this.clientFramework = jhipsterVar.clientFramework;
        this.clientPackageManager = jhipsterVar.clientPackageManager;
        const javaDir = jhipsterVar.javaDir;
        const resourceDir = jhipsterVar.resourceDir;
        const webappDir = jhipsterVar.webappDir;

        this.message = this.props.message;

        this.log('\n--- some config read from config ---');
        this.log(`baseName=${this.baseName}`);
        this.log(`packageName=${this.packageName}`);
        this.log(`angularAppName=${this.angularAppName}`);
        this.log(`clientFramework=${this.clientFramework}`);
        this.log(`clientPackageManager=${this.clientPackageManager}`);
        this.log(`javaDir=${javaDir}`);
        this.log(`resourceDir=${resourceDir}`);
        this.log(`webappDir=${webappDir}`);
        this.log(`\nmessage=${this.message}`);
        this.log('------\n');

        this.template('dummy.txt', 'dummy.txt');

        // add dependencies
        // see utils.js -> rewriteJSONFile, with 2 tab ?
        this.addNpmDependency('@angular/animations', '4.1.3');
        this.addNpmDependency('chart.js', '2.5.0');
        this.addNpmDependency('primeng', '4.0.1');

        // add module to app.module.ts
        this.addAngularModule(jhipsterVar.angular2AppName, 'Dashboard', 'dashboard', 'dashboard', this.enableTranslation, this.clientFramework);

        // add element to menu
        this.addElementToMenu('dashboard', 'fa-area-chart', this.enableTranslation, this.clientFramework);

        // add chart to vendor

        // copy all translations

        // copy all files

    },

    // install() {
    //     let logMsg =
    //         `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;
    //
    //     if (this.clientFramework === 'angular1') {
    //         logMsg =
    //             `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install & bower install`)}`;
    //     }
    //     const injectDependenciesAndConstants = (err) => {
    //         if (err) {
    //             this.warning('Install of dependencies failed!');
    //             this.log(logMsg);
    //         } else if (this.clientFramework === 'angular1') {
    //             this.spawnCommand('gulp', ['install']);
    //         }
    //     };
    //     const installConfig = {
    //         bower: this.clientFramework === 'angular1',
    //         npm: this.clientPackageManager !== 'yarn',
    //         yarn: this.clientPackageManager === 'yarn',
    //         callback: injectDependenciesAndConstants
    //     };
    //     this.installDependencies(installConfig);
    // },

    end() {
        this.log('End of primeng-charts generator');
    }
});
