import React, { Component } from "react";
import {
  Container,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import PersonAdd from "@material-ui/icons/PersonAdd";
import { consumerFirebase } from "../../server";
import { compose } from "recompose";
//import { createUser } from "../../session/action/Sessionaction";
//import { openMensajePantalla } from "../../session/action/SnackbarActions";
import { StateContext } from "../../session/Store";
import ImageUploader from "react-images-upload";

const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItmes: "center",
  },
  avatar: {
    margin: 8,
    backgroundColor: "#4caf50",
  },
  form: {
    width: "100%",
    marginTop: 10,
  },
  submit: {
    marginTop: 15,
    marginBottom: 20,
  },
};

const lotInicial = {
  marca: "",
  modelo: "",
  año: "",
  combustible: "",
  cilindrada: "",
  transmision: "",
};

class RegisterLot extends Component {
  static contextType = StateContext;

  handleChange = (event) => {};

  state = {
    firebase: null,
    lot: {
      marca: "",
      modelo: "",
      año: "",
      combustible: "",
      cilindrada: "",
      transmision: "",
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.firebase === prevState.firebase) {
      return null;
    }
    return {
      firebase: nextProps.firebase,
    };
  }

  onChange = (e) => {
    let lot = Object.assign({}, this.state.lot);
    lot[e.target.name] = e.target.value;
    this.setState({
      lot: lot,
    });
  };

  registerLot = (e) => {
    e.preventDefault();
    const { lot, firebase } = this.state;

    firebase.db
      .collection("Lot")
      .add(lot)
      .then((lotfter) => {
        console.log("exito");
        // this.setState({
        //   lot: lotInicial,
        // });
        // this.props.history.push("/listLot")
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  render() {
    let imagenKey = 'test';
    return (
      <Container maxWidth="md">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de lote
          </Typography>
          <form style={style.form}>
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <TextField
                  name="marca"
                  onChange={this.onChange}
                  value={this.state.lot.marca}
                  fullWidth
                  label="Ingrese su marca"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="modelo"
                  onChange={this.onChange}
                  value={this.state.lot.modelo}
                  fullWidth
                  label="Ingrese modelo"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="año"
                  onChange={this.onChange}
                  value={this.state.lot.año}
                  fullWidth
                  label="Ingrese año"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="combustible"
                  onChange={this.onChange}
                  value={this.state.lot.combustible}
                  fullWidth
                  label="Ingrese combustible"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  onChange={this.onChange}
                  value={this.state.lot.cilindrada}
                  name="cilindrada"
                  fullWidth
                  label="Ingrese cilindrada"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  onChange={this.onChange}
                  value={this.state.lot.transmision}
                  name="transmision"
                  fullWidth
                  label="Ingrese Transmisión"
                />
              </Grid>
              <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <ImageUploader
                key={imagenKey}
                withIcon={true}
                buttonText="Seleccione imagenes"
                onChange={this.subirFotos}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                maxFileSize={5242880}
              />
            </Grid>
          </Grid>
            </Grid>
            <Grid container jsutify="center">
              <Grid item md={6} xs={12}>
                <Button
                  type="submit"
                  onClick={this.registerLot}
                  variant="contained"
                  fullWidth
                  size="large"
                  color="primary"
                  style={style.submit}
                >
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default compose(consumerFirebase)(RegisterLot);
