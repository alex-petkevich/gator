import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatorTestModule } from '../../../test.module';
import { UserPropertiesDeleteDialogComponent } from 'app/entities/user-properties/user-properties-delete-dialog.component';
import { UserPropertiesService } from 'app/entities/user-properties/user-properties.service';

describe('Component Tests', () => {
  describe('UserProperties Management Delete Component', () => {
    let comp: UserPropertiesDeleteDialogComponent;
    let fixture: ComponentFixture<UserPropertiesDeleteDialogComponent>;
    let service: UserPropertiesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatorTestModule],
        declarations: [UserPropertiesDeleteDialogComponent]
      })
        .overrideTemplate(UserPropertiesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserPropertiesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserPropertiesService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
