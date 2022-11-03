import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent {
  form = this.fb.group({
    person: '',
  })

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log('form', this.form.value)
  }
}
