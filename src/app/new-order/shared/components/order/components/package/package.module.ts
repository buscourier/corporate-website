import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {PackageComponent} from './components/package/package.component'
import {TuiButtonModule, TuiDialogModule} from '@taiga-ui/core'

@NgModule({
  declarations: [PackageComponent],
  imports: [CommonModule, TuiDialogModule, TuiButtonModule],
  exports: [PackageComponent],
})
export class PackageModule {}
