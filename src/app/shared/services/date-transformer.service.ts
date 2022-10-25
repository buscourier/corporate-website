import {Injectable} from '@angular/core'
import {TuiControlValueTransformer, TuiDay} from '@taiga-ui/cdk'

@Injectable() // TuiDay | null, Date | null>
export class DateTransformer
  implements TuiControlValueTransformer<TuiDay | null, any | null>
{
  fromControlValue(controlValue: Date | null): any | null {
    return controlValue
  }

  toControlValue(componentValue: TuiDay | null): String | null {
    return componentValue?.getFormattedDay(`YMD`, `*`) || null
  }
}
