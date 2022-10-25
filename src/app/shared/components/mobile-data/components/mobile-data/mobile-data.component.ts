import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-mobile-data',
  templateUrl: './mobile-data.component.html',
  styleUrls: ['./mobile-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileDataComponent implements OnInit {
  @Input('key') keyProps: string
  @Input('value') valueProps: string

  constructor() {}

  ngOnInit(): void {}
}
