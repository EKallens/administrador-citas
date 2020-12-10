import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Formulario = ({crearCita}) => {

    let mensaje, tipo;

    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //Función que se ejecuta cada vez que el usuario escribe en algún input
    const handleChange = e => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value // e.target.name = mascota, propietario, fecha, hora, sintomas
        });
    }

    const handleSubmit = e => {
        
        e.preventDefault();
        //Validar datos del formulario
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            toast.error('Debes completar todos los campos!');
            return;
        }

        cita.id = uuidv4();

        //Envío la cita creada a la función crearCita la cual la agrega al state 'setCitas'
        crearCita(cita)

        //Reiniciar el formulario
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });

        toast.success('Cita agregada!');
    }

    //Destructuración del objecto cita para enviar al value todo lo extraído
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    return (
        <>  
            <h3>Crear Cita</h3>
            <form onSubmit={handleSubmit}>
                <label>Crear Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={ handleChange }
                    value={ mascota }
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño"
                    onChange={ handleChange }
                    value={ propietario }
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={ handleChange }
                    value={ fecha }
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={ handleChange }
                    value={ hora }
                />
                <label>Síntomas</label>
                <textarea
                    name="sintomas" 
                    className="u-full-width"
                    maxLength="300"
                    onChange={ handleChange }
                    value={ sintomas }>
                </textarea>
                <button 
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita
                </button>
            </form>
        </>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario
