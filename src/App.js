import React, { useState, useEffect } from 'react';
import Cita from './components/Cita';
import Formulario from "./components/Formulario";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if(!citasIniciales){
    citasIniciales = [];
  }

  const [citas, setCitas] = useState(citasIniciales);

  useEffect( () => {

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas));
    } else{
      localStorage.setItem('citas',JSON.stringify([]));
    }

  }, [citas])


  const crearCita = (cita) => {
    setCitas([
      ...citas, 
      cita
    ])
  }

  const eliminarCita = (id) => {
    const citasFiltradas = citas.filter( cita => cita.id !== id);
    setCitas(citasFiltradas);
    toast.warning('Cita eliminada!');
  }

  const titulo = citas.length > 0 ? 'Administra tus citas' : 'No hay citas';

  return (
    <>
      <h1>Administrador de Citas</h1>
      <div className="container">
        <div className="row">
          <div className="four columns">
            <Formulario crearCita={crearCita}/>
          </div>
          <div className="eight columns">
            <h3>{titulo}</h3>
            { citas.map( (cita) => 
              <Cita
                key={cita.id} 
                cita={cita}
                eliminarCita={eliminarCita}
                />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
