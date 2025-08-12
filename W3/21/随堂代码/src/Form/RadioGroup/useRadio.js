
import { useState } from "react";

export default function useRadio() {

    const [selected, setSelected] = useState(null);

    const register = (index) => {


        return ({
            value: selected === index,
            onChange: () => {
                setSelected(index);
            }
        })
    }

    return [selected, register]


}