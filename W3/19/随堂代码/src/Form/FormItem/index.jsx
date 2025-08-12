



import React, { useState,useRef, useEffect } from'react';
export default function FormItem(WrappedComponent) {
    // props 是当这个被包装之后的组件被真正使用在jsx里时，传入的props
    return function FormItemWrapper(props) {
        

        const [value,setValue] = useState(props.defaultValue||'');
        const formOnChange = useRef(null);

        // 注册表单子项，到form里去。

        useEffect(( )=>{
            if(!props.register){return;}
            if(!props.name){return;}
            if(props.validate && !(props.validate instanceof RegExp)){
                return;
            }
          
            console.log('注册表单子项',props['form-id']);
            
            formOnChange.current= props.register(props.name,{
                type:props.type,
                defaultValue:props.defaultValue,
                required:props.required,
                validate:props.validate,
                errorText: props.errorText||`${props.name}有误`,
                setValue
            })
        },[props['form-id']])



        // 中间传递者，授控这件事，给完成。

        const handleChange = (value) => {
            formOnChange.current&&formOnChange.current(props.name,value);
            // 如果这个组件不被form包裹，则直接调用props.onChange
            props.onChange&&props.onChange(value);
        }

       
        
        
        return <div><WrappedComponent {...props} value={value} onChange={handleChange} /></div>
        
    }

}