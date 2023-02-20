import { useState } from "react";
import "../../styles/inputs.css";

export default function Inputs(props) {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (event) => {
        setFocused(true);
    };
    return (
        <>
            <label className="formLabel">{label}</label>
            <input
                className="formInput"
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "passwordConfirm" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span>{errorMessage}</span>
        </>
    );
}
