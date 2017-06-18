import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { LinechartComponent } from './linechart.component';

export const linechartRoute: Route = {
    path: 'linechart',
    component: LinechartComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'dashboard.linechart.home.title'
    },
    canActivate: [UserRouteAccessService]
};
