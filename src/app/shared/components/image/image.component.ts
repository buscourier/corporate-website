import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core'

interface Breakpoints {
  sm?: boolean
  md?: boolean
  lg?: boolean
  xl?: boolean
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  @Input() width!: string
  @Input() height!: string
  @Input() maxWidth!: string
  @Input() src!: string
  @Input() ext = 'jpg'
  @Input() alt!: string
  @Input() breakpoints!: Breakpoints

  formatSrc(src: string, breakpoint?: string, ext: string = 'jpg') {
    return breakpoint
      ? `${src}--${breakpoint}.${ext} 1x, ${src}--${breakpoint}@2x.${ext} 2x, ${src}--${breakpoint}@3x.${ext} 3x`
      : `${src}.${ext} 1x, ${src}@2x.${ext} 2x, ${src}@3x.${ext} 3x`
  }
}
