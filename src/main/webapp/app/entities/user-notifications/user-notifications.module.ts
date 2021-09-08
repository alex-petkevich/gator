import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatorSharedModule } from 'app/shared/shared.module';
import { UserNotificationsComponent } from './user-notifications.component';
import { UserNotificationsDetailComponent } from './user-notifications-detail.component';
import {
  UserNotificationsDeletePopupComponent,
  UserNotificationsDeleteDialogComponent
} from './user-notifications-delete-dialog.component';
import { userNotificationsRoute, userNotificationsPopupRoute } from './user-notifications.route';

const ENTITY_STATES = [...userNotificationsRoute, ...userNotificationsPopupRoute];

@NgModule({
  imports: [GatorSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UserNotificationsComponent,
    UserNotificationsDetailComponent,
    UserNotificationsDeleteDialogComponent,
    UserNotificationsDeletePopupComponent
  ],
  entryComponents: [UserNotificationsDeleteDialogComponent]
})
export class GatorUserNotificationsModule {}
