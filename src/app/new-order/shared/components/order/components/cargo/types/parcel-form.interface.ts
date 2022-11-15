import {FormControl} from '@angular/forms'

export interface ParcelFormInterface {
  count: FormControl<string>
  weight: FormControl<string>
  width: FormControl<string>
  height: FormControl<string>
  length: FormControl<string>
}
