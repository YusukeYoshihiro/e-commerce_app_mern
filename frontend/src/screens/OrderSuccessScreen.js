import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const OrderSuccessScreen = () => {
    return (
        <div className="text-center mt-5">
            <MsgContainer>
                <CheckIcon className="fas fa-check-circle"></CheckIcon>
                <h1>Payment Complete</h1>
            </MsgContainer>
            <h3 className="text-secondary">Thanks for your order!</h3>
            <br />
            <Link to="/" className="text-dark">&lt; Return to Home</Link>
        </div>
    )
}

export default OrderSuccessScreen


const MsgContainer = styled.div`
  color: #5FC978;
`
const CheckIcon = styled.i`
  font-size: 3.5rem;
  margin-bottom: 12px;
`
