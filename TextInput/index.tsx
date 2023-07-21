import React, {useEffect, useRef, useState} from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { errorOccurred } from "../../../../store/slices/errorAlertSlice";

interface InputProps {
    onChange: (value: string | number) => void;
    value: string | number;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onReg?: {
        reg: RegExp;
        errorCode: string;
    };
    debounce?: boolean;
    onKeyDown?: (value: string) => void;
    isDisabled?: boolean;
    id?: string;
    name?: string;
    isRequ?: boolean;
    type?: string
    onRegFunction?: () => void
}

const Index = ({ onChange, value, onBlur, onReg, debounce, onKeyDown, isDisabled, id, name, isRequ , type , onRegFunction}: InputProps) => {
    const [text, setText] = useState(value);
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLInputElement>(null);
    let timer: NodeJS.Timeout | null;
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;

        if (onReg != null && text.length > 0) {
            if (!onReg.reg.test(text)) {
                if (onRegFunction != null){
                    onRegFunction()
                } else {
                    dispatch(
                        errorOccurred({
                            errorCode: {
                                code: onReg.errorCode,
                                default: "error!!"
                            }
                        })
                    );
                }
                return false;
            }
        }
        setText(text);

        if (debounce) {
            onChange(text)
        }
    };

    const onBlurHandler =
        onBlur != null
            ? onBlur
            : debounce
            ? (e: React.FocusEvent<HTMLInputElement>) => {}
            : (e: React.FocusEvent<HTMLInputElement>) => {
                  const text = Number.isNaN(e.target.value) ? Number(e.target.value) : (e.target.value as string);
                  onChange(text);
              };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;
        if (e.key === "Enter") {
            if (onKeyDown) {
                onKeyDown(value);
            }
        }
    };

    useEffect(() => {
        setText(value);
        if (ref.current != null) {
            ref.current.focus();
        }
    }, [value]);

    return (
        <input
            id={id}
            type={type != null ? type : "text"}
            onChange={onChangeHandler}
            value={text}
            onBlur={onBlurHandler}
            onKeyDown={onKeyDownHandler}
            disabled={isDisabled}
            name={name}
            required={isRequ != null ? isRequ : false}
            ref={ref}
        />
    );
};

export default Index;
