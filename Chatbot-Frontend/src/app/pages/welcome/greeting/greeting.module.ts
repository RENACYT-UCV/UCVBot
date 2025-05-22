import { NgModule } from '@angular/core';

import { GreetingComponent } from './greeting.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GreetingRoutingModule } from './greeting-routing.module';

@NgModule({
  imports: [CommonModule, RouterModule, GreetingRoutingModule],
  exports: [],
  declarations: [GreetingComponent],
  providers: [],
})
export class GreetingModule {}
