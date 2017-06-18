import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { PiechartComponent } from './piechart.component';

export const piechartRoute: Route = {
    path: 'piechart',
    component: PiechartComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'dashboard.piechart.home.title'
    },
    canActivate: [UserRouteAccessService]
};
