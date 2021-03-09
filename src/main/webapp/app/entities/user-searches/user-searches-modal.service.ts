import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserSearchesComponent } from './user-searches.component';

@Injectable({ providedIn: 'root' })
export class UserSearchesModalService {
  private isOpen = false;
  constructor(private modalService: NgbModal) {}

  open(searchCategory: String, searchType: number, searchTimeToRefresh: number, currentSearch: String, currencies: any[]) {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef = this.modalService.open(UserSearchesComponent);
    modalRef.componentInstance.searchCategory = searchCategory;
    modalRef.componentInstance.searchTimeToRefresh = searchTimeToRefresh;
    modalRef.componentInstance.currentSearch = currentSearch;
    modalRef.componentInstance.searchType = searchType;
    modalRef.componentInstance.currencies = currencies;

    modalRef.result.then(
      result => {
        this.isOpen = false;
      },
      reason => {
        this.isOpen = false;
      }
    );
    return modalRef;
  }
}
