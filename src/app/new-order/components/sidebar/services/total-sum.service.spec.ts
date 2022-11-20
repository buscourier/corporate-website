import {TestBed} from '@angular/core/testing'

import {TotalSumService} from './total-sum.service'

describe('TotalSumService', () => {
  let service: TotalSumService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TotalSumService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
