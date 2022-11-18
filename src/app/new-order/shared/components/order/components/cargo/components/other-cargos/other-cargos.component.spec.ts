import {ComponentFixture, TestBed} from '@angular/core/testing'

import {OtherCargosComponent} from './other-cargos.component'

describe('OtherCargosComponent', () => {
  let component: OtherCargosComponent
  let fixture: ComponentFixture<OtherCargosComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherCargosComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(OtherCargosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
