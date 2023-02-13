import {ComponentFixture, TestBed} from '@angular/core/testing'

import {MobileDataComponent} from './mobile-data.component'

describe('MobileDataComponent', () => {
  let component: MobileDataComponent
  let fixture: ComponentFixture<MobileDataComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileDataComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MobileDataComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
