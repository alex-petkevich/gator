import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProperties } from 'app/shared/model/properties.model';
import { PropertiesService } from './properties.service';

@Component({
  selector: 'jhi-properties-delete-dialog',
  templateUrl: './properties-delete-dialog.component.html'
})
export class PropertiesDeleteDialogComponent {
  properties: IProperties;

  constructor(
    protected propertiesService: PropertiesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.propertiesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'propertiesListModification',
        content: 'Deleted an properties'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-properties-delete-popup',
  template: ''
})
export class PropertiesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ properties }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PropertiesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.properties = properties;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/properties', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/properties', { outlets: { popup: null } }]);
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
