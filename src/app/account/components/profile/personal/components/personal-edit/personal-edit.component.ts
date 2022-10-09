import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
