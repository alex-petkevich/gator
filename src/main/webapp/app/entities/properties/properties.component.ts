import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProperties } from 'app/shared/model/properties.model';
import { AccountService } from 'app/core/auth/account.service';
import { PropertiesService } from './properties.service';

@Component({
  selector: 'jhi-properties',
  templateUrl: './properties.component.html'
})
export class PropertiesComponent implements OnInit, OnDestroy {
  properties: IProperties[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected propertiesService: PropertiesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.propertiesService
      .query()
      .pipe(
        filter((res: HttpResponse<IProperties[]>) => res.ok),
        map((res: HttpResponse<IProperties[]>) => res.body)
      )
      .subscribe(
        (res: IProperties[]) => {
          this.properties = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProperties();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProperties) {
    return item.id;
  }

  registerChangeInProperties() {
    this.eventSubscriber = this.eventManager.subscribe('propertiesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
