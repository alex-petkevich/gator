import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Properties } from 'app/shared/model/properties.model';
import { PropertiesService } from './properties.service';
import { PropertiesComponent } from './properties.component';
import { PropertiesDetailComponent } from './properties-detail.component';
import { PropertiesUpdateComponent } from './properties-update.component';
import { PropertiesDeletePopupComponent } from './properties-delete-dialog.component';
import { IProperties } from 'app/shared/model/properties.model';

@Injectable({ providedIn: 'root' })
export class PropertiesResolve implements Resolve<IProperties> {
  constructor(private service: PropertiesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProperties> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Properties>) => response.ok),
        map((properties: HttpResponse<Properties>) => properties.body)
      );
    }
    return of(new Properties());
  }
}

export const propertiesRoute: Routes = [
  {
    path: '',
    component: PropertiesComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'gatorApp.properties.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PropertiesDetailComponent,
    resolve: {
      properties: PropertiesResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'gatorApp.properties.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PropertiesUpdateComponent,
    resolve: {
      properties: PropertiesResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'gatorApp.properties.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PropertiesUpdateComponent,
    resolve: {
      properties: PropertiesResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'gatorApp.properties.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const propertiesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PropertiesDeletePopupComponent,
    resolve: {
      properties: PropertiesResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'gatorApp.properties.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
