import React, {useState} from "react";
import '@scss/components/switch.scss'
import Spinner from "./Spinner.tsx";

const Switch: React.FC = ({onDisabled}) => {

    const [checked, setChecked] = useState<boolean>(true);

    const handleCheckboxChange = (e) => {
        setChecked(!checked);
        if (checked) {
            onDisabled(e)
        }
    };

    return (
        <div className="checkbox-con">
            <input id="checkbox" checked={checked}
                   onChange={handleCheckboxChange}
                   type="checkbox" disabled={!checked}/>
            {!checked && <Spinner size={25} loader={'hash'} loading={!checked}/>}
        </div>
    )
}

export default Switch