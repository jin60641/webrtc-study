export interface LayoutState {
  drawer: DrawerOption,
  alert: AlertOption,
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
  drawer: {
    isOpen: false,
  },
};

export interface DrawerOption {
  isOpen: boolean,
}

export interface AlertOption {
  type: AlertType | null,
  message: string,
}

export enum AlertType {
  info = 'info',
  error = 'error',
}
