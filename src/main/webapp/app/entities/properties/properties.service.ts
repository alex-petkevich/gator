import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProperties } from 'app/shared/model/properties.model';

type EntityResponseType = HttpResponse<IProperties>;
type EntityArrayResponseType = HttpResponse<IProperties[]>;

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  public resourceUrl = SERVER_API_URL + 'api/properties';

  constructor(protected http: HttpClient) {}

  create(properties: IProperties): Observable<EntityResponseType> {
    return this.http.post<IProperties>(this.resourceUrl, properties, { observe: 'response' });
  }

  update(properties: IProperties): Observable<EntityResponseType> {
    return this.http.put<IProperties>(`${this.resourceUrl}/${properties.id}`, properties, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProperties>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProperties[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
