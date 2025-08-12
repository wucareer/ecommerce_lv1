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


const cities = [
    {
        "name": "台北市",
        "districts": [
            {
                "name": "中正区",
                "streets": ["忠孝西路", "中山南路", "爱国西路"]
            },
            {
                "name": "大同区",
                "streets": ["承德路", "大同街", "承德街"]
            }
        ]
    },
    {
        "name": "新北市",
        "districts": [
            {
                "name": "板桥区",
                "streets": ["府中路", "板桥路", "文化路"]
            },
            {
                "name": "淡水区",
                "streets": ["中山路", "中正路", "新生路"]
            }
        ]
    },
    {
        "name": "高雄市",
        "districts": [
            {
                "name": "苓雅区",
                "streets": ["三多一路", "建军路", "中华四路"]
            },
            {
                "name": "左营区",
                "streets": ["莲池路", "翠华路", "立德路"]
            }
        ]
    },
    {
        "name": "台中市",
        "districts": [
            {
                "name": "西屯区",
                "streets": ["台湾大道", "文心路", "市政路"]
            },
            {
                "name": "北屯区",
                "streets": ["崇德路", "兴安路", "东山路"]
            }
        ]
    }
]

// 第一步，处理数据
// 第二步，渲染数据
// 响应onchange,更新二级、三，。。。的数据

export default function AdressSelect(props) {
    const { onchange = () => { } } = props;
    const [adresses, setAdresses] = useState(localStorage.getItem('adresses') ? JSON.parse(localStorage.getItem('adresses') || '[]') : []);
    const [selected, setSelected] = useState(-1);
    const [modalVisible, setModalVisible] = useState(false);
    const [errors, setErrors] = useState({});
    // 三级联动数据初始化过程
    const [cityOptions, setCityOptions] = useState(cities.map(item => ({ label: item.name, value: item.name, children: item.districts })));
    const [areaOptions, setAreaOptions] = useState(cities[0].districts.map(item => ({ label: item.name, value: item.name, children: item.streets })));
    const [streetOptions, setStreetOptions] = useState(cities[0].districts[0].streets.map(item => ({ label: item, value: item })));

    const formRef = useRef(null);

    const handleClose = () => {
        setModalVisible(false);
    }


    const handleCityChange = (value) => {
        console.log(value);
        const city = cityOptions.find(item => item.value === value);
        setAreaOptions(city.children.map(item => ({ label: item.name, value: item.name, children: item.streets })));
        setStreetOptions(city.children[0].streets.map(item => ({ label: item, value: item })));
        formRef.current.setValue('area', city.children[0].name);
        formRef.current.setValue('address', city.children[0].streets[0]);
    }


    const handleAreaChange = (value) => {
        const area = areaOptions.find(item => item.value === value)
        setStreetOptions(area.children.map(item => ({ label: item, value: item })));
        formRef.current.setValue('address', area.children[0]);
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

                            <Select name='city' onChange={handleCityChange} defaultValue={cityOptions[0].value} required options={cityOptions} />
                            <Select name='area' onChange={handleAreaChange} defaultValue={areaOptions[0].value} required options={areaOptions} />
                            <Select name='address' defaultValue={streetOptions[0].value} required options={streetOptions} />

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