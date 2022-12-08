import {ComponentFixture, TestBed} from '@angular/core/testing'

import {ConfidantComponent} from './confidant.component'

describe('ConfidantComponent', () => {
  let component: ConfidantComponent
  let fixture: ComponentFixture<ConfidantComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfidantComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ConfidantComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
