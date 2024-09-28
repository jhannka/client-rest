import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {LoadingState} from "./redux/loading/loading.state";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  title = 'user-manager-web';
  loading = false;

  constructor(
    private store: Store
  ) {
    this.store.select(LoadingState.getStatus)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        this.loading = res;
      })
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
