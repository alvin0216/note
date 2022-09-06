import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectComponent } from './direct/direct.component';
import { UpperDirective } from './direct/upper.directive';
import { FormComponent } from './form/form.component';
import { AuthInterceptor } from './http-demo/auth.interceptor';
import { HttpDemoComponent } from './http-demo/http-demo.component';
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
    HttpDemoComponent,
  ],
  // 声明需要用到的类
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OperationModule,
  ],
  providers: [
    // 应用级别的使用范围
    {
      // 标识
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
