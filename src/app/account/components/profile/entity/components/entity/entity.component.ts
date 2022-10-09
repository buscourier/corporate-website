import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
