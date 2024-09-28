import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngxs/store";
import {UserDeleteAction, UserGetAction, UserShowAction} from "../../../../redux/user/user.actions";
import {IUser} from "../../../../core/interfaces/user.interfaces";
import {GetContextMenuItemsParams, GridOptions, RowDoubleClickedEvent} from "ag-grid-community";
import {UserState} from "../../../../redux/user/user.state";
import {MatDialog} from "@angular/material/dialog";
import {UserManagementComponent} from "../user-management/user-management.component";
import {SweetAlertHelper} from "../../../../utils/helpers/sweet-alert-helper.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  gridOptions: GridOptions = {};
  rowData: IUser[] = [];

  constructor(
    private store: Store,
    public dialogForm: MatDialog,
    private sweetAlertHelper: SweetAlertHelper,
  ) {
    this.store.dispatch(new UserGetAction);
    this.loadGrid();
  }

  ngOnInit(): void {
    this.store.select(UserState.get)
      .pipe(takeUntil(this.destroy))
      .subscribe((res: IUser[]) => {
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
          headerName: 'Cedula',
          field: "identification_card"
        },
        {
          headerName: 'Nombre',
          field: "names",
          width: 180,
        },
        {
          headerName: 'Apellidos',
          field: "last_name",
          width: 180,
        },
        {
          headerName: 'Fecha Nacimiento',
          field: "birth_date",
          width: 180,
        },
        {
          headerName: 'Correo',
          field: 'email',
          width: 180,
        },
        {
          headerName: 'Salario',
          field: "salary",
          width: 120,
        },
        {
          headerName: 'Area',
          field: "department.names",
          width: 220,
        },
      ],
      onRowDoubleClicked: (event: RowDoubleClickedEvent) => {
        if (event && event.data && event.data.id) {
          this.store.dispatch(new UserShowAction(event.data.id));
          this.onNew();
        }
      },
      getContextMenuItems: (params: GetContextMenuItemsParams) => {
        const {node} = params;
        const user = node?.data.id;

        return [
          {
            name: 'Elimina Usuario',
            icon: '',
            action: () => {
              this.deleteUser(user);
            },
          },
          'separator',
          'export',
        ];
      }
    };
    this.rowData = [];
  }

  onNew() {
    this.dialogForm.open(UserManagementComponent, {
      width: '800px',
      height: '260'
    }).afterClosed()
      .pipe(takeUntil(this.destroy))
      .subscribe(result => {
        if (result?.saved) {
          this.store.dispatch(new UserGetAction);
        }
      });
  }

  deleteUser(user: number) {
    this.sweetAlertHelper.createCustomAlert({
      title: '¿Seguro que desea eliminar este usuario?',
      text: 'Eliminar Usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((res) => {
      if (res.value) {
        this.store.dispatch(new UserDeleteAction(user));
        this.store.dispatch(new UserGetAction);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
