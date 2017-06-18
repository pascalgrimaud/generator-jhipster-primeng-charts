/* global describe, beforeEach, it*/

const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const deps = [
    [helpers.createDummyGenerator(), 'jhipster:modules']
];

const expectedFiles = {
    dashboard: [
        'src/main/webapp/app/dashboard/dashboard.module.ts',

        'src/main/webapp/app/dashboard/barchart/index.ts',
        'src/main/webapp/app/dashboard/barchart/barchart.component.html',
        'src/main/webapp/app/dashboard/barchart/barchart.component.ts',
        'src/main/webapp/app/dashboard/barchart/barchart.module.ts',
        'src/main/webapp/app/dashboard/barchart/barchart.route.ts',

        'src/main/webapp/app/dashboard/doughnutchart/index.ts',
        'src/main/webapp/app/dashboard/doughnutchart/doughnutchart.component.html',
        'src/main/webapp/app/dashboard/doughnutchart/doughnutchart.component.ts',
        'src/main/webapp/app/dashboard/doughnutchart/doughnutchart.module.ts',
        'src/main/webapp/app/dashboard/doughnutchart/doughnutchart.route.ts',

        'src/main/webapp/app/dashboard/linechart/index.ts',
        'src/main/webapp/app/dashboard/linechart/linechart.component.html',
        'src/main/webapp/app/dashboard/linechart/linechart.component.ts',
        'src/main/webapp/app/dashboard/linechart/linechart.module.ts',
        'src/main/webapp/app/dashboard/linechart/linechart.route.ts',

        'src/main/webapp/app/dashboard/piechart/index.ts',
        'src/main/webapp/app/dashboard/piechart/piechart.component.html',
        'src/main/webapp/app/dashboard/piechart/piechart.component.ts',
        'src/main/webapp/app/dashboard/piechart/piechart.module.ts',
        'src/main/webapp/app/dashboard/piechart/piechart.route.ts',

        'src/main/webapp/app/dashboard/polarareachart/index.ts',
        'src/main/webapp/app/dashboard/polarareachart/polarareachart.component.html',
        'src/main/webapp/app/dashboard/polarareachart/polarareachart.component.ts',
        'src/main/webapp/app/dashboard/polarareachart/polarareachart.module.ts',
        'src/main/webapp/app/dashboard/polarareachart/polarareachart.route.ts',

        'src/main/webapp/app/dashboard/radarchart/index.ts',
        'src/main/webapp/app/dashboard/radarchart/radarchart.component.html',
        'src/main/webapp/app/dashboard/radarchart/radarchart.component.ts',
        'src/main/webapp/app/dashboard/radarchart/radarchart.module.ts',
        'src/main/webapp/app/dashboard/radarchart/radarchart.route.ts'
    ]
};

describe('JHipster generator primeng-charts', () => {
    describe('With translation', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/default'), dir);
                })
                .withOptions({
                    testmode: true
                })
                .withPrompts({
                    confirmation: true
                })
                .withGenerators(deps)
                .on('end', done);
        });

        it('generate all dashboard files', () => {
            assert.file(expectedFiles.dashboard);
        });
    });

    describe('Without translation', () => {
        beforeEach((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .inTmpDir((dir) => {
                    fse.copySync(path.join(__dirname, '../test/templates/default-notranslation'), dir);
                })
                .withOptions({
                    testmode: true
                })
                .withPrompts({
                    confirmation: true
                })
                .withGenerators(deps)
                .on('end', done);
        });

        it('generate all dashboard files', () => {
            assert.file(expectedFiles.dashboard);
        });
    });
});
