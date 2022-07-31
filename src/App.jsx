import { object } from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'
import { Filtro } from './components/Filtro'
import { Header } from './components/Header'
import { ListadoGasto } from './components/ListadoGasto'
import { Modal } from './components/Modal'
import { generarId } from './helpers/index'
import IconoNuevoGasto from './img/nuevo-gasto.svg'




function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ?JSON.parse(localStorage.getItem("gastos")) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);


    }
  }, [gastoEditar])

  useEffect(()=>{
   localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])



  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
   },[gastos])



   useEffect(()=>{
    if (filtro) {
      // Filtrando gastos por categaria 
      const filtroGastos= gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(filtroGastos)
      
    }
   },[filtro])


  useEffect(()=> {
    const presupuestoLS= Number(localStorage.getItem('presupuesto')) ?? 0;

    if (presupuestoLS > 0 ) {
      setIsValidPresupuesto(true)
      
    }
  },[])


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      // Actulizar
      const gastoActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastoActualizados)
      setGastoEditar({})
    } else {
      // Nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminandoGasto = id => {
    const gastoActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastoActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        setGastos={setGastos}
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtro
            filtro={filtro}
            setFiltro={setFiltro}
            
            
            
            />

            <ListadoGasto
              setGastoEditar={setGastoEditar}
              gastos={gastos}
              eliminandoGasto={eliminandoGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt='icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}

    </div>
  )
}

export default App
