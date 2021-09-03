import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Notifications } from 'app/shared/model/notifications.model';
import { NotificationsService } from './notifications.service';
import { NotificationsComponent } from './notifications.component';
import { NotificationsDetailComponent } from './notifications-detail.component';
import { NotificationsUpdateComponent } from './notifications-update.component';
import { NotificationsDeletePopupComponent } from './notifications-delete-dialog.component';
import { INotifications } from 'app/shared/model/notifications.model';

@Injectable({ providedIn: 'root' })
export class NotificationsResolve implements Resolve<INotifications> {
  constructor(private service: NotificationsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INotifications> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Notifications>) => response.ok),
        map((notifications: HttpResponse<Notifications>) => notifications.body)
      );
    }
    return of(new Notifications());
  }
}

export const notificationsRoute: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'gatorApp.notifications.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NotificationsDetailComponent,
    resolve: {
      notifications: NotificationsResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'gatorApp.notifications.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NotificationsUpdateComponent,
    resolve: {
      notifications: NotificationsResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'gatorApp.notifications.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NotificationsUpdateComponent,
    resolve: {
      notifications: NotificationsResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'gatorApp.notifications.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const notificationsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NotificationsDeletePopupComponent,
    resolve: {
      notifications: NotificationsResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'gatorApp.notifications.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
