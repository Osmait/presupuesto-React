import React from 'react'
import { Gasto } from './Gasto'

export const ListadoGasto = ({
  gastos,
  setGastoEditar,
  eliminandoGasto,
  gastosFiltrados,
  filtro
}) => {
  return (
    <div className='listado-gastos contenedor'>



      {
        filtro ?
          <>
            <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay Gastos en esta categoria'}</h2>
            {gastosFiltrados.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminandoGasto={eliminandoGasto}
              />
            ))}
          </>
          : (
            <>
            <h2>{gastos.length ? 'Gastos' : 'No hay Gastos aun'}</h2>
            {gastos.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminandoGasto={eliminandoGasto}
              />
            ))}
            </>
          )
      }


    </div>
  )
}
