import {Injectable} from '@angular/core'

@Injectable()
export class UtilsService {
  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el: number) => el + start)
  }

  getObjectKey(object) {
    return object instanceof Object && Object.keys(object)
  }
}
