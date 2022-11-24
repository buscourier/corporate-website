import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Store} from '@ngrx/store'

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepFourComponent {
  message = this.fb.control('')
  policy = this.fb.control(false)

  form = this.fb.group({
    message: this.message,
    policy: this.policy,
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    console.log('Step four', this.form.value)
  }
}
