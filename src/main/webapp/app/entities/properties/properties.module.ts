import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatorSharedModule } from 'app/shared/shared.module';
import { PropertiesComponent } from './properties.component';
import { PropertiesDetailComponent } from './properties-detail.component';
import { PropertiesUpdateComponent } from './properties-update.component';
import { PropertiesDeletePopupComponent, PropertiesDeleteDialogComponent } from './properties-delete-dialog.component';
import { propertiesRoute, propertiesPopupRoute } from './properties.route';

const ENTITY_STATES = [...propertiesRoute, ...propertiesPopupRoute];

@NgModule({
  imports: [GatorSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PropertiesComponent,
    PropertiesDetailComponent,
    PropertiesUpdateComponent,
    PropertiesDeleteDialogComponent,
    PropertiesDeletePopupComponent
  ],
  entryComponents: [PropertiesDeleteDialogComponent]
})
export class GatorPropertiesModule {}
