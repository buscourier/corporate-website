import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
