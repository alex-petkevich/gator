import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { IItem } from 'app/shared/model/item.model';
import { IUserNotifications, UserNotifications } from 'app/shared/model/user-notifications.model';

import { ITEMS_TO_DISPLAY } from 'app/shared/constants/pagination.constants';

import { ItemService } from 'app/entities/item/item.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { RateService } from 'app/entities/rate/rate.service';
import { IRate, Rate } from 'app/shared/model/rate.model';
import { UserSearchesModalService } from 'app/entities/user-searches/user-searches-modal.service';
import { IUserSearches } from 'app/shared/model/user-searches.model';
import { UserSearchesService } from 'app/entities/user-searches/user-searches.service';
import { UserNotificationsService } from 'app/entities/user-notifications/user-notifications.service';
import { ConfirmationDialogService } from 'app/shared/confirm/confirmation-dialog.service';
import { PopupDialogService } from 'app/shared/popup/popup-dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
  animations: []
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  userSearchesSubscription: Subscription;
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
  rates: IRate[];
  currencies: any[];
  userSearches: IUserSearches[];
  savedUserSearch: string;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private rateService: RateService,
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    private eventManager: JhiEventManager,
    private userSearchesModalService: UserSearchesModalService,
    private userSearchesService: UserSearchesService,
    private userNotificationsService: UserNotificationsService,
    private confirmationDialogService: ConfirmationDialogService,
    private popupDialogService: PopupDialogService,
    private translate: TranslateService
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
    this.isHidden = !(this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['filter']);
    this.currencies = [];
    this.userSearches = [];
    this.savedUserSearch = '';
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

  loadUserSearches() {
    if (this.isAuthenticated())
      this.userSearchesService.query().subscribe((res: HttpResponse<IUserSearches[]>) => this.displayUserSearches(res.body, res.headers));
  }

  reset() {
    this.items = [];
    this.loadAll();
  }

  loadPage(page) {
    this.loadCats();
    this.loadRates();
    this.loadUserSearches();
    this.loadAll();
  }

  ngOnInit() {
    this.loadCats();
    this.loadRates();
    this.loadAll();
    this.accountService.identity().then((account: Account) => {
      this.account = account;
      this.loadUserSearches();
    });
    this.registerAuthenticationSuccess();
    this.registerChangeInItems();
    this.registerUserSearchChange();
    this.refreshContent();
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
        this.loadUserSearches();
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
    if (this.userSearchesSubscription) {
      this.eventManager.destroy(this.userSearchesSubscription);
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

  save(query) {}

  refreshContent() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.loadAll();
    }, this.searchTimeToRefresh * 1000);
  }

  showHideFilters() {
    this.isHidden = !this.isHidden;
  }

  calcRates(code, state) {
    if (state === true) this.currencies.push(code);
    else {
      const fnd = this.currencies.indexOf(code);
      if (fnd > -1) this.currencies.splice(fnd, 1);
    }
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

  private displayUserSearches(body: IUserSearches[], headers: HttpHeaders) {
    this.userSearches = body;
    if (this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['filter']) {
      // Does not work !!!
      this.savedUserSearch = this.activatedRoute.snapshot.queryParams['filter'];
      this.loadSavedSearch();
    }
  }

  convertPrice(price: number, rate: any) {
    let currency = new Rate();

    this.rates.forEach(rateVal => {
      if (rateVal.code === rate) currency = rateVal;
    });

    return (price / currency.rate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ') + ' ' + currency.mark;
  }

  saveUserSearch() {
    this.userSearchesModalService.open(this.searchCategory, this.searchType, this.searchTimeToRefresh, this.currentSearch, this.currencies);
  }

  loadSavedSearch() {
    if (this.savedUserSearch === null || this.savedUserSearch === undefined || this.savedUserSearch === '') {
      this.currencies = [];
      this.searchType = 0;
      this.currentSearch = '';
      this.searchTimeToRefresh = 6;
      this.searchCategory = '';
      this.loadAll();
      return;
    }

    const filter = JSON.parse(this.userSearches.find(search => search.id === Number(this.savedUserSearch)).payload);
    this.currencies = filter['currencies'];
    this.searchType = filter['searchType'];
    this.currentSearch = filter['currentSearch'];
    this.searchTimeToRefresh = filter['searchTimeToRefresh'] === null ? 6 : filter['searchTimeToRefresh'];
    this.searchCategory = filter['searchCategory'];
    this.loadAll();
  }

  private registerUserSearchChange() {
    this.userSearchesSubscription = this.eventManager.subscribe('userSearchListModification', response => this.loadUserSearches());
  }

  deleteUserSearch() {
    this.userSearchesService.delete(Number(this.savedUserSearch)).subscribe(response => {
      this.savedUserSearch = '';
      this.loadSavedSearch();
      this.loadUserSearches();
    });
  }

  createSearchNotification() {
    if (!this.savedUserSearch) {
      this.popupDialogService.popup(this.translate.instant('gatorApp.userNotifications.emptyFilterName'));
      return;
    }
    this.confirmationDialogService
      .confirm(this.translate.instant('gatorApp.item.home.createAlertTitle'), this.translate.instant('gatorApp.item.home.createAlertText'))
      .then(confirmed => this.subscribeToNotificationSaveResponse(this.userNotificationsService.create(this.createNotificationsForm())));
  }

  private createNotificationsForm(): IUserNotifications {
    return {
      ...new UserNotifications(),
      notificationName: 'email',
      userSearchesId: Number(this.savedUserSearch),
      isActive: true
    };
  }

  private subscribeToNotificationSaveResponse(result: Observable<HttpResponse<IUserNotifications>>) {
    result.subscribe(
      () => this.popupDialogService.popup(this.translate.instant('gatorApp.userNotifications.created')),
      () => this.popupDialogService.popup(this.translate.instant('gatorApp.userNotifications.notificationAlreadyExists'))
    );
  }
}
