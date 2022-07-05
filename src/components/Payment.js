import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { Store } from '../store/Context'
import CheckOutSteps from './CheckOutSteps'

const Payment = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart:{
            shippingAddress, paymentMethod
        },
    } = state;
    const navigate = useNavigate();
    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'PayPal'
    )
    useEffect(()=>{
        if(!shippingAddress.registers.address1){
            navigate('/shipping')
        }
    },[shippingAddress,navigate])
    const submitHandler = (e) =>{
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName})
        localStorage.setItem('paymentMethod', paymentMethodName)
        navigate('/Finalpayment')
    }
  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className='container small-container'>
        <h1 className='my-3'>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Check
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethodName === 'PayPal'}
            onChange={(e)=>setPaymentMethod(e.target.value)}
            >   
            </Form.Check>
            <Form.Check
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            checked={paymentMethodName === 'Stripe'}
            onChange={(e)=>setPaymentMethod(e.target.value)}
            >
            </Form.Check>
            <div className="text-left my-1">
          <Button type="submit" variant="warning" size="sm">
            Continue
          </Button>
        </div>
        </Form>
      </div>
    </div>
  )
}

export default Payment
