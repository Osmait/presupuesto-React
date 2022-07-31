import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { formatearFecha } from '../helpers/index'

import IconoAhorro from '../img/icono_ahorro.svg'
import Iconocasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'
import IconoGastos from '../img/icono_gastos.svg'

const diccionarioIconos = {
    Ahorro: IconoAhorro,
    Comida: IconoComida,
    Casa: Iconocasa,
    Gastos: IconoGastos,
    Ocio: IconoOcio,
    Salud: IconoSalud,
    Suscripciones: IconoSuscripciones

}
export const Gasto = ({ gasto ,setGastoEditar,eliminandoGasto}) => {

    const { categoria, nombre, cantidad, id, fecha } = gasto

    const leadingActions= ()=>(
        <LeadingActions>
            <SwipeAction onClick={()=> setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions= ()=>(
        <TrailingActions>
            <SwipeAction 
                    onClick={()=> eliminandoGasto(id)}
                    destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )



    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>

                    <div className='contenido-gasto'>
                        <img
                            src={diccionarioIconos[categoria]}
                            alt='Icono Gasto'
                        />
                        <div className='descripcion-gasto'>
                            <p className='categoria'>{categoria} </p>
                            <p className='nombre-gasto'>{nombre}</p>
                            <p className='fecha-gasto'>
                                Agregado el:{''}
                                <span>{formatearFecha(fecha)}</span>
                            </p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>${cantidad}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
