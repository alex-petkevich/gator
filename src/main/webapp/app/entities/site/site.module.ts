import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatorSharedModule } from 'app/shared/shared.module';
import { SiteComponent } from './site.component';
import { SiteDetailComponent } from './site-detail.component';
import { SiteUpdateComponent } from './site-update.component';
import { SiteDeletePopupComponent, SiteDeleteDialogComponent } from './site-delete-dialog.component';
import { siteRoute, sitePopupRoute } from './site.route';

const ENTITY_STATES = [...siteRoute, ...sitePopupRoute];

@NgModule({
  imports: [GatorSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [SiteComponent, SiteDetailComponent, SiteUpdateComponent, SiteDeleteDialogComponent, SiteDeletePopupComponent],
  entryComponents: [SiteDeleteDialogComponent]
})
export class GatorSiteModule {}
