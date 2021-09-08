import { NgModule } from '@angular/core';
import { GatorSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { JhiLoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirm/confirmation-dialog.component';
import { PopupDialogComponent } from './popup/popup-dialog.component';

@NgModule({
  imports: [GatorSharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    ConfirmationDialogComponent,
    PopupDialogComponent
  ],
  entryComponents: [JhiLoginModalComponent, ConfirmationDialogComponent, PopupDialogComponent],
  exports: [
    GatorSharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    NgSelectModule,
    ConfirmationDialogComponent,
    PopupDialogComponent,
    FormsModule
  ]
})
export class GatorSharedModule {}
