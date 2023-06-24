import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {
  POLYMORPHEUS_CONTEXT,
  PolymorpheusComponent,
} from '@tinkoff/ng-polymorpheus'
import {TuiDialogContext} from '@taiga-ui/core'
import {Store} from '@ngrx/store'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {NewsItemComponent} from '../../../news/components/news-item/news-item.component'
import {take} from 'rxjs'

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
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
          return `Некорректные данные`
        },
        phoneLength: (error) => {
          return `Нeкорректный номер`
        },
      },
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent implements OnInit {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('resume')
  }

  close() {
    this.context.completeWith(1)
  }
}
