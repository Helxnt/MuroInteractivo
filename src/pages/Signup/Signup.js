import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './css/signup.module.css'
import firebase from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: ""
  });
  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!values.name || !values.lastname || !values.email || !values.password) {
      toast.error('Completa los campos.', {
        position: toast.POSITION.TOP_LEFT
    });
      return;
    }

    try {
      console.log(values);
      firebase.auth().createUserWithEmailAndPassword(values.email, values.password)

        .then((docRef) => {
          firebase.firestore().collection("users").doc(docRef.user.uid).set({
            idUser: docRef.user.uid,
            name: values.name,
            lastname: values.lastname,
            email: values.email,
            password: values.password
          })
          firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
  
          toast.success('Registro completo.', {
            position: toast.POSITION.TOP_LEFT
        });
        setTimeout(() => {
          navigate("/");
        }, 3000)
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.Box}>
        <div className="d-flex justify-content-center">
              <div className="p-2"><h1>Crear Cuenta</h1></div>
          </div>
          <input placeholder="Nombre"
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input placeholder="Apellido"
            onChange={(event) => setValues((prev) => ({ ...prev, lastname: event.target.value }))}
          />
          <input placeholder="Correo electrónico"
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input placeholder="Contraseña" type="password"
            onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
          />
          <div className={styles.footer}>
           
            <button className={styles.btnComponents} onClick={handleSubmission}>Registrarse</button>
            <button className={styles.btnComponents}>
              <span>
                <Link to="/Login">Iniciar Sesion</Link>
              </span>
            </button>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup