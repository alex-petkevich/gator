import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatorSharedModule } from 'app/shared/shared.module';
import { UserPropertiesComponent } from './user-properties.component';
import { UserPropertiesDetailComponent } from './user-properties-detail.component';
import { UserPropertiesUpdateComponent } from './user-properties-update.component';
import { UserPropertiesDeletePopupComponent, UserPropertiesDeleteDialogComponent } from './user-properties-delete-dialog.component';
import { userPropertiesRoute, userPropertiesPopupRoute } from './user-properties.route';

const ENTITY_STATES = [...userPropertiesRoute, ...userPropertiesPopupRoute];

@NgModule({
  imports: [GatorSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UserPropertiesComponent,
    UserPropertiesDetailComponent,
    UserPropertiesUpdateComponent,
    UserPropertiesDeleteDialogComponent,
    UserPropertiesDeletePopupComponent
  ],
  entryComponents: [UserPropertiesDeleteDialogComponent]
})
export class GatorUserPropertiesModule {}
