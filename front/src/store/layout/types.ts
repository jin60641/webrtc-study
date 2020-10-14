export interface LayoutState {
  alert: AlertOption,
  drawer: boolean,
}

export enum Actions {
  MAKE_ALERT = 'MAKE_ALERT',
  DISMISS_ALERT = 'DISMISS_ALERT',
  TOGGLE_DRAWER = 'TOGGLE_DRAWER',
}

export const initialState: LayoutState = {
  alert: {
    message: '',
    type: null,
  },
  drawer: true,
};

export interface AlertOption {
  type: AlertType | null,
  message: string,
}

export enum AlertType {
  info = 'info',
  error = 'error',
}
