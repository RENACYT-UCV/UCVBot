import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResultComponent } from "./result.component";

const ROUTES: Routes = [
    {
        path: '',
        component: ResultComponent,
        title: 'UcvBot | Resultado del Test'
    }
]

@NgModule({
    imports: [RouterModule.forChild(ROUTES)]
})
export class ResultRoutingModule { }