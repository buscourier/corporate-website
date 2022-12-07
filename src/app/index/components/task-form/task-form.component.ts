import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {Pattern} from '../../../shared/pattern/pattern'

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Заполните`,
        email: `Некорректный email`,
        minlength: (error) => {
          return `Минимум ${error.requiredLength} символа`
        },
        pattern: (error) => {
          return `Только буквы`
        },
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
  form = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.Text),
        Validators.minLength(2),
      ],
    ],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.TextWithNumbersAndSymbols),
        Validators.minLength(2),
      ],
    ],
    agree: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('!')
  }

  onSubmit() {}
}
