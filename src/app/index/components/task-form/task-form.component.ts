import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    message: ['', [Validators.required]],
    agree: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('!')
  }

  onSubmit() {}
}
