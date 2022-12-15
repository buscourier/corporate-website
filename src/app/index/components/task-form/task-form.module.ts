import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
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
import {SendMessageEffect} from './store/effects/send-message.effect'
import {reducer} from './store/reducer'
import {TASK_FORM_FEATURE} from './store/state'
import {TaskFormComponent} from './task-form.component'

@NgModule({
  declarations: [TaskFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputPhoneModule,
    TuiTextAreaModule,
    TuiCheckboxLabeledModule,
    TuiButtonModule,
    StoreModule.forFeature(TASK_FORM_FEATURE, reducer),
    EffectsModule.forFeature([SendMessageEffect]),
  ],
  exports: [TaskFormComponent],
  providers: [SiteService],
})
export class TaskFormModule {}
