import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-life-cycle-demo',
  templateUrl: './life-cycle-demo.component.html',
  styleUrls: ['./life-cycle-demo.component.scss'],
})
export class LifeCycleDemoComponent implements OnInit {
  @Input() count!: number;

  logs: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.logs.push(`ngOnChanges ${JSON.stringify(changes)}`);
  }

  ngOnInit(): void {
    this.logs.push('ngOnInit');
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.logs.push('ngDoCheck');
  }

  ngAfterContentInit(): void {
    this.logs.push('ngAfterContentInit');
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }

  ngAfterContentChecked(): void {
    this.logs.push('ngAfterContentChecked');
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
  }

  ngAfterViewInit(): void {
    this.logs.push('ngAfterViewInit');
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  ngAfterViewChecked(): void {
    this.logs.push('ngAfterViewChecked');
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
  }

  ngOnDestroy(): void {
    this.logs.push('ngOnDestroy');
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
