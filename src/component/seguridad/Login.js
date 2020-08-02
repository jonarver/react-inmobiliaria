import React, { Component } from 'react';
import {  Container , Avatar , Typography, TextField, Button } from '@material-ui/core';
import LockoutLineIcon from '@material-ui/icons/LockOutlined';
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';
import { StateContext } from '../../session/Store';
import { iniciarSesion } from '../../session/action/Sessionaction'
//import { openMensajePantalla } from "../../session/action/SnackbarActions";

const style ={
    paper :{
        marginTop: 9,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar :{
        margin: 5,
        backgroundColor: "red"
    },
    form:{
        width: "100%",
        marginTop: 10
    }
}

class Login extends Component {
    static contextType = StateContext;

    state ={
        firebase: null,
         user:{
             email: '',
             password:''
         }   
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.firebase === prevState.firebase ){
            return null;
        }
        return {
            firebase: nextProps.firebase
        }
    }

    onChange = e =>{
        let user =Object.assign({}, this.state.user);
        user[e.target.name] = e.target.value;
        this.setState({
            user: user
        })
    }


    login = async e => {
        e.preventDefault();
        const [{session},dispatch] = this.context;
        console.log(this.context.dispatch)
        //const [dispatch] = this.context;
        const { firebase, user } = this.state;
        const {email, password} = user;
        let callback = await iniciarSesion(dispatch, firebase, email, password)
        if (callback.state){
            this.props.history.push('/');
        }else{
            // openMensajePantalla(dispatch,{
            //     open : true,
            //     mensaje : callback.mensaje.message
            // })
        }


    }
    
    render() {
        return (
            <Container maxWidth="xs" >
                <div style={style.paper}>
                    <Avatar style={ style.avatar} >
                        <LockoutLineIcon />
                    </Avatar>  
                    <Typography component="h1" variant="h5">
                            Ingrese user
                    </Typography>
                    <form style={style.form}>
                        <TextField
                        variant="outlined"
                        label="Email"
                        name="email"
                        fullWidth
                        margin="normal"
                        onChange = {this.onChange}
                        value = {this.state.user.email}
                         />
                        <TextField
                            variant="outlined"
                             label="password"
                             type="password"
                             name="password"
                             fullWidth
                             margin="normal"
                             onChange = {this.onChange}
                             value = {this.state.user.password}
                         />
                         <Button 
                         type="submit"
                         fullWidth
                         variant="contained"
                         color="primary"
                         margin="normal"
                         onClick={this.login}
                         >
                             Login
                         </Button> 
                         <Button 
                         type="submit"
                         fullWidth
                         variant="contained"
                         color="white"
                         margin="normal"
                         onClick={this.login}
                         >
                             Registrase
                         </Button>  
                    </form>
                </div>
            </Container>
        );
    }
}

export default compose(consumerFirebase)(Login);