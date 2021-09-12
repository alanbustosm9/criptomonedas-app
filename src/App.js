import styled from '@emotion/styled'
import { useEffect, useState } from 'react';
import axios from 'axios'

import { Formulario } from './components/Formulario';
import imagen from './cryptomonedas.png'
import { Cotizacion } from './components/Cotizacion';
import { Spinner } from './components/Spinner';



const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media ( min-width: 992px ) {
    display: grid;
    grid-template-columns: repeat( 2, 1fr );
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }

`;


function App() {


  const [ moneda, setMoneda ] = useState('')
  const [ criptoMoneda, setCriptoMoneda ] = useState('')
  const [ resultado, setResultado ] = useState({})
  const [ cargando, setCargando ] = useState(false)

  useEffect(() => {
    
    const cotizarCriptoMoneda = async () => {
      // Evitar la primera ejecucion
      if( moneda === '') return

      // Consulat API
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ criptoMoneda }&tsyms=${ moneda }`;

      const resultado = await axios.get( url )

      // Mostrar el Spinner
      setCargando( true )
      // Ocultar el spinner y mostrar el resultado
      setTimeout( () => {

        // Cambiar el estado de cargando
        setCargando( false )
        // Guarcar cotizacion
        setResultado( resultado.data.DISPLAY[criptoMoneda][moneda] )
      }, 3000 )

    }

    cotizarCriptoMoneda()

    
    
  }, [ moneda, criptoMoneda ])

  // Mostrar spinner o resultado
  const componente = ( cargando ) ? <Spinner /> : <Cotizacion resultado={ resultado } />

  return (
    <Contenedor>
      <Imagen 
        src = { imagen }
        alt = "imagen cripto"
      />

      <div>
        <Heading>Cotiza tu Criptomoneda</Heading>

        <Formulario 
          setMoneda={ setMoneda }
          setCriptoMoneda = { setCriptoMoneda }
        />       
        { componente }
      </div>
   </Contenedor>
  );
}

export default App;
