import React, { Component } from "react";
import {
  Container,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import PersonAdd from "@material-ui/icons/PersonAdd";
import { consumerFirebase } from "../../server";
import { compose } from "recompose";
import {createUser} from '../../session/action/Sessionaction';
//import { openMensajePantalla } from "../../session/action/SnackbarActions";
import {StateContext} from '../../session/Store';

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

const usuarioInicial = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  rut: "",
  celular: "",
  direccion: "",
  rigion: "",
  comuna: "",
  sexo: "",
};

class RegisterUser extends Component {
  static contextType = StateContext;

  handleChange = (event) => {};

  state = {
    firebase: null,
    usuario: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      rut: "",
      celular: "",
      direccion: "",
      rigion: "",
      comuna: "",
      sexo: "",
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
    let usuario = Object.assign({}, this.state.usuario);
    usuario[e.target.name] = e.target.value;
    this.setState({
      usuario: usuario,
    });
  };

  registerUser = async e => {
    e.preventDefault();
    const [{sesion}, dispatch] = this.context;
        const {firebase, usuario} = this.state;

        let callback = await createUser(dispatch, firebase, usuario);
        if(callback.status){
            this.props.history.push("/")
        }else{
          //  openMensajePantalla(dispatch,{
          //      open : true,
          //      mensaje : callback.mensaje.message
          //  }) 
        }
  };
  render() {
    return (
      <Container maxWidth="md">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de Usuario
          </Typography>
          <form style={style.form}>
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <TextField
                  name="nombre"
                  onChange={this.onChange}
                  value={this.state.usuario.nombre}
                  fullWidth
                  label="Ingrese su nombre"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="apellido"
                  onChange={this.onChange}
                  value={this.state.usuario.apellido}
                  fullWidth
                  label="Ingrese su(s) Apellido"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="rut"
                  onChange={this.onChange}
                  value={this.state.usuario.rut}
                  fullWidth
                  label="Ingrese su Rut"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="email"
                  onChange={this.onChange}
                  value={this.state.usuario.email}
                  fullWidth
                  label="Ingrese su Correo electronico"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  type="password"
                  onChange={this.onChange}
                  value={this.state.usuario.password}
                  name="password"
                  fullWidth
                  label="Ingrese su Contraseña"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  type="password"
                  onChange={this.onChange}
                  name="confirPassword"
                  fullWidth
                  label="Confirme su Contraseña"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <RadioGroup aria-label="gender" name="gender1" value="Female">
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Mujer"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Hombre"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Grid container jsutify="center">
              <Grid item md={6} xs={12}>
                <Button
                  type="submit"
                  onClick={this.registerUser}
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

export default compose(consumerFirebase)(RegisterUser);
