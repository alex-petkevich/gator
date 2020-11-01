import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatorTestModule } from '../../../test.module';
import { PropertiesDetailComponent } from 'app/entities/properties/properties-detail.component';
import { Properties } from 'app/shared/model/properties.model';

describe('Component Tests', () => {
  describe('Properties Management Detail Component', () => {
    let comp: PropertiesDetailComponent;
    let fixture: ComponentFixture<PropertiesDetailComponent>;
    const route = ({ data: of({ properties: new Properties(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatorTestModule],
        declarations: [PropertiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PropertiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PropertiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.properties).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
