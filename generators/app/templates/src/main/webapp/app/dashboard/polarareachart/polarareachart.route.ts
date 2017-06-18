import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { PolarareachartComponent } from './polarareachart.component';

export const polarareachartRoute: Route = {
    path: 'polarareachart',
    component: PolarareachartComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'dashboard.polarareachart.home.title'
    },
    canActivate: [UserRouteAccessService]
};
