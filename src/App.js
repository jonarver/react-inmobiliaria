import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Snackbar } from "@material-ui/core";
import "./App.css";
import ListProperty from "./component/view/Listproperty";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNavbar from "./component/layout/AppNavbar";
import MuithemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme/theme";
import RegisterUser from "./component/seguridad/RegisterUser";
import RegisterLot from "./component/view/RegisterLot";
import Login from "./component/seguridad/Login";
import { FirebaseContext } from "./server";
import { useStateValue } from "./session/Store"


function App(props) {

  let firebase = React.useContext( FirebaseContext );
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);

  const [{ openSnackbar }, dispatch] = useStateValue();  

  useEffect(() => {
    firebase.estadoIniciado().then((val) => {
      setupFirebaseInicial(val);
    });
  });

  return autenticacionIniciada !== false ? (
    <React.Fragment>
    <Snackbar
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    open = {openSnackbar ? openSnackbar.open : false}
    autoHideDuration={3000}
    ContentProps=
    {{
      "aria-describedby": "message-id",
    }}
    message=
    {
      <span id="message-id">
        {openSnackbar ? openSnackbar.mensaje : ""}
      </span>
    }
    onClose=
    {() =>
      dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: false,
          mensaje: "",
        },
      })
    }
    >

    </Snackbar>
      <Router>
        <MuithemeProvider theme={theme}>
          <AppNavbar />
          <Grid container>
            <Switch>
              <Route path="/" exact component={ListProperty} />
              <Route path="/registerUser" exact component={RegisterUser} />
              <Route path="/login" exact component={Login} />
              <Route path="/admin/registerLot" exact component={RegisterLot} />
            </Switch>
          </Grid>
        </MuithemeProvider>
      </Router>
      </React.Fragment>
  ):null;
}

export default App;
