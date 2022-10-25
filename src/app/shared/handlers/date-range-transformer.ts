import {TuiControlValueTransformer, TuiDay, TuiDayRange} from '@taiga-ui/cdk'
import {Injectable} from '@angular/core'

// @Injectable()
// export class DateTransformer
//   implements TuiControlValueTransformer<TuiDay | null, Date | null>
// {
//   fromControlValue(controlValue: Date | null): TuiDay | null {
//     console.log('from controlValue', TuiDay.fromUtcNativeDate(controlValue))
//     return controlValue && TuiDay.fromLocalNativeDate(controlValue)
//   }
//
//   toControlValue(componentValue: TuiDay | null): Date | null {
//     console.log('to componentValue', componentValue)
//
//     return componentValue?.toLocalNativeDate() || null
//   }
// }

class DateRangeTransformer
  implements
    TuiControlValueTransformer<TuiDayRange | null, [Date, Date] | null>
{
  constructor(
    private readonly dateTransformer: TuiControlValueTransformer<
      TuiDay | null,
      Date | null
    >
  ) {}

  fromControlValue(controlValue: [Date, Date] | null): TuiDayRange | null {
    const [transformedFrom, transformedTo] = controlValue || [null, null]
    const from =
      transformedFrom && this.dateTransformer.fromControlValue(transformedFrom)
    const to =
      transformedTo && this.dateTransformer.fromControlValue(transformedTo)

    return from && to && new TuiDayRange(from, to)
  }

  toControlValue(componentValue: TuiDayRange | null): [Date, Date] | null {
    const from =
      componentValue && this.dateTransformer.toControlValue(componentValue.from)
    const to =
      componentValue && this.dateTransformer.toControlValue(componentValue.to)

    return from && to && [from, to]
  }
}

// export function getDateRangeTransformer(
//   dateTransformer: DateTransformer | null
// ): TuiControlValueTransformer<TuiDayRange | null, [Date, Date] | null> | null {
//   return dateTransformer && new DateRangeTransformer(dateTransformer)
// }
