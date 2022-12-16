import {ChangeDetectionStrategy, Component, Input} from '@angular/core'

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageComponent {
  @Input() count: string

  constructor() {}
}
