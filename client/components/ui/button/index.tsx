import React, { MouseEventHandler, } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
    id?: string;
    role?: string;
    className?: string;
    buttonText?: string | Function;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit";
    children?: JSX.Element | string;
    testId?: string;
    style?: object;
    isDisabled?: boolean;
}

const Button = ({
    id = "",
    role = "button",
    className = "",
    type = "button",
    buttonText = "",
    children,
    onClick,
    testId = "",
    style = {},
    isDisabled = false,
}: ButtonProps): JSX.Element => {

    return (
        <button
            id={id}
            role={role}
            data-testid={testId || "button"}
            className={`${styles["button"]} ${className}`}
            onClick={(e) => onClick && onClick(e)}
            type={type}
            style={style}
            disabled={isDisabled}
            aria-disabled={isDisabled}
        >

            <>
                {buttonText || ""}
            </>

        </button>
    );
};
export default Button;
