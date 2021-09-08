import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserNotifications } from 'app/shared/model/user-notifications.model';
import { UserNotificationsService } from './user-notifications.service';
import { UserNotificationsComponent } from './user-notifications.component';
import { UserNotificationsDetailComponent } from './user-notifications-detail.component';
import { UserNotificationsDeletePopupComponent } from './user-notifications-delete-dialog.component';
import { IUserNotifications } from 'app/shared/model/user-notifications.model';

@Injectable({ providedIn: 'root' })
export class UserNotificationsResolve implements Resolve<IUserNotifications> {
  constructor(private service: UserNotificationsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserNotifications> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserNotifications>) => response.ok),
        map((userNotifications: HttpResponse<UserNotifications>) => userNotifications.body)
      );
    }
    return of(new UserNotifications());
  }
}

export const userNotificationsRoute: Routes = [
  {
    path: '',
    component: UserNotificationsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatorApp.userNotifications.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserNotificationsDetailComponent,
    resolve: {
      userNotifications: UserNotificationsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatorApp.userNotifications.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const userNotificationsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UserNotificationsDeletePopupComponent,
    resolve: {
      userNotifications: UserNotificationsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatorApp.userNotifications.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
