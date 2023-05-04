import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useParams, Link, useNavigate, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'

require('moment/locale/es.js');
const localizer = momentLocalizer(moment)
const fechaActual = moment().toDate()


const URIreservas = "https://interfaces-vsr.herokuapp.com/reservas/"
const URIobjetos = "https://interfaces-vsr.herokuapp.com/objetos/"
const URIusuarios = "https://interfaces-vsr.herokuapp.com/usuarios/"

const CompReservaObjeto = () => {
    const {idUser} = useParams()
    const {idObjeto} = useParams()
    const [error, setError] = useState(null)

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

        if(moment(fechaInicio).isSameOrAfter(moment().startOf('day')) && moment(fechaInicio).isBefore(moment(fechaFin)) && (!coincide(fechaInicio, fechaFin))) {     //La fecha inicio es posterior a la actual
            axios.post(URIreservas, {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                usuarioReserva: idUser,
                objetoReserva: idObjeto
            })
            window.location.reload()
        } else {
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

  return (
    <div className='mt-3'>
            <div className="row">
                <div className="col">
                    <h1 tabindex="0">CALENDARIO RESERVAS</h1>
                </div>
            </div>
        <div className="calendar-container">
            <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 385, backgroundColor: 'white'}}
            tabindex="-1"
        />
        </div>
      
      <form onSubmit={reservar}>
        <div className="mb-3">
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                <label className='form-label' tabindex="0">Fecha inicio</label>
                    <input
                        value={fechaInicio}
                        onChange={ (e) => setFechaInicio(e.target.value)}
                        type="date"
                        className="form-control"
                        aria-label="Ingrese la fecha de inicio de la reserva"
                    />
                </div>
                <div className='col-md-3'></div>
            </div>
            
        </div>
        <div className="mb-3">
            <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <label className='form-label' tabindex="0">Fecha fin</label>
                            <input
                                value={fechaFin}
                                type="date"
                                onChange={ (e) => setFechaFin(e.target.value)}
                                className="form-control"
                                aria-label="Ingrese la fecha de fin de la reserva"
                            />
                    </div>
                    <div className='col-md-3'></div>
            </div>


        
        </div>
        <button type="submit" className='btn mb-2 primario' tabindex="0">Reservar</button>
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
    </div>
  )
}

export default CompReservaObjeto