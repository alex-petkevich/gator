import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserProperties, UserProperties } from 'app/shared/model/user-properties.model';
import { UserPropertiesService } from './user-properties.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-user-properties-update',
  templateUrl: './user-properties-update.component.html'
})
export class UserPropertiesUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    value: [],
    userId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userPropertiesService: UserPropertiesService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userProperties }) => {
      this.updateForm(userProperties);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userProperties: IUserProperties) {
    this.editForm.patchValue({
      id: userProperties.id,
      value: userProperties.value,
      userId: userProperties.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userProperties = this.createFromForm();
    if (userProperties.id !== undefined) {
      this.subscribeToSaveResponse(this.userPropertiesService.update(userProperties));
    } else {
      this.subscribeToSaveResponse(this.userPropertiesService.create(userProperties));
    }
  }

  private createFromForm(): IUserProperties {
    return {
      ...new UserProperties(),
      id: this.editForm.get(['id']).value,
      value: this.editForm.get(['value']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserProperties>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
