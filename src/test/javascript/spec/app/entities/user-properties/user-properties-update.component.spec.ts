import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatorTestModule } from '../../../test.module';
import { UserPropertiesUpdateComponent } from 'app/entities/user-properties/user-properties-update.component';
import { UserPropertiesService } from 'app/entities/user-properties/user-properties.service';
import { UserProperties } from 'app/shared/model/user-properties.model';

describe('Component Tests', () => {
  describe('UserProperties Management Update Component', () => {
    let comp: UserPropertiesUpdateComponent;
    let fixture: ComponentFixture<UserPropertiesUpdateComponent>;
    let service: UserPropertiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatorTestModule],
        declarations: [UserPropertiesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserPropertiesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserPropertiesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserPropertiesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserProperties(123);
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
        const entity = new UserProperties();
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
