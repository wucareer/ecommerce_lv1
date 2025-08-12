import { useEffect, useState} from "react";
import FormItem from "../FormItem";
import './index.css';


function Select(props) {

    const {value,onChange,options=[{label:'默认选项',value:1}]}=props;
    const [selectedOption,setSelectedOption]=useState(options[0].value);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
       
        const mouseClick = (event) => {
            
            if(!(event.target.closest('.form-select'))){
                setIsOpen(false);
            }
        }

        window.document.addEventListener('click',mouseClick)


        return () => {
            window.document.removeEventListener('click',mouseClick)
        }
    },[])



    useEffect(()=>{
        if(value){
            setSelectedOption(value)
        }
    },[value])



    const handleChange = (value) => {
        onChange(value)
        setSelectedOption(value)
    }
    const renderLabel = () => {
        const option=options.find(item=>item.value===selectedOption);
        return option?option.label:''
    }
    return (
        <div className='form-select' >

            <div className='select-show' onClick={() => { setIsOpen(true); }}>
                {renderLabel()}
                <div className='cursor-icon'>

                </div>
            </div>
            {
                isOpen&& <div className='select-options'>
  
                    {options.map(item=>{
                        return <div key={item.value} 
                            className={`select-option ${selectedOption===item.value?'selected':''}`}    
                            onClick={() => { handleChange(item.value); setIsOpen(false); }}>
                            {item.label}
                        </div>
                    })  }

                </div>
            }
        </div>
    )
}


export default  FormItem(Select)