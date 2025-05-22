import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ResultRoutingModule } from "./result-routing.module";
import { ResultComponent } from "./result.component";

@NgModule({
    imports: [CommonModule, RouterModule, ResultRoutingModule],
    declarations: [ResultComponent]
})
export class ResultModule { }