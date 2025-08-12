import React, { useCallback, useRef, useState } from 'react';
import img_default_local from '../../assets/img_default_location.png';
import add_icon from '../../assets/plus_icon.png';
import img_local from '../../assets/local.png';
import img_del from '../../assets/del.png';
import Modal from '../Modal';
import Form from '../../Form/Form';
import Input from '../../Form/Input';
import RadioGroup from '../../Form/RadioGroup';
import Radio from '../../Form/Radio';
import Select from '../../Form/Select';
import './index.css'

export default function AdressSelect(props) {
    const { onchange = () => { } } = props;
    const [adresses, setAdresses] = useState(localStorage.getItem('adresses') ? JSON.parse(localStorage.getItem('adresses') || '[]') : []);
    const [selected, setSelected] = useState(-1);
    const [modalVisible, setModalVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const formRef = useRef(null);

    const handleClose = () => {
        setModalVisible(false);
    }

    const handleOk = () => {
        if (formRef.current) {
            const result = formRef.current.submit();
            const { data, errors } = result;
            console.log(data, errors);
            if (Object.keys(errors).length > 0) {
                console.log(errors);
                setErrors(errors);
                return;
            }

            setErrors({});

            if (Object.keys(data).length > 0) {
                setAdresses([...adresses, data]);
                localStorage.setItem('adresses', JSON.stringify([...adresses, data]));
                setModalVisible(false)
            }
        }
    }


    const handleClick = (index) => {
        setSelected(index);
        onchange(adresses[index])
    }


    const handleOpenModal = () => {
        setModalVisible(true);
    }


    const handleDelete = (index) => {
        setAdresses(adresses.filter((_, i) => (i !== index)));
        localStorage.setItem('adresses', JSON.stringify(adresses.filter((_, i) => (i !== index))));
    }
    return (
        <div className="address-select">
            <div className="first">
                <div className="address-title">收货地址</div>
                {adresses.length > 0 && <div className="address-add small">
                    <img src={add_icon} alt="" />
                    <span style={{ marginLeft: '10px' }} onClick={handleOpenModal}>新增地址</span>
                </div>}
            </div>
            {
                adresses.length > 0 ?
                    <div className="address-list">
                        {
                            adresses.map((data, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleClick(index)}
                                        className={`address-box ${selected === index ? 'active' : ''}`}>
                                        <div className="address-first">
                                            <div className="province">
                                                <img className='local-icon' src={img_local} alt="" />
                                                {data.city}-{data.area}={data.address}
                                            </div>
                                            <img src={img_del} alt="" onClick={() => { handleDelete(index) }} />
                                        </div>
                                        <div className="address">
                                            {data.detail}
                                        </div>
                                        <div className="contact">
                                            {data.name} {data.phone}
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    : <div className="empty">
                        <img src={img_default_local} alt="" />
                        <div className="address-add">
                            <img src={add_icon} alt="" />
                            <span style={{ marginLeft: '10px' }} onClick={handleOpenModal}>新增地址</span>
                        </div>
                    </div>
            }
            <Modal visible={modalVisible} onClose={handleClose} title="新增地址" onOk={handleOk}>
                <Form ref={formRef} >
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <div className='form-label'>收件人資料*</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                            <div className='form-item'>
                                <Input name="name" required placeholder="请输入收件人姓名" errorText="请输入收件人姓名~" />
                                {errors.name && <div className='error-text'>{errors.name}</div>}
                            </div>
                            <div className='form-item'>
                                <RadioGroup name="gender" defaultValue="male" required errorText="请选择性别">
                                    <Radio value="male">男</Radio>
                                    <Radio value="female">女</Radio>
                                </RadioGroup>
                                {errors.gender && <div className='error-text'>{errors.gender}</div>}
                            </div>
                            <div className='form-item'>
                                <Input name="phone" required placeholder="请输入收件人手机号" errorText="请输入收件人手机号" />
                                {errors.phone && <div className='error-text'>{errors.phone}</div>}
                            </div>
                        </div>
                        <div className=' form-item'>收件人地址*</div>
                        <div className=' form-item' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>

                            <Select name='city' defaultValue='台北市' required options={[{ label: '台北市', value: '台北市' }, { label: '新北市', value: '新北市' }]} />
                            <Select name='area' defaultValue='萬華區' required options={[{ label: '萬華區', value: '萬華區' }, { label: '中正區', value: '中正區' }]} />
                            <Select name='address' defaultValue='中華路100號' required options={[{ label: '中華路100號', value: '中華路100號' }, { label: '中華路200號', value: '中華路200號' }]} />

                        </div>
                        <div className='form-item'>
                            <Input name='detail' required placeholder='請輸入詳細地址' label='详细地址' errorText={'详细地址是必填的哦~'} ></Input>
                            {errors.detail && <div className='error-text'>{errors.detail}</div>}
                        </div>

                    </div>

                </Form>
            </Modal>
        </div>
    )
}