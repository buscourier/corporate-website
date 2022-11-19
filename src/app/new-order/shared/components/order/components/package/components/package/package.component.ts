import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Store} from '@ngrx/store'
import {concatAll, filter, map, Observable, of, toArray} from 'rxjs'
import {switchMap} from 'rxjs/operators'
import {allServicesSelector} from 'src/app/new-order/shared/components/orders/store/selectors'
import {ServiceInterface} from '../../../../../../types/service.interface'
import {TuiDialogService} from '@taiga-ui/core'

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageComponent implements OnInit {
  services$: Observable<ServiceInterface[]>

  box = this.fb.array([])
  safePack = this.fb.array([])
  placticPack = this.fb.array([])
  skin = this.fb.array([])
  other = this.fb.array([])

  form = this.fb.group({
    box: this.box,
    safePack: this.safePack,
    placticPack: this.placticPack,
    skin: this.skin,
    other: this.other,
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.services$ = this.store.select(allServicesSelector).pipe(
      filter(Boolean),
      switchMap((services: ServiceInterface[]) => {
        return of(services).pipe(
          concatAll(),
          filter((service: ServiceInterface) => service.group_id === '1'),
          toArray(),
          map((services: ServiceInterface[]) => {
            return services
          })
        )
      })
    )
  }

  open() {
    this.dialogService.open('hello').subscribe()
  }
}
