import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatorTestModule } from '../../../test.module';
import { UserPropertiesDetailComponent } from 'app/entities/user-properties/user-properties-detail.component';
import { UserProperties } from 'app/shared/model/user-properties.model';

describe('Component Tests', () => {
  describe('UserProperties Management Detail Component', () => {
    let comp: UserPropertiesDetailComponent;
    let fixture: ComponentFixture<UserPropertiesDetailComponent>;
    const route = ({ data: of({ userProperties: new UserProperties(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatorTestModule],
        declarations: [UserPropertiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserPropertiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserPropertiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userProperties).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
