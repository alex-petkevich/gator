import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatorUserSearchesModule } from 'app/entities/user-searches/user-searches.module';

@NgModule({
  imports: [
    GatorUserSearchesModule,
    RouterModule.forChild([
      {
        path: 'item',
        loadChildren: () => import('./item/item.module').then(m => m.GatorItemModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.GatorCategoryModule)
      },
      {
        path: 'site',
        loadChildren: () => import('./site/site.module').then(m => m.GatorSiteModule)
      },
      {
        path: 'user-properties',
        loadChildren: () => import('./user-properties/user-properties.module').then(m => m.GatorUserPropertiesModule)
      },
      {
        path: 'user-searches',
        loadChildren: () => import('./user-searches/user-searches.module').then(m => m.GatorUserSearchesModule)
      },
      {
        path: 'properties',
        loadChildren: () => import('./properties/properties.module').then(m => m.GatorPropertiesModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notifications/notifications.module').then(m => m.GatorNotificationsModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  exports: []
})
export class GatorEntityModule {}
