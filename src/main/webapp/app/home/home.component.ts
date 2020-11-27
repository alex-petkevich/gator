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
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { RateService } from 'app/entities/rate/rate.service';
import { IRate } from 'app/shared/model/rate.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
  animations: []
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  modalRef: NgbModalRef;
  items: IItem[];
  predicate: any;
  eventSubscriber: Subscription;
  currentSearch: string;
  searchTimeToRefresh: number;
  searchType: number;
  searchCategory: string;
  categories: ICategory[];
  interval: NodeJS.Timeout;
  isHidden: boolean;
  private rates: IRate[];

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private rateService: RateService,
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    private eventManager: JhiEventManager
  ) {
    this.items = [];
    this.predicate = 'id';
    this.categories = [];
    this.rates = [];
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
    this.searchTimeToRefresh = 6;
    this.searchCategory = '0';
    this.searchType = undefined;
    this.isHidden = true;
  }

  loadAll() {
    if (this.currentSearch) {
      this.itemService
        .searchAll({
          query: this.currentSearch,
          category: this.searchCategory,
          type: this.searchType,
          page: 0,
          size: ITEMS_TO_DISPLAY,
          sort: this.sort()
        })
        .subscribe(
          (res: HttpResponse<IItem[]>) => this.displayItems(res.body, res.headers),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.itemService
      .searchAll({
        query: '*',
        category: this.searchCategory,
        type: this.searchType,
        page: 0,
        size: ITEMS_TO_DISPLAY,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IItem[]>) => this.displayItems(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadCats() {
    this.categoryService
      .query({
        size: 1000,
        page: 0
      })
      .subscribe((res: HttpResponse<ICategory[]>) => this.displayCategories(res.body, res.headers));
  }

  loadRates() {
    this.rateService.query().subscribe((res: HttpResponse<IRate[]>) => this.displayRates(res.body, res.headers));
  }

  reset() {
    this.items = [];
    this.loadAll();
  }

  loadPage(page) {
    this.loadCats();
    this.loadRates();
    this.loadAll();
  }

  ngOnInit() {
    this.loadCats();
    this.loadRates();
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

  clear() {
    this.items = [];
    this.predicate = 'id';
    this.currentSearch = '';
    this.loadAll();
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.items = [];
    this.predicate = '_score';
    this.currentSearch = query;
    this.loadAll();
  }

  refreshContent() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.loadAll();
    }, this.searchTimeToRefresh * 1000);
  }

  showHideFilters() {
    this.isHidden = !this.isHidden;
  }

  calcRates() {
    let t = 1;
  }

  protected displayItems(data: IItem[], headers: HttpHeaders) {
    this.items = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  protected displayCategories(data: ICategory[], headers: HttpHeaders) {
    this.categories = data;
  }
  protected displayRates(data: IRate[], headers: HttpHeaders) {
    this.rates = data;
  }
}
