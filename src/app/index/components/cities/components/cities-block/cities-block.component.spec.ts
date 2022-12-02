import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CitiesBlockComponent} from './cities-block.component'

describe('CitiesBlockComponent', () => {
  let component: CitiesBlockComponent
  let fixture: ComponentFixture<CitiesBlockComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitiesBlockComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CitiesBlockComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
