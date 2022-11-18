import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {PackageComponent} from './components/package/package.component'

@NgModule({
  declarations: [PackageComponent],
  imports: [CommonModule],
  exports: [PackageComponent],
})
export class PackageModule {}
