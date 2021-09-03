import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatorSharedModule } from 'app/shared/shared.module';
import { NotificationsComponent } from './notifications.component';
import { NotificationsDetailComponent } from './notifications-detail.component';
import { NotificationsUpdateComponent } from './notifications-update.component';
import { NotificationsDeletePopupComponent, NotificationsDeleteDialogComponent } from './notifications-delete-dialog.component';
import { notificationsRoute, notificationsPopupRoute } from './notifications.route';

const ENTITY_STATES = [...notificationsRoute, ...notificationsPopupRoute];

@NgModule({
  imports: [GatorSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NotificationsComponent,
    NotificationsDetailComponent,
    NotificationsUpdateComponent,
    NotificationsDeleteDialogComponent,
    NotificationsDeletePopupComponent
  ],
  entryComponents: [NotificationsDeleteDialogComponent]
})
export class GatorNotificationsModule {}
