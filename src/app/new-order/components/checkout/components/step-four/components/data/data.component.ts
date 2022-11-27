import {ChangeDetectionStrategy, Component, Input} from '@angular/core'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataComponent {
  @Input('key') keyProps: string
  @Input('value') valueProps: any
}
