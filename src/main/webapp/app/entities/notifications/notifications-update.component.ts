import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INotifications, Notifications } from 'app/shared/model/notifications.model';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'jhi-notifications-update',
  templateUrl: './notifications-update.component.html'
})
export class NotificationsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    title: [null, [Validators.required, Validators.maxLength(255)]],
    isActive: []
  });

  constructor(protected notificationsService: NotificationsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ notifications }) => {
      this.updateForm(notifications);
    });
  }

  updateForm(notifications: INotifications) {
    this.editForm.patchValue({
      id: notifications.id,
      name: notifications.name,
      title: notifications.title,
      isActive: notifications.isActive
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const notifications = this.createFromForm();
    if (notifications.id !== undefined) {
      this.subscribeToSaveResponse(this.notificationsService.update(notifications));
    } else {
      this.subscribeToSaveResponse(this.notificationsService.create(notifications));
    }
  }

  private createFromForm(): INotifications {
    return {
      ...new Notifications(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      title: this.editForm.get(['title']).value,
      isActive: this.editForm.get(['isActive']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotifications>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
