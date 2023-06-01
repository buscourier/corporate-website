import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import {Injectable} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {filter, finalize, first, Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {getDocumentsAction} from '../../store/documents/actions/get-documents.action'
import {DocumentInterface} from '../types/document.interface'
import {documentsSelector} from '../../store/documents/selectors'

@Injectable()
export class DocumentsResolver implements Resolve<any> {
  private isLoading = false

  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(documentsSelector),
      tap((documents: DocumentInterface[]) => {
        if (!this.isLoading && !documents.length) {
          this.isLoading = true
          this.store.dispatch(getDocumentsAction())
        }
      }),
      filter(Boolean),
      first(),
      finalize(() => (this.isLoading = false))
    )
  }
}
