import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityCellRendererComponent } from './city-cell-renderer/city-cell-renderer.component';
import { DeparTamentCellRendererComponent } from './depar-tament-cell-renderer/depar-tament-cell-renderer.component';



@NgModule({
  declarations: [
    CityCellRendererComponent,
    DeparTamentCellRendererComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
