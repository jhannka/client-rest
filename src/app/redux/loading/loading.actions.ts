export class StartLoadingAction {
  static readonly type = '[Loading] true item';

  constructor() {
  }
}

export class StopLoadingAction {
  static readonly type = '[Loading] false item';

  constructor() {
  }
}
