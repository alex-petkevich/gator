import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItem } from 'app/shared/model/item.model';

type EntityResponseType = HttpResponse<IItem>;
type EntityArrayResponseType = HttpResponse<IItem[]>;

@Injectable({ providedIn: 'root' })
export class ItemService {
  public resourceUrl = SERVER_API_URL + 'api/items';
  public resourceSearchAllUrl = SERVER_API_URL + 'api/_search/all';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/items';

  constructor(protected http: HttpClient) {}

  create(item: IItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(item);
    return this.http
      .post<IItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(item: IItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(item);
    return this.http
      .put<IItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItem[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  searchAll(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItem[]>(this.resourceSearchAllUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(item: IItem): IItem {
    const copy: IItem = Object.assign({}, item, {
      createdAt: item.createdAt != null && item.createdAt.isValid() ? item.createdAt.toJSON() : null,
      updatedAt: item.updatedAt != null && item.updatedAt.isValid() ? item.updatedAt.toJSON() : null,
      deletedAt: item.deletedAt != null && item.deletedAt.isValid() ? item.deletedAt.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt != null ? moment(res.body.createdAt) : null;
      res.body.updatedAt = res.body.updatedAt != null ? moment(res.body.updatedAt) : null;
      res.body.deletedAt = res.body.deletedAt != null ? moment(res.body.deletedAt) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((item: IItem) => {
        item.createdAt = item.createdAt != null ? moment(item.createdAt) : null;
        item.updatedAt = item.updatedAt != null ? moment(item.updatedAt) : null;
        item.deletedAt = item.deletedAt != null ? moment(item.deletedAt) : null;
      });
    }
    return res;
  }
}
