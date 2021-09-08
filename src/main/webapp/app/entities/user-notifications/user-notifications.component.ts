import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserNotifications } from 'app/shared/model/user-notifications.model';
import { AccountService } from 'app/core/auth/account.service';
import { UserNotificationsService } from './user-notifications.service';

@Component({
  selector: 'jhi-user-notifications',
  templateUrl: './user-notifications.component.html'
})
export class UserNotificationsComponent implements OnInit, OnDestroy {
  userNotifications: IUserNotifications[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected userNotificationsService: UserNotificationsService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.userNotificationsService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserNotifications[]>) => res.ok),
        map((res: HttpResponse<IUserNotifications[]>) => res.body)
      )
      .subscribe(
        (res: IUserNotifications[]) => {
          this.userNotifications = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUserNotifications();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserNotifications) {
    return item.id;
  }

  registerChangeInUserNotifications() {
    this.eventSubscriber = this.eventManager.subscribe('userNotificationsListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
