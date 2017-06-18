import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { BarchartComponent } from './barchart.component';

export const barchartRoute: Route = {
    path: 'barchart',
    component: BarchartComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'dashboard.barchart.home.title'
    },
    canActivate: [UserRouteAccessService]
};
