import AdressSelect from '../../components/AdressSelect'
import OrderSummay from '../../components/OrderSummay'
import './index.css'
export default function Order() {

    return (


        <div className="do-order">
         
            <div className="order-container">
                <div className="left">
                    <div className="address-area">
                        <AdressSelect />
                    </div>
                    <div className="pay-area">
                    </div>
                    <div className="invoice-area"></div>
                </div>
                <div className="right">
                    <OrderSummay />
                </div>
            </div>
        </div>

        
    )
}