import {Component, OnDestroy} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngxs/store";
import {GetCitysAction, GetDepartamentAction} from "../../../redux/api-colombia/api-colombia.actions";
import {ICellRendererParams} from "ag-grid-community";
import {ApiColombiaState} from "../../../redux/api-colombia/api-colombia.state";

@Component({
  selector: 'app-depar-tament-cell-renderer',
  template: `
    <span>{{ departamentName }}</span>
  `
})
export class DeparTamentCellRendererComponent implements AgRendererComponent, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  params: any;
  departamentName: string | undefined;

  constructor(private store: Store) {
    this.store.dispatch(new GetDepartamentAction());
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.searchDepartament(params.value);
  }

  refresh(params: ICellRendererParams<any>): boolean {
    this.params = params;
    this.searchDepartament(params.value);
    return true;
  }

  searchDepartament(cityCode: any) {
    this.store
      .select(ApiColombiaState.getDepartament)
      .pipe(takeUntil(this.destroy))
      .subscribe((cities) => {
        if (cities) {
          const city = cities.find(city => city.id === cityCode);
          if (city) {
            this.departamentName = city.name;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
