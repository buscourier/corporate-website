import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CitiesGroupComponent} from './cities-group.component'

describe('CitiesGroupComponent', () => {
  let component: CitiesGroupComponent
  let fixture: ComponentFixture<CitiesGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitiesGroupComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CitiesGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
