import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MgrComponentComponent } from './mgr-component.component';
import { MgrButtonComponent } from './mgr-button/mgr-button.component';
import { MgrFormComponent } from './mgr-form/mgr-form.component';
import { MgrHeaderComponent } from './mgr-header/mgr-header.component';

@NgModule({
  declarations: [
    MgrComponentComponent,
    MgrButtonComponent,
    MgrFormComponent,
    MgrHeaderComponent,
  ],
  imports: [CommonModule],
  exports: [
    MgrComponentComponent,
    MgrButtonComponent,
    MgrFormComponent,
    MgrHeaderComponent,
  ],
})
export class MgrComponentModule {}
