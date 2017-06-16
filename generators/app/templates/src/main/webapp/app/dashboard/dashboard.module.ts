import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QualiToastPiechartModule } from './piechart/piechart.module';

@NgModule({
    imports: [
        QualiToastPiechartModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QualiToastDashboardModule {}
