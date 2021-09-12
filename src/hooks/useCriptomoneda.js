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

export const useCriptomoneda = ( label, stateInicial, monedas ) => {

    const [ update, setUpdate ] = useState(stateInicial)
    
    const SelectCripto = () => (

        <>
            <Label>{ label }</Label>
            <Select
                onChange={ e => setUpdate(e.target.value) }
                value= { update }
            >
                <option value="">- Seleccione -</option>
                { monedas.map( moneda => (
                    <option key={ moneda.CoinInfo.Id } value={ moneda.CoinInfo.Name }>{ moneda.CoinInfo.FullName }</option>
                ))}
            </Select>
        </>
    )

    // Retornar state
    return [ update, SelectCripto, setUpdate ]



}
