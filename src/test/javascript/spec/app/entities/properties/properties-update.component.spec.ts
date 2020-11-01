import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatorTestModule } from '../../../test.module';
import { PropertiesUpdateComponent } from 'app/entities/properties/properties-update.component';
import { PropertiesService } from 'app/entities/properties/properties.service';
import { Properties } from 'app/shared/model/properties.model';

describe('Component Tests', () => {
  describe('Properties Management Update Component', () => {
    let comp: PropertiesUpdateComponent;
    let fixture: ComponentFixture<PropertiesUpdateComponent>;
    let service: PropertiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatorTestModule],
        declarations: [PropertiesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PropertiesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropertiesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertiesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Properties(123);
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
        const entity = new Properties();
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
