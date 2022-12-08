import {TestBed} from '@angular/core/testing'

import {ProxyPersonService} from './proxy-person.service'

describe('ProxyPersonService', () => {
  let service: ProxyPersonService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ProxyPersonService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
