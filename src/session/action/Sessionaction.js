//import { auth } from "firebase";

export const iniciarSesion = (dispatch, firebase, email, password) => {
  return new Promise((resolve, eject) => {
    firebase.auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        firebase.db
          .collection("User")
          .doc(auth.user.uid)
          .get()
          .then((doc) => {
            const userDB = doc.data();
            dispatch({
              type: "INICIAR_SESION",
              session: userDB,
              autenticado: true,
            });
            resolve({ state: true });
          });
      })
      .catch((error) => {
        console.log("error", error);
        resolve({ state: false, mensaje: error });
      });
  });
};

export const createUser = (dispatch, firebase, user) => {
  return new Promise((resolve, eject) => {
    firebase.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((auth) => {
        firebase.db
          .collection("User")
          .doc(auth.user.uid)
          .set(
            {
              id: auth.user.uid,
              email: user.email,
              nombre: user.nombre,
              apellido: user.apellido
            },
            { merge: true }
          )
          .then((doc) => {
            user.id = auth.user.uid;
            dispatch({
              type: "INICIAR_SESION",
              session: user,
              autenticado: true,
            });
            resolve({status :true});
          });
      })
      .catch(error=>{
        console.log('error',error);
        resolve({status :false , mensaje: error})
      })
  });
};


export const salirSesion = (dispatch, firebase) =>{
        return new Promise((resolve, eject) =>{
            firebase.auth.signOut().then(salir =>{
                dispatch({
                    type:"SALIR_SESSION",
                    nuevoUsuario :{
                        nombre: "",
                        apellido:"",
                        email:"",
                        foto:"",
                        id:"",
                        telefono:""
                    },
                    autenticado:false
                });
                resolve({status : true});
            })
            .catch(error =>{
                console.log('error' , error)
                 resolve({status :false , mensaje: error})
            })
        })
    }
