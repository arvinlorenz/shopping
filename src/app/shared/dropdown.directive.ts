import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false; //lets you set properties on the element or component that hosts the directive
  @HostListener('click') toggleOpen(){ //lets you listen for events on the host element or component.
  	this.isOpen = !this.isOpen;
  }
  constructor() { }

  


}
