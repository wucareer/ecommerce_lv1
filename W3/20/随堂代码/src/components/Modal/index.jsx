
import './index.css'
export default function Modal(props) {
    const { visible=false, onClose=()=>{},title,onOk=()=>{}, footer } = props
    
    return (
        <>
            <div className="modal" style={{display: visible ? 'block' : 'none'}}>
                <div className="mask"  onClick={onClose}></div>
                <div className="modal-content">
                    <div className="header">
                        <div className="title">{title}</div>
                    </div>
                    <div className="modal-body">
                        {visible && props.children}
                    </div>
                    {footer?footer:<div className="footer">
                        <div className="cancel" onClick={onClose}>取消</div>
                        <div className="ok btn-primary" onClick={onOk}>确定</div>
                    </div>}
                </div>
            </div>
            
        </>
    )
}