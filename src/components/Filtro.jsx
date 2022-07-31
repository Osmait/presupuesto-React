import React from 'react'

export const Filtro = ({filtro,setFiltro}) => {




    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label>Filtrar Gastos</label>
                    <select
                        value={filtro}    
                        onChange={e => setFiltro(e.target.value)}                
                    >
                        <option value=''>-- Todas las Categorias --</option>
                        <option value='Ahorro'> Ahorro </option>
                        <option value='Comida'> Comida </option>
                        <option value='Casa'> Casa </option>
                        <option value='Gastos'> Gastos varios </option>
                        <option value='Ocio'> Ocio </option>
                        <option value='Salud'> Salud </option>
                        <option value='Suscripciones'> Suscripciones </option>
                    </select>
                </div>
            </form>
        </div>
    )
}
