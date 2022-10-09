import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
