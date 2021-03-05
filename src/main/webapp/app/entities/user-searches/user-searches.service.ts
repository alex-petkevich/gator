import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserSearches } from 'app/shared/model/user-searches.model';

type EntityResponseType = HttpResponse<IUserSearches>;
type EntityArrayResponseType = HttpResponse<IUserSearches[]>;

@Injectable({ providedIn: 'root' })
export class UserSearchesService {
  public resourceUrl = SERVER_API_URL + 'api/user-searches';

  constructor(protected http: HttpClient) {}

  create(search: IUserSearches): Observable<EntityResponseType> {
    return this.http.post<IUserSearches>(this.resourceUrl, search, { observe: 'response' });
  }

  update(search: IUserSearches): Observable<EntityResponseType> {
    return this.http.put<IUserSearches>(this.resourceUrl, search, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserSearches>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserSearches[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
