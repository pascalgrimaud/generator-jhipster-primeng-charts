import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { RadarchartComponent } from './radarchart.component';

export const radarchartRoute: Route = {
    path: 'radarchart',
    component: RadarchartComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'dashboard.radarchart.home.title'
    },
    canActivate: [UserRouteAccessService]
};
