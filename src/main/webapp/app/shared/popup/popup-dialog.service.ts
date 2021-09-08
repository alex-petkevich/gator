import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PopupDialogComponent } from './popup-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class PopupDialogService {
  constructor(private modalService: NgbModal, private translate: TranslateService) {}

  public popup(
    message: string,
    title: string = this.translate.instant('confirmation.title'),
    btnOkText = this.translate.instant('confirmation.ok'),
    dialogSize: 'sm' | 'lg' = 'sm'
  ) {
    const modalRef = this.modalService.open(PopupDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
  }
}
