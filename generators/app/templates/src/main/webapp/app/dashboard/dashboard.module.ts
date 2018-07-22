import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { <%= angularXAppName %>BarchartModule } from './barchart/barchart.module';
import { <%= angularXAppName %>DoughnutchartModule } from './doughnutchart/doughnutchart.module';
import { <%= angularXAppName %>LinechartModule } from './linechart/linechart.module';
import { <%= angularXAppName %>PiechartModule } from './piechart/piechart.module';
import { <%= angularXAppName %>PolarareachartModule } from './polarareachart/polarareachart.module';
import { <%= angularXAppName %>RadarchartModule } from './radarchart/radarchart.module';

@NgModule({
    imports: [
        <%= angularXAppName %>BarchartModule,
        <%= angularXAppName %>DoughnutchartModule,
        <%= angularXAppName %>LinechartModule,
        <%= angularXAppName %>PiechartModule,
        <%= angularXAppName %>PolarareachartModule,
        <%= angularXAppName %>RadarchartModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class <%= angularXAppName %>DashboardModule {}
