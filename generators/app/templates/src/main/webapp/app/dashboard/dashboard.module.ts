import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { <%= angular2AppName %>BarchartModule } from './barchart/barchart.module';
import { <%= angular2AppName %>DoughnutchartModule } from './doughnutchart/doughnutchart.module';
import { <%= angular2AppName %>LinechartModule } from './linechart/linechart.module';
import { <%= angular2AppName %>PiechartModule } from './piechart/piechart.module';
import { <%= angular2AppName %>PolarareachartModule } from './polarareachart/polarareachart.module';
import { <%= angular2AppName %>RadarchartModule } from './radarchart/radarchart.module';

@NgModule({
    imports: [
        <%= angular2AppName %>BarchartModule,
        <%= angular2AppName %>DoughnutchartModule,
        <%= angular2AppName %>LinechartModule,
        <%= angular2AppName %>PiechartModule,
        <%= angular2AppName %>PolarareachartModule,
        <%= angular2AppName %>RadarchartModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class <%= angular2AppName %>DashboardModule {}
