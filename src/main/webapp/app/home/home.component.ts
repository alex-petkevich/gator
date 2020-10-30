import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { IItem } from 'app/shared/model/item.model';

import { ITEMS_TO_DISPLAY } from 'app/shared/constants/pagination.constants';

import { ItemService } from 'app/entities/item/item.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  modalRef: NgbModalRef;
  items: IItem[];
  predicate: any;
  eventSubscriber: Subscription;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private itemService: ItemService,
    protected jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager
  ) {
    this.items = [];
    this.predicate = 'id';
  }

  loadAll() {
    this.itemService
      .searchAll({
        query: '*',
        page: 0,
        size: ITEMS_TO_DISPLAY,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IItem[]>) => this.displayItems(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  reset() {
    this.items = [];
    this.loadAll();
  }

  loadPage(page) {
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
    this.registerChangeInItems();
    this.refreshContent();
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  trackId(index: number, item: IItem) {
    return item.id;
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.eventManager.destroy(this.authSubscription);
    }
    this.eventManager.destroy(this.eventSubscriber);
  }

  registerChangeInItems() {
    this.eventSubscriber = this.eventManager.subscribe('itemListModification', response => this.reset());
  }

  sort() {
    const result = ['updatedAt,desc'];
    return result;
  }

  protected displayItems(data: IItem[], headers: HttpHeaders) {
    this.items = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  protected refreshContent() {
    setInterval(() => {
      this.loadAll();
    }, 3000);
  }
}
