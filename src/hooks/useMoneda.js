import React, { useState } from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border: none;
    border-radius: 10px;
    font-size: 1.2rem;
`;

export const useMoneda = ( label, stateInicial, monedas ) => {
    // Este label, stateInicial, monedas viene de lo que se inicializa en useMoneda desde Formulario

    // State de nuestro custom hook

    const [ update, setUpdate ] = useState(stateInicial)
    
    const Seleccionar = () => (

        <>
            <Label>{ label }</Label>
            <Select
                onChange={ e => setUpdate(e.target.value) }
                value= { update }
            >
                <option value="">- Seleccione -</option>
                { monedas.map( moneda => (
                    <option key={ moneda.codigo } value={ moneda.codigo }>{ moneda.nombre }</option>
                ))}
            </Select>
        </>
    )

    // Retornar state
    return [ update, Seleccionar, setUpdate ]

}


