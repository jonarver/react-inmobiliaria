import sesionReducer from './SesionReducer';
import openSnackbarReducer from './openSnackbarReducer';

export const mainReducer = ({sesion, openSnackbar}, action) => {
    return {
        sesion : sesionReducer(sesion, action),
        openSnackbar : openSnackbarReducer(openSnackbar, action)
    }
}