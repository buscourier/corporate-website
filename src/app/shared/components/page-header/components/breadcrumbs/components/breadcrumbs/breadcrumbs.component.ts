import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {filter, Subject} from 'rxjs'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'
import {UtilsService} from '../../../../../../services/utils.service'

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbs: Array<object>
  unsubscribeAll = new Subject()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.render()
      })
  }

  private render() {
    this.breadcrumbs = []

    let currentRoute = this.route.root
    let url = ''

    do {
      const childrenRoutes = currentRoute.children
      currentRoute = null

      childrenRoutes.forEach((route) => {
        if (route.outlet === 'primary') {
          const routeSnapshot = route.snapshot
          url +=
            routeSnapshot.url.map((segment) => segment.path).join('/') + '/'

          const routeData = Object.assign({}, route.snapshot.data)

          if (this.utilsService.getObjectKey(routeData).length) {
            this.breadcrumbs.push({
              isStub: typeof routeSnapshot.component === 'undefined',
              label: routeData,
              url,
            })
          }

          currentRoute = route
        }
      })
    } while (currentRoute)
  }

  ngOnDestroy() {
    // this.unsubscribeAll.next();
    this.unsubscribeAll.complete()
  }
}
