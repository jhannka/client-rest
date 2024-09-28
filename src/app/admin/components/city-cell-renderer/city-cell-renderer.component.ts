import {Component, OnDestroy} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {Store} from "@ngxs/store";
import {GetCitysAction} from "../../../redux/api-colombia/api-colombia.actions";
import {ApiColombiaState} from "../../../redux/api-colombia/api-colombia.state";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-city-cell-renderer',
  template: `
    <span>{{ cityName }}</span>
  `
})
export class CityCellRendererComponent implements AgRendererComponent, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  params: any;
  cityName: string | undefined;

  constructor(private store: Store) {
    this.store.dispatch(new GetCitysAction());
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.searchCity(params.value);
  }

  refresh(params: ICellRendererParams<any>): boolean {
    this.params = params;
    this.searchCity(params.value);
    return true;
  }

  searchCity(cityCode: any) {
    this.store
      .select(ApiColombiaState.getCitys)
      .pipe(takeUntil(this.destroy))
      .subscribe((cities) => {
        if (cities) {
          const city = cities.find(city => city.id === cityCode);
          if (city) {
            this.cityName = city.name;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
