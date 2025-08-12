import React, { useEffect, useState } from "react"

import FormItem from "../FormItem";

function RadioGroup(props) {

    const { onChange, value } = props;

    const [selectedIndex, setSelectedIndex] = useState(null)

    useEffect(() => {
        if (value) {
            const matchIndex = props.children.findIndex(radio => radio.props.value === value)
            setSelectedIndex(matchIndex)
        }
    }, [value])

    return (
        <div className="radio-group">
            {
                props.children.map((radio, index) => {
                    return React.cloneElement(radio, {
                        key: index,
                        value: selectedIndex === index,
                        onChange: (value) => {
                            props.onChange(radio.props.value)
                            if (value) {

                                setSelectedIndex(index)
                            }
                        }
                    })
                })
            }
        </div>
    )
}

export default FormItem(RadioGroup) 