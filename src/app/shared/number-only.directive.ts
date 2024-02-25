import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  @Input('appNumberOnly') maxLen?: string | number;

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(e: KeyboardEvent) {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters    
    input.value =this.maxLen && typeof(this.maxLen) === 'number' ? value.slice(0,this.maxLen) : value; // Limit to 10 digits  
  }
}
