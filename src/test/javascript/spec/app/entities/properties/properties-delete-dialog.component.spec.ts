import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatorTestModule } from '../../../test.module';
import { PropertiesDeleteDialogComponent } from 'app/entities/properties/properties-delete-dialog.component';
import { PropertiesService } from 'app/entities/properties/properties.service';

describe('Component Tests', () => {
  describe('Properties Management Delete Component', () => {
    let comp: PropertiesDeleteDialogComponent;
    let fixture: ComponentFixture<PropertiesDeleteDialogComponent>;
    let service: PropertiesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatorTestModule],
        declarations: [PropertiesDeleteDialogComponent]
      })
        .overrideTemplate(PropertiesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PropertiesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertiesService);
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
