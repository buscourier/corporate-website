import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import {SiteService} from 'src/app/shared/services/site.service'
import {TaskFormComponent} from './task-form.component'

@NgModule({
  declarations: [TaskFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputPhoneModule,
    TuiTextAreaModule,
    TuiCheckboxLabeledModule,
    TuiButtonModule,
  ],
  exports: [TaskFormComponent],
  providers: [SiteService],
})
export class TaskFormModule {}
