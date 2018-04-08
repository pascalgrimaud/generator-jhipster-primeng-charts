import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../core';
import { DoughnutchartComponent } from './doughnutchart.component';

export const doughnutchartRoute: Route = {
    path: 'doughnutchart',
    component: DoughnutchartComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'dashboard.doughnutchart.home.title'
    },
    canActivate: [UserRouteAccessService]
};
