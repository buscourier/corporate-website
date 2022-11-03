import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent {
  form = this.fb.group({
    person: [null, Validators.required],
  })

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.form.value)
  }
}
