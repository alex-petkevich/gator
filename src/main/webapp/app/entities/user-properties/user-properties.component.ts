import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserProperties } from 'app/shared/model/user-properties.model';
import { AccountService } from 'app/core/auth/account.service';
import { UserPropertiesService } from './user-properties.service';

@Component({
  selector: 'jhi-user-properties',
  templateUrl: './user-properties.component.html'
})
export class UserPropertiesComponent implements OnInit, OnDestroy {
  userProperties: IUserProperties[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected userPropertiesService: UserPropertiesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.userPropertiesService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserProperties[]>) => res.ok),
        map((res: HttpResponse<IUserProperties[]>) => res.body)
      )
      .subscribe(
        (res: IUserProperties[]) => {
          this.userProperties = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUserProperties();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserProperties) {
    return item.id;
  }

  registerChangeInUserProperties() {
    this.eventSubscriber = this.eventManager.subscribe('userPropertiesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
