import {ComponentFixture, TestBed} from '@angular/core/testing'

import {HowToSendComponent} from './how-to-send.component'

describe('HowToSendComponent', () => {
  let component: HowToSendComponent
  let fixture: ComponentFixture<HowToSendComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowToSendComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(HowToSendComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
