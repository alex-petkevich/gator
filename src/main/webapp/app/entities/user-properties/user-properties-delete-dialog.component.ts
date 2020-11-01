import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserProperties } from 'app/shared/model/user-properties.model';
import { UserPropertiesService } from './user-properties.service';

@Component({
  selector: 'jhi-user-properties-delete-dialog',
  templateUrl: './user-properties-delete-dialog.component.html'
})
export class UserPropertiesDeleteDialogComponent {
  userProperties: IUserProperties;

  constructor(
    protected userPropertiesService: UserPropertiesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userPropertiesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userPropertiesListModification',
        content: 'Deleted an userProperties'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-user-properties-delete-popup',
  template: ''
})
export class UserPropertiesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userProperties }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserPropertiesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.userProperties = userProperties;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/user-properties', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/user-properties', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
