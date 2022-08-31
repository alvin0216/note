import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectComponent } from './direct/direct.component';
import { UpperDirective } from './direct/upper.directive';
import { FormComponent } from './form/form.component';
import { InteractionComponent } from './interaction/interaction.component';
import { TitleComponent } from './interaction/title/title.component';
import { LifeCycleDemoComponent } from './life-cycle/life-cycle-demo/life-cycle-demo.component';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { OperationModule } from './operation/operation.module';
import { PipeComponent } from './pipe/pipe.component';
import { TestPipe } from './pipe/test.pipe';
import { ServiceChildComponent } from './service-demo/service-child/service-child.component';
import { ServiceDemoComponent } from './service-demo/service-demo.component';
import { CounterComponent } from './template/counter/counter.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TemplateComponent,
    CounterComponent,
    PipeComponent,
    TestPipe,
    LifeCycleComponent,
    LifeCycleDemoComponent,
    InteractionComponent,
    TitleComponent,
    ServiceDemoComponent,
    ServiceChildComponent,
    DirectComponent,
    UpperDirective,
  ],
  // 声明需要用到的类
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OperationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
