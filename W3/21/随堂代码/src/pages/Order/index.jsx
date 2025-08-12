import React,{useRef} from 'react'
import AdressSelect from '../../components/AdressSelect'
import OrderSummay from '../../components/OrderSummay'
import PaySelect from '../../components/PaySelect'
import './index.css'
import InvoiceSelect from '../../components/invoiceSelect'
export default function Order() {


    const payRef = useRef(null)
    const invoiceRef = useRef(null)

    const handleSubmit = () => {
        
        const {data,errors}=payRef.current.form.submit()
        const {data:invoiceData,errors:invoiceErrors}=invoiceRef.current.form.submit()
        console.log(data)
        console.log('invoiceData',invoiceData,invoiceErrors)

    }

    return (

        <div className="do-order">
         
            <div className="order-container">
                <div className="left">
                    <div className="address-area">
                        <AdressSelect />
                    </div>
                    <div className="pay-area">
                        <PaySelect ref={payRef}  />
                    </div>
                    <div className="invoice-area">
                        <InvoiceSelect ref={invoiceRef} />
                    </div>
                </div>
                <div className="right">
                    <OrderSummay onSubmit={handleSubmit} />
                </div>
            </div>
        </div>

        
    )
}