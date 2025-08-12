
import './index.css'
import FormItem from '../FormItem';
function Input(props) {
    const { placeholder, value, onChange=()=>{} } = props;

    const handleChange = (event) => {
        onChange(event.target.value);
    }
    return (
        <input placeholder={placeholder} value={value} onChange={handleChange} className="form-input" type="text " />
    )
}


export default FormItem(Input)