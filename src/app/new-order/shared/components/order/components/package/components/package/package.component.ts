import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {Store} from '@ngrx/store'
import {concatAll, filter, map, Observable, of, toArray} from 'rxjs'
import {switchMap, tap} from 'rxjs/operators'
import {allServicesSelector} from 'src/app/new-order/shared/components/orders/store/selectors'
import {ServiceInterface} from '../../../../../../types/service.interface'
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'

// interface PackageInterface {
//   [key: string]: boolean
//   count: number,
// }

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageComponent implements OnInit {
  services$: Observable<ServiceInterface[]>

  boxes = this.fb.array<FormGroup>([])
  safePacks = this.fb.array<FormGroup>([])
  placticPacks = this.fb.array<FormGroup>([])
  skins = this.fb.array<FormGroup>([])
  other = this.fb.array<FormGroup>([])

  form = this.fb.group({
    boxes: this.boxes,
    safePacks: this.safePacks,
    placticPacks: this.placticPacks,
    skins: this.skins,
    other: this.other,
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    console.log('this.form', this.form)
  }

  initializeValues() {
    this.store
      .select(allServicesSelector)
      .pipe(
        filter(Boolean),
        switchMap((services: ServiceInterface[]) => {
          return of(services).pipe(
            concatAll(),
            filter((service: ServiceInterface) => service.group_id === '1'),
            toArray(),
            map((services: ServiceInterface[]) => {
              services.forEach((service: ServiceInterface) => {
                switch (service.subgroup_id) {
                  case '1':
                    this.boxes.push(
                      this.fb.group({
                        [service.id]: false,
                        count: 1,
                        data: {...service, short_name: 'Коробка'},
                      })
                    )
                    break
                  case '2':
                    this.safePacks.push(
                      this.fb.group({
                        [service.id]: false,
                        count: 0,
                        data: service,
                      })
                    )
                    break
                  case '3':
                    this.placticPacks.push(
                      this.fb.group({
                        [service.id]: false,
                        count: 0,
                        data: service,
                      })
                    )
                    break
                  case '6':
                    this.skins.push(
                      this.fb.group({
                        [service.id]: false,
                        count: 0,
                        data: service,
                      })
                    )
                    break
                  default:
                    this.other.push(
                      this.fb.group({
                        [service.id]: false,
                        count: 0,
                        data: service,
                      })
                    )
                    break
                }
              })
              return services
            })
          )
        }),
        tap(() => {
          this.cdr.markForCheck()
        })
      )
      .subscribe()
  }

  getControl(control) {
    return control as FormControl
  }

  open() {
    console.log('form', this.form.value)
    // this.dialogService.open('hello').subscribe()
  }

  openDialog(content: PolymorpheusContent<TuiDialogContext>) {
    this.dialogService
      .open(content, {
        size: 's',
      })
      .subscribe()
  }

  closeDialog() {
    // this.dialogService.co
  }
}
