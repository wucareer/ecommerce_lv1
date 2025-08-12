import React, { useEffect, forwardRef, useImperativeHandle, memo, use, useRef } from 'react'

const Form = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        register,
        setValue,
        submit,
    }))

    let _id = new Date().getTime();

    let data = useRef({})
    let errors = useRef({})
    const validates = useRef({})
    const requireds = useRef({})
    const errorTexts = useRef({})
    const valueHandlers = useRef({})

    const setValue = (key, value) => {
        data.current[key] = value;
        valueHandlers.current[key](value) //setvalue
    }

    const monitorHandler = (key, value) => {
        // 本质原因，是我要感知所有表单的变化，把数据存一份
        data.current[key] = value;

        valueHandlers.current[key](value) //setvalue
    }

    const register = (key, options) => {
        const { type, setValue, defaultValue, validate, required, errorText } = options;
        if (Object.keys(data.current).includes(key)) {
            console.warn(`Key ${key} already exists in form data`);
        } else {
            data.current[key] = defaultValue
        }

        valueHandlers.current[key] = setValue
        validates.current[key] = validate
        requireds.current[key] = required
        errorTexts.current[key] = errorText


        return monitorHandler

    }


    const submit = () => {
        errors.current = {}
        // 提效

        for (let key in requireds.current) {
            if (requireds.current[key] && !data.current[key]) {
                errors.current[key] = errorTexts.current[key]
            }
        }

        for (let key in validates.current) {
            if (validates.current[key] && !validates.current[key].test(data.current[key])) {
                errors.current[key] = errorTexts.current[key]
            }
        }

        return { data:data.current, errors:errors.current }

    }


    const handleSubmit = (event) => {
        event.preventDefault()
        errors.current = {}
        // 提效

        for (let key in requireds.current) {
            if (requireds.current[key] && !data.current[key]) {
                errors.current[key] = errorTexts.current[key]
            }
        }

        for (let key in validates.current) {
            if (validates.current[key] && !validates.current[key].test(data.current[key])) {
                errors.current[key] = errorTexts.current[key]
            }
        }


        props.onSubmit && props.onSubmit({ data: data.current, errors: errors.current })


    }



    // 递归渲染子组件,在合适的时机，调用自己。
    const insetReigster = (reactNode) => {

        // 当child 是叶子节点时，直接返回reactNode,<div>123</div>
        if (typeof reactNode !== 'object') {
            return reactNode
        }

        let childProps = {
            'form-id': _id
        }
        // 这一步不需要判断是否为高阶组件的。
        if (reactNode.props.type === 'submit') {
            childProps.onClick = handleSubmit
        }

        // 是否是高阶组件
        if (reactNode.type.name === 'FormItemWrapper') {
            childProps.register = register
        } else {
            if (Array.isArray(reactNode.props.children)) {
                childProps.children = [];
                reactNode.props.children.forEach((child, index) => {
                    // 递归的关键步骤  
                    childProps.children.push(insetReigster(child))
                })
            } else {
                childProps.children = insetReigster(reactNode.props.children)
            }
        }



        return React.cloneElement(reactNode, childProps)

    }



    return (
        <div className="form">
            {(Array.isArray(props.children) ? [...props.children] : [props.children]).map((child) => {

                return insetReigster(child)
            })}
        </div>
    )

})

export default memo(Form);