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

const URIreservas = "http://localhost:8000/reservas/"
const URIobjetos = "http://localhost:8000/objetos/"
const URIusuarios = "http://localhost:8000/usuarios/"

const CompReservaObjeto = () => {
    const {idUser} = useParams()
    const {idObjeto} = useParams()
    const navigate = useNavigate()
    const [objeto, setObjeto] = useState('')
    useEffect( () => {
        getObjeto()
    })

    const getObjeto = async() => {
        const res = await axios.get(URIobjetos+idObjeto)
        const objeto = res.data
        setObjeto(objeto)
        getObjeto()
    }

    const [usuarios, setUsuarios] = useState([])
    useEffect( () => {
        getUsuario()
    },usuarios)

    const getUsuario = async () => {
        const res = await axios.get(URIusuarios)
        const usuario = res.data
        setUsuarios(usuario)
        getUsuario()
    }

    const [usuarioActual, setUsuarioActual] = useState('')
    useEffect( () => {
        getUsuarioActual()
    })

    const getUsuarioActual = async () => {
        const res = await axios.get(URIusuarios+idUser)
        const usuario = res.data
        setUsuarioActual(usuario)
        getUsuarioActual()
    }

    const [reservas, setReservas] = useState([])
  
    useEffect(() => {
      const obtenerReservas = async () => {
          const respuesta = await axios.get(URIreservas)
          const data = respuesta.data

        /**
         * Aqui filtro para que en el calendario solo se muestren las reservas futuras, ya que es lo
         * que le interesa al usuario. Las reservas del pasado son irrelevantes.
         * Tambien filtro para que solo me muestre las reservas de mi objeto
         */
        let reserv = data.filter(reserva => fechaActual < moment(reserva.fechaInicio).toDate() && reserva.objetoReserva == idObjeto)

        setReservas(reserv)
      }
  
      obtenerReservas()
    }, [])

    const[fechaInicio, setFechaInicio] = useState()
    
    const[fechaFin, setFechaFin] = useState() 

    const reservar = async (e) => {
        e.preventDefault()

        if(fechaActual < moment(fechaInicio).toDate() && moment(fechaInicio).isBefore(moment(fechaFin)) && (!coincide(fechaInicio, fechaFin))) {     //La fecha inicio es posterior a la actual
            axios.post(URIreservas, {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                usuarioReserva: idUser,
                objetoReserva: idObjeto
            })
        }

        navigate(`/objeto/${idObjeto}/${idUser}`)
        
    }

    function coincide(inicio, fin) {
        let coincide = false

        /**
         * Comparo primero que no coincida por el inicio
         * Despues comparo que no coincidan por el final
         * Me falta comparar que no sean exactamente la misma fecha
         */
        reservas.forEach(reserva => {
            if( moment(reserva.fechaInicio).isBefore(moment(inicio)) && moment(inicio).isBefore(moment(reserva.fechaFin)) ||
                moment(reserva.fechaInicio).isBefore(moment(fin)) && moment(fin).isBefore(moment(reserva.fechaFin))) {
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
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 420, backgroundColor: 'white'}}
      />
      <form onSubmit={reservar}>
        <div className="mb-3">
        <label className='form-label'>Fecha inicio</label>
                <input
                    value={fechaInicio}
                    onChange={ (e) => setFechaInicio(e.target.value)}
                    type="date"
                    className="form-control"
                />
        </div>
        <div className="mb-3">
        <label className='form-label'>Fecha fin</label>
                <input
                    value={fechaFin}
                    type="date"
                    onChange={ (e) => setFechaFin(e.target.value)}
                    className="form-control"
                />
        </div>
        <button type="submit" className='btn btn-primary'>Reservar</button>
      </form>
    </div>
  )
}

export default CompReservaObjeto