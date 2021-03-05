import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserSearches } from 'app/shared/model/user-searches.model';
import { UserSearchesService } from './user-searches.service';
import { UserSearchesComponent } from './user-searches.component';
import { IUserSearches } from 'app/shared/model/user-searches.model';

@Injectable({ providedIn: 'root' })
export class UserSearchesResolve implements Resolve<IUserSearches> {
  constructor(private service: UserSearchesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserSearches> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserSearches>) => response.ok),
        map((userSearches: HttpResponse<UserSearches>) => userSearches.body)
      );
    }
    return of(new UserSearches());
  }
}

export const userSearchesRoute: Routes = [
  {
    path: '',
    component: UserSearchesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatorApp.userSearches.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
