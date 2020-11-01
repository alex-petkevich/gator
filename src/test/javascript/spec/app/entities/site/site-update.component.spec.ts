import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatorTestModule } from '../../../test.module';
import { SiteUpdateComponent } from 'app/entities/site/site-update.component';
import { SiteService } from 'app/entities/site/site.service';
import { Site } from 'app/shared/model/site.model';

describe('Component Tests', () => {
  describe('Site Management Update Component', () => {
    let comp: SiteUpdateComponent;
    let fixture: ComponentFixture<SiteUpdateComponent>;
    let service: SiteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatorTestModule],
        declarations: [SiteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SiteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SiteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SiteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Site(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Site();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
