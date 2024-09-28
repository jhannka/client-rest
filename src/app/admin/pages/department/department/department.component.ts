import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {GetContextMenuItemsParams, GridOptions, RowDoubleClickedEvent} from "ag-grid-community";
import {IDepartment} from "../../../../core/interfaces/department";
import {Store} from "@ngxs/store";
import {MatDialog} from "@angular/material/dialog";
import {SweetAlertHelper} from "../../../../utils/helpers/sweet-alert-helper.service";
import {
  DepartmentDeleteAction,
  DepartmentGetAction,
  DepartmentShowAction
} from "../../../../redux/department/department.actions";
import {DepartmentState} from "../../../../redux/department/department.state";
import {DepartmentManagementComponent} from "../department-management/department-management.component";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  gridOptions: GridOptions = {};
  rowData: IDepartment[] = [];

  constructor(
    private store: Store,
    public dialogForm: MatDialog,
    private sweetAlertHelper: SweetAlertHelper,
  ) {
    this.store.dispatch(new DepartmentGetAction);
    this.loadGrid();
  }

  ngOnInit(): void {
    this.store.select(DepartmentState.get)
      .pipe(takeUntil(this.destroy))
      .subscribe((res: IDepartment[]) => {
        if (res.length > 0) {
          this.rowData = res;
        }
      })
  }

  loadGrid() {
    this.gridOptions = <GridOptions>{
      sortingOrder: ['desc', 'asc', null],
      columnDefs: [
        {
          headerName: 'Codigo',
          field: "code"
        },
        {
          headerName: 'Nombre',
          field: "names",
          width: 180,
        },
        {
          headerName: 'lider',
          field: "lead",
          width: 180,
        },
      ],
      onRowDoubleClicked: (event: RowDoubleClickedEvent) => {
        if (event && event.data && event.data.id) {
          this.store.dispatch(new DepartmentShowAction(event.data.id));
          this.onNew();
        }
      },
      getContextMenuItems: (params: GetContextMenuItemsParams) => {
        const {node} = params;
        const user = node?.data.id;

        return [
          {
            name: 'Elimina area',
            icon: '',
            action: () => {
              this.delete(user);
            },
          },
          'separator',
          'export',
        ];
      }
    };
    this.rowData = [];
  }


  delete(user: number) {
    this.sweetAlertHelper.createCustomAlert({
      title: '¿Seguro que desea eliminar esta area?',
      text: 'Eliminar area',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((res) => {
      if (res.value) {
        this.store.dispatch(new DepartmentDeleteAction(user));
        this.store.dispatch(new DepartmentGetAction);
      }
    });
  }

  onNew() {
    this.dialogForm.open(DepartmentManagementComponent, {
      width: '800px',
      height: '260'
    }).afterClosed()
      .pipe(takeUntil(this.destroy))
      .subscribe(result => {
        if (result?.saved) {
          this.store.dispatch(new DepartmentGetAction);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
