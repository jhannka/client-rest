import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { StartLoadingAction, StopLoadingAction } from "./loading.actions";

interface LoadingStateModel {
  loading: boolean;
}

const defaults = {
  loading: false,
};

@State<LoadingStateModel>( {
  name: 'loading',
  defaults
} )
@Injectable()
export class LoadingState {

  @Selector()
  static getStatus( state: LoadingStateModel ) {
    return state.loading;
  }

  @Action( StartLoadingAction )
  startLoading( ctx: StateContext<LoadingStateModel> ) {
    ctx.patchState( { loading: true } );
  }

  @Action( StopLoadingAction )
  stopLoading( ctx: StateContext<LoadingStateModel> ) {
    ctx.patchState( { loading: false } );
  }
}
