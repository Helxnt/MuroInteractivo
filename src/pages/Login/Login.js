import React, { useState } from 'react';
import firebase from '../../firebase'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import styles from './css/login.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      toast.error('Campos vacios', {
        position: toast.POSITION.TOP_LEFT
    });
      return
    }
    try {
      firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      .then((res) => {

          toast.success('Bienvenido', {
            position: toast.POSITION.TOP_LEFT
          });
          setTimeout(() => {
            navigate("/");
          }, 3000)
                    
        }).catch((e) => {
          toast.error('Usuario y/o contraseña incorrectos', {
            position: toast.POSITION.TOP_LEFT
        });
        })
    } catch (error) {
      console.log("Ha ocurrido un error: " + error.message);
    }
  }

  return (
    <div className="App">
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.Box}>
          <div className="d-flex justify-content-center">
              <div className="p-2"><h1>Iniciar Sesión</h1></div>
          </div>
          <input placeholder="Correo electrónico"
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input placeholder="Contraseña" type="password"
            onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
          />
          <div className={styles.footer}>
            <button className={styles.btnComponents} onClick={handleSubmission}>Iniciar Sesion</button>
            <button className={styles.btnComponents}>
            <span>
               <Link to="/Signup">Regístrate</Link>
              </span>
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login