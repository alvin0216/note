import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirectComponent } from './direct/direct.component';
import { FormComponent } from './form/form.component';
import { InteractionComponent } from './interaction/interaction.component';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { Opt1Component } from './operation/opt1/opt1.component';
import { PipeComponent } from './pipe/pipe.component';
import { ServiceDemoComponent } from './service-demo/service-demo.component';
import { TemplateComponent } from './template/template.component';

export const routes: Routes = [
  { path: 'template', component: TemplateComponent, title: '模板' },
  { path: 'form', component: FormComponent, title: '表单' },
  { path: 'pipe', component: PipeComponent, title: '管道' },
  { path: 'life-cycle', component: LifeCycleComponent, title: '生命周期' },
  { path: 'interaction', component: InteractionComponent, title: '组件交互' },
  { path: 'service', component: ServiceDemoComponent, title: '服务' },
  { path: 'direct', component: DirectComponent, title: '指令' },
  { path: 'opt1', component: Opt1Component, title: 'ng-module' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
