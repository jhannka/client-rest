export class Login {
  static readonly type = '[Auth] Login';

  constructor( public payload: { email: string; password: string } ) {
  }
}

export class InfoUser {
  static readonly type = '[Auth] Info User';

  constructor(  ) {
  }
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
