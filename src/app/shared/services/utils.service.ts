import {Injectable} from '@angular/core'

@Injectable()
export class UtilsService {
  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el: number) => el + start)
  }

  getObjectKey(object) {
    return object instanceof Object && Object.keys(object)
  }

  isObjectsEqual(obj1, obj2) {
    let props1 = Object.getOwnPropertyNames(obj1)
    let props2 = Object.getOwnPropertyNames(obj2)
    if (props1.length != props2.length) {
      return false
    }
    for (let i = 0; i < props1.length; i++) {
      let val1 = obj1[props1[i]]
      let val2 = obj2[props1[i]]
      let isObjects = this.isObject(val1) && this.isObject(val2)
      if (
        (isObjects && !this.isObjectsEqual(val1, val2)) ||
        (!isObjects && val1 !== val2)
      ) {
        return false
      }
    }
    return true
  }

  isObject(object) {
    return object != null && typeof object === 'object'
  }
}
