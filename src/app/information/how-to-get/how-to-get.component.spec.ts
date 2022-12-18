import {ComponentFixture, TestBed} from '@angular/core/testing'

import {HowToGetComponent} from './how-to-get.component'

describe('HowToGetComponent', () => {
  let component: HowToGetComponent
  let fixture: ComponentFixture<HowToGetComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowToGetComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(HowToGetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
