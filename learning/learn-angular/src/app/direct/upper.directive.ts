import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUpper]',
})
export class UpperDirective {
  constructor(e: ElementRef) {
    e.nativeElement.value = e.nativeElement.value.toUpperCase();
  }
}
