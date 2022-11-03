import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  activeItemIndex = 0

  goToStep(index) {
    this.activeItemIndex = index
  }
}
