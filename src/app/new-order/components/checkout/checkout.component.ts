import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder} from '@angular/forms'

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

  form = this.fb.group({})

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert(1)
  }
}
