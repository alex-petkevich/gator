import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserProperties } from 'app/shared/model/user-properties.model';
import { UserPropertiesService } from './user-properties.service';
import { UserPropertiesComponent } from './user-properties.component';
import { UserPropertiesDetailComponent } from './user-properties-detail.component';
import { UserPropertiesUpdateComponent } from './user-properties-update.component';
import { UserPropertiesDeletePopupComponent } from './user-properties-delete-dialog.component';
import { IUserProperties } from 'app/shared/model/user-properties.model';

@Injectable({ providedIn: 'root' })
export class UserPropertiesResolve implements Resolve<IUserProperties> {
  constructor(private service: UserPropertiesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserProperties> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserProperties>) => response.ok),
        map((userProperties: HttpResponse<UserProperties>) => userProperties.body)
      );
    }
    return of(new UserProperties());
  }
}

export const userPropertiesRoute: Routes = [
  {
    path: '',
    component: UserPropertiesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatorApp.userProperties.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserPropertiesDetailComponent,
    resolve: {
      userProperties: UserPropertiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatorApp.userProperties.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserPropertiesUpdateComponent,
    resolve: {
      userProperties: UserPropertiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatorApp.userProperties.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserPropertiesUpdateComponent,
    resolve: {
      userProperties: UserPropertiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatorApp.userProperties.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const userPropertiesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UserPropertiesDeletePopupComponent,
    resolve: {
      userProperties: UserPropertiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatorApp.userProperties.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
