import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import styled from '@emotion/styled'
import { useMoneda } from '../hooks/useMoneda';
import { useCriptomoneda } from '../hooks/useCriptomoneda';

import axios from 'axios'
import { Error } from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2DE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

export const Formulario = ({ setMoneda, setCriptoMoneda }) => {

    // State del listado de criptomoneda
    const [ listarCripto, setListarCripto] = useState([])
    const [ error, setError ] = useState(false)

    const monedas = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'},
        { codigo: 'CLP', nombre: 'Peso Chileno'}
    ]


    // useMoneda 
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', monedas)

    // Utilizar useCriptoMoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listarCripto)

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get( url )
            
            setListarCripto(resultado.data.Data)
        }

        consultarAPI()

    }, [])

    const cotizarMoneda = ( e ) => {
        e.preventDefault();

        // Validar campos
        if ( moneda === '' || criptomoneda === '' ) {
            setError( true )
            return
        }

        // Datos al componente
        setError( false )
        setMoneda( moneda )
        setCriptoMoneda( criptomoneda )

    }

    return (
        <form
            onSubmit={ cotizarMoneda }
        >

            { error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMonedas />

            <SelectCripto />

            <Boton 
                type="submit"
                value="Calcular"
            />
            
        </form>
    )
}

Formulario.propTypes = {
    setMoneda: PropTypes.func.isRequired,
    setCriptoMoneda: PropTypes.func.isRequired
}