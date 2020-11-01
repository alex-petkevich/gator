import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICategory, Category } from 'app/shared/model/category.model';
import { CategoryService } from './category.service';
import { ISite } from 'app/shared/model/site.model';
import { SiteService } from 'app/entities/site/site.service';

@Component({
  selector: 'jhi-category-update',
  templateUrl: './category-update.component.html'
})
export class CategoryUpdateComponent implements OnInit {
  isSaving: boolean;

  sites: ISite[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    link: [],
    active: [],
    siteId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected categoryService: CategoryService,
    protected siteService: SiteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ category }) => {
      this.updateForm(category);
    });
    this.siteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISite[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISite[]>) => response.body)
      )
      .subscribe((res: ISite[]) => (this.sites = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(category: ICategory) {
    this.editForm.patchValue({
      id: category.id,
      name: category.name,
      link: category.link,
      active: category.active,
      siteId: category.siteId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const category = this.createFromForm();
    if (category.id !== undefined) {
      this.subscribeToSaveResponse(this.categoryService.update(category));
    } else {
      this.subscribeToSaveResponse(this.categoryService.create(category));
    }
  }

  private createFromForm(): ICategory {
    return {
      ...new Category(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      link: this.editForm.get(['link']).value,
      active: this.editForm.get(['active']).value,
      siteId: this.editForm.get(['siteId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategory>>) {
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

  trackSiteById(index: number, item: ISite) {
    return item.id;
  }
}
