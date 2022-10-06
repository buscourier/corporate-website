import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core'

interface ILetContext<T> {
  appLet: T
}

@Directive({
  selector: '[appLet]',
})
export class LetDirective<T> {
  @Input() set appLet(value: T) {
    const context: ILetContext<T> = {appLet: value}

    this.viewContainer.clear()
    this.viewContainer.createEmbeddedView(this.template, context)
  }

  constructor(
    private template: TemplateRef<ILetContext<T>>,
    private viewContainer: ViewContainerRef
  ) {}
}
