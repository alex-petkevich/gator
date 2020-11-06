import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IItem, Item } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';

@Component({
  selector: 'jhi-item-update',
  templateUrl: './item-update.component.html'
})
export class ItemUpdateComponent implements OnInit {
  isSaving: boolean;

  categories: ICategory[];

  editForm = this.fb.group({
    id: [],
    type: [],
    title: [null, [Validators.required]],
    description: [],
    price: [],
    link: [],
    ownerName: [],
    ownerLink: [],
    image: [],
    active: [],
    createdAt: [],
    updatedAt: [],
    deletedAt: [],
    categoryId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemService: ItemService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ item }) => {
      this.updateForm(item);
    });
    this.categoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(item: IItem) {
    this.editForm.patchValue({
      id: item.id,
      type: item.type,
      title: item.title,
      description: item.description,
      price: item.price,
      link: item.link,
      ownerName: item.ownerName,
      ownerLink: item.ownerLink,
      image: item.image,
      active: item.active,
      createdAt: item.createdAt != null ? item.createdAt.format(DATE_TIME_FORMAT) : null,
      updatedAt: item.updatedAt != null ? item.updatedAt.format(DATE_TIME_FORMAT) : null,
      deletedAt: item.deletedAt != null ? item.deletedAt.format(DATE_TIME_FORMAT) : null,
      categoryId: item.categoryId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const item = this.createFromForm();
    if (item.id !== undefined) {
      this.subscribeToSaveResponse(this.itemService.update(item));
    } else {
      this.subscribeToSaveResponse(this.itemService.create(item));
    }
  }

  private createFromForm(): IItem {
    return {
      ...new Item(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value,
      title: this.editForm.get(['title']).value,
      description: this.editForm.get(['description']).value,
      price: this.editForm.get(['price']).value,
      link: this.editForm.get(['link']).value,
      ownerName: this.editForm.get(['ownerName']).value,
      ownerLink: this.editForm.get(['ownerLink']).value,
      image: this.editForm.get(['image']).value,
      active: this.editForm.get(['active']).value,
      createdAt:
        this.editForm.get(['createdAt']).value != null ? moment(this.editForm.get(['createdAt']).value, DATE_TIME_FORMAT) : undefined,
      updatedAt:
        this.editForm.get(['updatedAt']).value != null ? moment(this.editForm.get(['updatedAt']).value, DATE_TIME_FORMAT) : undefined,
      deletedAt:
        this.editForm.get(['deletedAt']).value != null ? moment(this.editForm.get(['deletedAt']).value, DATE_TIME_FORMAT) : undefined,
      categoryId: this.editForm.get(['categoryId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItem>>) {
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

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }
}
