import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
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
        path: 'properties',
        loadChildren: () => import('./properties/properties.module').then(m => m.GatorPropertiesModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GatorEntityModule {}
