import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserNotifications } from 'app/shared/model/user-notifications.model';
import { UserNotificationsService } from './user-notifications.service';

@Component({
  selector: 'jhi-user-notifications-delete-dialog',
  templateUrl: './user-notifications-delete-dialog.component.html'
})
export class UserNotificationsDeleteDialogComponent {
  userNotifications: IUserNotifications;

  constructor(
    protected userNotificationsService: UserNotificationsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userNotificationsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userNotificationsListModification',
        content: 'Deleted an userNotifications'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-user-notifications-delete-popup',
  template: ''
})
export class UserNotificationsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userNotifications }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserNotificationsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.userNotifications = userNotifications;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/user-notifications', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/user-notifications', { outlets: { popup: null } }]);
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
