import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'

require('moment/locale/es.js');
const localizer = momentLocalizer(moment)

const URIreservas = "http://localhost:8000/reservas/"
const URIobjetos = "http://localhost:8000/objetos/"
const URIusuarios = "http://localhost:8000/usuarios/"

const CompReservaObjeto = () => {
    const {idUser} = useParams()
    const {idObjeto} = useParams()
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
        console.log(usuario)
        setUsuarioActual(usuario)
        getUsuarioActual()
    }

    const [reservas, setReservas] = useState([])
  
    useEffect(() => {
      const obtenerReservas = async () => {
          const respuesta = await axios.get(URIreservas)
          const data = respuesta.data
          setReservas(data)
      }
  
      obtenerReservas()
    }, [])

    const[fechaInicio, setFechaInicio] = useState()
    
    const[fechaFin, setFechaFin] = useState() 

    const reservar = async (e) => {
        e.preventDefault()
        axios.post(URIreservas, {
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            usuarioReserva: idUser,
            objetoReserva: idObjeto
        })
    }

    const eventos = reservas.map(reserva => ({
        id: reserva.id,
        title: (usuarios.find(usuario => reserva.usuarioReserva === usuario.id)).nombreUsuario,
        start: reserva.fechaInicio,
        end: reserva.fechaFin,
        description: objeto.nombre
      }));
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 420 }}
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