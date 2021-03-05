import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserSearches, UserSearches } from 'app/shared/model/user-searches.model';
import { UserSearchesService } from './user-searches.service';

@Component({
  selector: 'jhi-user-searches',
  templateUrl: './user-searches.component.html'
})
export class UserSearchesComponent {
  userSearches: IUserSearches;

  userSearchForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(254)]]
  });

  constructor(
    protected userSearchesService: UserSearchesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager,
    private fb: FormBuilder
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmSave() {
    const userSearchForm = this.createFromForm();
    this.userSearchesService.create(userSearchForm).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userSearchListModification',
        content: 'Created an userSearches'
      });
      this.activeModal.dismiss(true);
    });
  }

  private createFromForm(): IUserSearches {
    return {
      ...new UserSearches(),
      name: this.userSearchForm.get(['name']).value,
      payload: JSON.stringify({ type: 'test', name: 'test2' })
    };
  }
}
