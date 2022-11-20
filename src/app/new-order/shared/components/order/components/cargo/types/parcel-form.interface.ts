import {FormControl} from '@angular/forms'

export interface ParcelFormInterface {
  count: FormControl<number>
  weight: FormControl<number>
  width: FormControl<number>
  height: FormControl<number>
  length: FormControl<number>
}
