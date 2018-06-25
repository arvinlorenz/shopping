import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [DropdownDirective],//components, directories, pipes
    exports: [CommonModule, DropdownDirective]
})
export class SharedModule{}