import {ComponentFixture, TestBed} from '@angular/core/testing'

import {PickupPointsComponent} from './pickup-points.component'

describe('PickupPointsComponent', () => {
  let component: PickupPointsComponent
  let fixture: ComponentFixture<PickupPointsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PickupPointsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PickupPointsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
