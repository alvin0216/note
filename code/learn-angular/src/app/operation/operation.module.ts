import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Opt1Component } from './opt1/opt1.component';

@NgModule({
  declarations: [Opt1Component],
  imports: [CommonModule],
  // 给其他 modules 使用
  exports: [Opt1Component],
})
export class OperationModule {}
