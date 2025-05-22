import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChooseLevelComponent } from './choose-level.component';
import { ChooseLevelRoutingModule } from './choose-level.routing.module';

@NgModule({
  imports: [CommonModule, RouterModule, ChooseLevelRoutingModule],
  declarations: [ChooseLevelComponent],
})
export class ChooseLevelModule {}
