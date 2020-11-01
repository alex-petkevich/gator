import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatorTestModule } from '../../../test.module';
import { UserPropertiesComponent } from 'app/entities/user-properties/user-properties.component';
import { UserPropertiesService } from 'app/entities/user-properties/user-properties.service';
import { UserProperties } from 'app/shared/model/user-properties.model';

describe('Component Tests', () => {
  describe('UserProperties Management Component', () => {
    let comp: UserPropertiesComponent;
    let fixture: ComponentFixture<UserPropertiesComponent>;
    let service: UserPropertiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatorTestModule],
        declarations: [UserPropertiesComponent],
        providers: []
      })
        .overrideTemplate(UserPropertiesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserPropertiesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserPropertiesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserProperties(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userProperties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
