import {IResetPassword, IUser} from "../../core/interfaces/user.interfaces";

export class UserGetAction {
  static readonly type = '[User] Get item';

  constructor() {
  }
}

export class UserShowAction {
  static readonly type = '[User] Show item';

  constructor(public id: number) {
  }
}

export class UserAddAction {
  static readonly type = '[User] Add item';

  constructor(public data: IUser) {
  }
}

export class UserUpdateAction {
  static readonly type = '[User] Update item';

  constructor(public data: IUser) {
  }
}

export class UserDeleteAction {
  static readonly type = '[User] Delete item';

  constructor(public id: number) {
  }
}

export class ResetUserStateAction {
  static readonly type = '[User] reset items';

  constructor() {
  }
}

export class ResetPasswordStateAction {
  static readonly type = '[User] reset password';

  constructor(public data: IResetPassword) {
  }
}
