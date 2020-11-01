import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProperties, Properties } from 'app/shared/model/properties.model';
import { PropertiesService } from './properties.service';

@Component({
  selector: 'jhi-properties-update',
  templateUrl: './properties-update.component.html'
})
export class PropertiesUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    isActive: []
  });

  constructor(protected propertiesService: PropertiesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ properties }) => {
      this.updateForm(properties);
    });
  }

  updateForm(properties: IProperties) {
    this.editForm.patchValue({
      id: properties.id,
      name: properties.name,
      isActive: properties.isActive
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const properties = this.createFromForm();
    if (properties.id !== undefined) {
      this.subscribeToSaveResponse(this.propertiesService.update(properties));
    } else {
      this.subscribeToSaveResponse(this.propertiesService.create(properties));
    }
  }

  private createFromForm(): IProperties {
    return {
      ...new Properties(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      isActive: this.editForm.get(['isActive']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProperties>>) {
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
