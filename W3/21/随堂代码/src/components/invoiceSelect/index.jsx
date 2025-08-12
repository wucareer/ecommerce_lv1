import React, { useRef, useState,useImperativeHandle } from "react";
import Input from "../../Form/Input";
import Select from "../../Form/Select";
import Form from "../../Form/Form";
import './index.css'
export default function InvoiceSelect(props) {

    useImperativeHandle(props.ref, () => ({ form: formRef.current }))
    const [invoiceType,setInvoiceType] = useState("electronic");
    const [invoiceTypeSub,setInvoiceTypeSub] = useState(1);
    const formRef = useRef();

    const handleTypeChange = (type) => {
        setInvoiceType(type);
    }

    const handleSubTypeChange = (type) => {
        setInvoiceTypeSub(type);
    }
    return (
        <div className="invoice-container">
            <div className="invoice-small">以下资料只用于开具发票，不会在其他页面显示。发票一旦开具后无法更改，请确认资料是否都填写正确吧！</div>
            <div className="invoice-small">以下資訊只用於開立發票，並不會在其他頁面顯示。發票一經開立後不可更改，請確認資訊是否都填寫正確喔！</div>
            <Form ref={formRef}>
                <div className="invoice-content">
                    <div className="invoice-item">
                        <div className="invoice-label">姓名*</div>
                        <Input name="name" placeholder="請輸入您的姓名"  required />
                    </div>
                    <div className="invoice-item">
                        <div className="invoice-label"> 電子信箱*</div>
                        <Input name="email" placeholder="請輸入您的電子信箱"  required />
                    </div>
                    <div className="invoice-item">
                        <div className="invoice-label">發票類型 *</div>
                        <Select name="invoiceType" 
                            onChange={handleTypeChange} 
                            required 
                            defaultValue="electronic" 
                            options={[
                                { label: "電子發票", value: "electronic" },
                                { label: "統編發票", value: "vatNormal" }, 
                                { label: "捐贈發票", value: "vatElectronic" }
                            ]} />
                    </div>
                    {invoiceType==='electronic'&& <div className="invoice-item">
                        <div className="invoice-label">發票類型 *</div>
                        <Select name="invoiceTypeSub" defaultValue={1} onChange={handleSubTypeChange} required options={[{ label: "儲存在網站上，中獎後寄信通知", value: 1 }, { label: "手機條碼", value: 2 }]} />
                    </div>}
                    {invoiceType==='vatNormal'&& <div className="invoice-item">
                        <div className="invoice-label">統一編號 *</div>
                        <Input name="taxNumber" required placeholder="請輸入您的統一編號" />
                    </div>}
                    {invoiceType==='vatNormal'&&  <div className="invoice-item">
                        <div className="invoice-label">發票抬頭 *</div>
                        <Input name="invoiceTitle" required placeholder="請輸入發票抬頭" />
                    </div>}
                    {invoiceType==='vatNormal'&& <div className="invoice-item">
                        <div className="invoice-label">公司地址 *</div>
                        <Input name="companyAddress" required placeholder="請輸入公司地址" />
                    </div>}
                    {invoiceType==='vatElectronic'&& <div className="invoice-item">
                        <div>捐贈碼 *</div>
                        <Input name="donationCode" required placeholder="請輸入捐贈碼" />
                    </div>}
                    {invoiceTypeSub===2&& <div className="invoice-item">
                        <div className="invoice-label">手機條碼 *</div>
                        <Input name="mobileCode" required placeholder="請輸入手機條碼" />
                    </div>}
                </div>
            </Form>
        </div>
    )
}