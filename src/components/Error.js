import React from 'react'
import PropTypes from 'prop-types';
import styled from '@emotion/styled'    

const MensajeError = styled.p`
    background-color: #B7322C;
    padding: 1rem;
    color: #FFF;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: 'Bebas Neue', cursive;
`;

export const Error = ({ mensaje }) => {
    return (
        <MensajeError>
            { mensaje }
        </MensajeError>
    )
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}
