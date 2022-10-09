import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-edit',
  templateUrl: './entity-edit.component.html',
  styleUrls: ['./entity-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
