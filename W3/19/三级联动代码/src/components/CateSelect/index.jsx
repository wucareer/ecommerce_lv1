import React, { useEffect, useRef, useState } from "react";
import './index.css'
import img_title from '../../assets/cate_select_title.png';
import img_right_arrow from '../../assets/right_arrow.png';
import img_right_arrow_active from '../../assets/right_arrow_active.png';
import cateData from './data.json'

export default function CateSelect(props) {
    const { onChange } = props
    const [isOpen, setIsOpen] = useState(false)
    const [index, setIndex] = useState(0)
    const pannelRef = useRef(null)
    const cateRef = useRef(null)

    const handleClickOutside = (event) => {
        if (!cateRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)



        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const handleFirstSelect = (index) => {
        setIsOpen((true))
        setIndex(index)

    }

    useEffect(() => {
        if (isOpen) {
            const titleDom = pannelRef.current.querySelectorAll('.cate-select-pannel-title')[index]

            // titleDom.scrollIntoView({
            //     behavior: 'auto',
            //     block: 'center',
            //     inline: 'center'
            // })
            pannelRef.current.scrollTop = titleDom.offsetTop;
        }
    }, [isOpen, index])

    const handleSelect = (data) => {
        onChange&&onChange(data)
        setIsOpen(false)
        setIndex(0)
    }
    return (
        <div className={`cate-select ${isOpen ? 'opened' : ''}`} ref={cateRef}>
            <img className='cate-select-title' src={img_title} alt="" srcSet="" />
            <div className="cate-select-first-level">

                {
                    cateData.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    handleFirstSelect(index)
                                }}
                                className='cate-select-item'>
                                <div>{item.name}</div>
                                <img className='cate-select-item-arrow' src={img_right_arrow_active} alt="" srcSet="" />
                            </div>
                        )
                    })
                }

            </div>


            {
                isOpen && <div className="cate-select-pannel" ref={pannelRef}>

                    {
                        cateData.map((item, index) => {
                            return (
                                <>
                                    <div key={index} className='cate-select-pannel-title'>{item.name}</div>
                                    <div className='cate-select-pannel-content'>

                                        {
                                            item.children.map((child, i) => {
                                                return (
                                                    <div key={i} onClick={()=>{handleSelect({first:item,second:child})}} className='cate-select-pannel-item' >{child.name}</div>
                                                )
                                            })
                                        }

                                    </div>
                                </>
                            )
                        })
                    }

                </div>
            }

        </div>
    )
}