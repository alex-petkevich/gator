import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatorTestModule } from '../../../test.module';
import { PropertiesComponent } from 'app/entities/properties/properties.component';
import { PropertiesService } from 'app/entities/properties/properties.service';
import { Properties } from 'app/shared/model/properties.model';

describe('Component Tests', () => {
  describe('Properties Management Component', () => {
    let comp: PropertiesComponent;
    let fixture: ComponentFixture<PropertiesComponent>;
    let service: PropertiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatorTestModule],
        declarations: [PropertiesComponent],
        providers: []
      })
        .overrideTemplate(PropertiesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropertiesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertiesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Properties(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.properties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
