
import Radio from '../../Form/Radio'
import './index.css'
import useRadio from '../../Form/RadioGroup/useRadio'
import Form from '../../Form/Form'
import Input from '../../Form/Input'
import { useImperativeHandle, useRef } from 'react'


export default function PaySelect(props) {

    useImperativeHandle(props.ref, () => ({ form: formRef.current, payMathod: selected }))
    const [selected, register] = useRadio()
    const formRef = useRef(null)

    return (

        <div className="pay-select">
            <div className="pay-select-title">付款方式</div>
            <div className="pay-select-form">

                <div className="pay-select-card-radio">
                    <Radio  {...register(1)} />
                    <div className="pay-select-card-radio-label">信用卡一次付清</div>
                </div>

                <Form ref={formRef}>
                    <div style={{ display: 'grid', marginTop: '20px', marginLeft: '50px', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '10px' }}>
                        <div>
                            <label>信用卡卡號*</label>
                            <Input name='account_number' placeholder='請輸入信用卡卡號' required />
                        </div>
                        <div>
                            <label > 信用卡有效期*</label>
                            <Input name='expiry_date' placeholder='請輸入信用卡有效期' required />
                        </div>
                        <div>
                            <label> 信用卡 CVV*</label>
                            <Input name='cvv' placeholder='請輸入信用卡 CVV' required />
                        </div>
                    </div>
                </Form>


                <div className="pay-select-card-note">本公司採用 OOXX 科技 OX 金流交易系統，消費者刷卡時直接在銀行端系統中交易，本公司不會留下您的信用卡資料，以保障你的權益，資料傳輸過程採用嚴密的 SSL 2048bit 加密技術保護。</div>

            </div>
            <div className="pay-select-form">
                <div className="pay-select-card-radio">
                    <Radio {...register(2)} />
                    <div className="pay-select-card-radio-label">ATM轉帳</div>
                </div>
                <div className="pay-select-card-note">下一步將連至第三方金流選擇銀行並取得繳費資訊</div>
            </div>

        </div>

    )
}