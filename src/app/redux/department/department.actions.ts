import {IDepartment} from "../../core/interfaces/department";

export class DepartmentGetAction {
  static readonly type = '[Department] Get  item';

}

export class DepartmentShowAction {
  static readonly type = '[Department] show item';

  constructor(public id: number) {
  }
}

export class DepartmentCreateAction {
  static readonly type = '[Department] create item';

  constructor(public data: IDepartment) {
  }
}

export class DepartmentUpdateAction {
  static readonly type = '[Department] update item';

  constructor(public data: IDepartment) {
  }
}

export class DepartmentDeleteAction {
  static readonly type = '[Department] delete item';

  constructor(public id: number) {
  }
}

export class ResetDepartmentAction {
  static readonly type = '[Department] reset items';

}
