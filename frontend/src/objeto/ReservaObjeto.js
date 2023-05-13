import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'

require('moment/locale/es.js');
const localizer = momentLocalizer(moment)


const URIreservas = "https://interfaces-vsr.herokuapp.com/reservas/"
const URIobjetos = "https://interfaces-vsr.herokuapp.com/objetos/"
const URIusuarios = "https://interfaces-vsr.herokuapp.com/usuarios/"

const CompReservaObjeto = () => {
    const {idUser} = useParams()
    const {idObjeto} = useParams()
    const [error, setError] = useState(null)

    const [showConfirmation, setShowConfirmation] = useState(false);

    const [objeto, setObjeto] = useState('')
    useEffect( () => {
        getObjeto()
    }, '')

    const getObjeto = async () => {
        const res = await axios.get(URIobjetos+idObjeto)
        const objeto = res.data
        setObjeto(objeto)
    }

    const [usuarios, setUsuarios] = useState([])
    useEffect( () => {
        getUsuario()
    },[])

    const getUsuario = async () => {
        const res = await axios.get(URIusuarios)
        const usuario = res.data
        setUsuarios(usuario)
    }

    const [usuarioActual, setUsuarioActual] = useState('')
    useEffect( () => {
        getUsuarioActual()
    },'')

    const getUsuarioActual = async () => {
        const res = await axios.get(URIusuarios+idUser)
        const usuario = res.data
        setUsuarioActual(usuario)
    }

    const [reservas, setReservas] = useState([])
  
    useEffect(() => { 
        obtenerReservas() 
    },[])
      const obtenerReservas = async () => {
          const respuesta = await axios.get(URIreservas)
          const data = respuesta.data

        /**
         * Aqui filtro para que en el calendario solo se muestren las reservas futuras, ya que es lo
         * que le interesa al usuario. Las reservas del pasado son irrelevantes.
         * Tambien filtro para que solo me muestre las reservas de mi objeto
         * 
         */
        let reserv = data.filter(reserva => moment(reserva.fechaInicio).isSameOrAfter(moment().startOf('day')) && reserva.objetoReserva == idObjeto)

        setReservas(reserv)
      }
      

    const[fechaInicio, setFechaInicio] = useState()
    
    const[fechaFin, setFechaFin] = useState() 

    const reservar = async (e) => {
        e.preventDefault()

        if (!checkFechas(fechaInicio,fechaFin)){
            if(moment(fechaInicio).isSameOrAfter(moment().startOf('day')) && moment(fechaInicio).isBefore(moment(fechaFin)) && (!coincide(fechaInicio, fechaFin))) {     //La fecha inicio es posterior a la actual
                setShowConfirmation(true);
            } else {
                setError('Seleccione una fecha de reserva válida')
            }
        }else{
                setError('Seleccione una fecha de reserva válida')
        }

        
    }

    function coincide(inicio, fin) {
        let coincide = false

        /**
         * Comparo primero que no coincida por el inicio
         * Despues comparo que no coincidan por el final
         * Me falta comparar que no sean exactamente la misma fecha
         */
        reservas.forEach(reserva => {
            if( moment(reserva.fechaInicio).isSameOrBefore(moment(inicio)) && moment(inicio).isSameOrBefore(moment(reserva.fechaFin)) ||
                moment(reserva.fechaInicio).isSameOrBefore(moment(fin)) && moment(fin).isSameOrBefore(moment(reserva.fechaFin))) {
                coincide = true
            }
        })
        return coincide
    }

    const eventos = reservas.map(reserva => ({
        id: reserva.id,
        title: (usuarios.find(usuario => reserva.usuarioReserva === usuario.id)).nombreUsuario,
        start: reserva.fechaInicio,
        end: reserva.fechaFin,
        description: objeto.nombre
      }));

    function checkFechas(fechaInicio, fechaFin){
        return !fechaInicio || !fechaFin;
      }


  return (
    <div className='mt-3'>
            <div className="row">
                <div className="col">
                    <h1 tabIndex="0">CALENDARIO RESERVAS</h1>
                </div>
            </div>
        <div className="calendar-container">
            <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            className={'REACT-CALENDAR p-2'}
            view='month'
            style={{ height: '55vh', backgroundColor: 'white'}}
            tabIndex={-1}
            id="calendar"
            title="Calendario"
            />
        </div>
      
      <form onSubmit={reservar}>
        <div className="mb-3">
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                <label className='form-label' tabIndex="0" htmlFor="fechaInicio">Fecha inicio</label>
                    <input
                        id="fechaInicio"
                        defaultValue ={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        type="date"
                        className={`form-control ${error ? 'error' : ''}`}
                        aria-label="Ingrese la fecha de inicio de la reserva"
                        title="Fecha de inicio"
                    />
                </div>
                <div className='col-md-3'></div>
            </div>
            
        </div>
        <div className="mb-3">
            <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <label className='form-label' tabIndex="0" htmlFor="fechaFin">Fecha fin</label>
                            <input
                                id="fechaFin"
                                defaultValue ={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                type="date"
                                className={`form-control ${error ? 'error' : ''}`}
                                aria-label="Ingrese la fecha de fin de la reserva"
                                title="Fecha de fin"
                            />
                    </div>
                    <div className='col-md-3'></div>
            </div>


        
        </div>
        <button type="submit" className='btn mb-2 primario' tabIndex="0" aria-label="Botón de reserva" title="Reservar objeto">Reservar</button>
        {error && (
            <div className='row'>
                <div className='col'>
                    <div className='alert alert-danger' role='alert'>
                        {error}
                    </div>
                </div>
            </div>
        )}
      </form>
                {showConfirmation && (
                <div className="popup-container">
                    <div className="popup">
                    <p>¿Estás seguro de que deseas realizar la reserva?</p>
                    <div className="popup-buttons">
                        <button
                        className="btn mb-2 primario" tabIndex="0" aria-label="Confirmar reserva" title="Confirmar la reserva"
                        onClick={() => {
                            // Realizar la reserva
                            axios
                            .post(URIreservas, {
                                fechaInicio: fechaInicio,
                                fechaFin: fechaFin,
                                usuarioReserva: idUser,
                                objetoReserva: idObjeto,
                            })
                            .then(() => {
                                window.location.reload();
                            })
                            .catch((error) => {
                                // Manejar el error de la reserva
                                setError('Error al realizar la reserva');
                            });

                            // Cerrar el popup de confirmación
                            setShowConfirmation(false);
                        }}
                        >
                        Confirmar
                        </button>
                        <button
                        className="btn mb-2 rojo" tabIndex="0" aria-label="Cancelar reserva" title="Cancelar la reserva"
                        onClick={() => {
                            // Cerrar el popup de confirmación
                            setShowConfirmation(false);
                        }}
                        >
                        Cancelar
                        </button>
                    </div>
                    </div>
                </div>
                )}
    </div>
  )
}

export default CompReservaObjeto