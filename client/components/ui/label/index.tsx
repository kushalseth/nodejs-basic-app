import React, { HTMLProps } from "react";
import styles from "./label.module.scss";

interface labelType extends HTMLProps<HTMLLabelElement> {
    testId?: string;
}

const Label = ({
    className = "",
    style = {},
    children,
    testId = "",
    type = ""
}: labelType): JSX.Element => {
    return (
        <label
            data-testid={testId}
            className={`${styles["label-default"]} ${className} ${(type == "subtitle" ? styles['subtitle'] : styles['card-title'])}`}
            style={style}
        >
            {children}
        </label>
    );
};

export default Label;
