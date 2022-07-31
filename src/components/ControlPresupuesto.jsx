import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export const ControlPresupuesto = ({presupuesto, gastos, setGastos,setPresupuesto,setIsValidPresupuesto}) => {


    const [porcentaje, setPorcentaje]=useState(0)
    const [disponible, setDisponible]=useState(0)
    const [gastado, setGastado]=useState(0)



    useEffect(() => {
        const totalGatado = gastos.reduce( (total, gasto) =>gasto.cantidad + total,0 )
        
        const totalDisponible= presupuesto - totalGatado

        // Calcular el porcentaje gastado
        const nuevoPorcentaje =(((presupuesto-totalDisponible)/presupuesto) *100).toFixed(2)

        
        setDisponible(totalDisponible)
        setGastado(totalGatado)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
            
        }, 700);
    },[gastos])


    const formatarCantidad= (cantidad) => {
         return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp=() => {
        const resultado = confirm("Deseas reiniciar presupuesto y gastos")
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }



    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                styles={buildStyles({
                    pathColor:porcentaje > 100 ? '#dc2626' : '#3B82F6' ,
                    trailColor:'#F5F5F5',
                    textColor:porcentaje > 100 ? '#dc2626' : '#3B82F6' 
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
                
                />
            </div>

            <div className='contenido-presupuesto'>
                <button
                        className='reset-app'
                        type='button'
                        onClick={handleResetApp}
                        >
                    Resetear app
                </button>
                <p>
                    <span>Presupuesto: </span>{formatarCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo': ''}`}>
                    <span>Disponible: </span>{formatarCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span>{formatarCantidad(gastado)}
                </p>
            </div>

        </div>
    )
}
