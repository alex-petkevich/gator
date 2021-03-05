import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatorSharedModule } from 'app/shared/shared.module';
import { UserSearchesComponent } from './user-searches.component';
import { userSearchesRoute } from './user-searches.route';

const ENTITY_STATES = [...userSearchesRoute];

@NgModule({
  imports: [GatorSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [UserSearchesComponent],
  entryComponents: [UserSearchesComponent]
})
export class GatorUserSearchesModule {}
