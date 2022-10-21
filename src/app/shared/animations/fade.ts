import {animate, style, transition, trigger} from '@angular/animations'

export const fadeIn = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(0.25rem)'}),
    animate('100ms ease-out', style({opacity: 1, transform: 'translateY(0)'})),
  ]),
  transition(':leave', [
    // :leave is alias to '* => void'
    animate(
      '150ms ease-in',
      style({opacity: 0, transform: 'translateY(0.25rem)'})
    ),
  ]),
])
