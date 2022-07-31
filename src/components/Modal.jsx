import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import cerrarBtn from '../img/cerrar.svg'
import { Mensaje } from './Mensaje'

export const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id,setId] = useState('')



    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        

        }
    }, [])


    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(() => {
            setModal(false)
        }, 500);

    }

    const handelSubmit = e => {
        e.preventDefault()
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }
        guardarGasto({ nombre, cantidad, categoria,id,fecha })
    }




    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={cerrarBtn}
                    alt='cerrar modal'
                    onClick={ocultarModal}
                />
            </div>

            <form
                onSubmit={handelSubmit}
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
                <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor='nombre'>Nombre Gasto</label>

                    <input
                        id='nombre'
                        type='text'
                        placeholder='Añadir Nombre del Gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}

                    />
                </div>

                <div className='campo'>
                    <label htmlFor='cantidad'> Cantidad</label>

                    <input
                        id='cantidad'
                        type='number'
                        placeholder='Añadir La cantidad del Gasto Ej.300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}

                    />
                </div>

                <div className='campo'>
                    <label htmlFor='nombre'> Categoria</label>

                    <select id='categoria'
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value=''>-- Selecione --</option>
                        <option value='Ahorro'> Ahorro </option>
                        <option value='Comida'> Comida </option>
                        <option value='Casa'> Casa </option>
                        <option value='Gastos'> Gastos varios </option>
                        <option value='Ocio'> Ocio </option>
                        <option value='Salud'> Salud </option>
                        <option value='Suscripciones'> Suscripciones </option>
                    </select>
                </div>
                <input type='submit'
                    value={gastoEditar.nombre ? "Guardar Cambios " : "Añadir Gasto"}

                />
            </form>
        </div>
    )
}
