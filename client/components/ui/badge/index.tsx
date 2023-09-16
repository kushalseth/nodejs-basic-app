import React, { HTMLProps } from "react";
import styles from "./badge.module.scss";

interface labelType extends HTMLProps<HTMLLabelElement> {
    testId?: string;
}

const Badge = ({
    className = "",
    style = {},
    children,
    testId = "",
    type = ""
}: labelType): JSX.Element => {
    return (
        <p
            data-testid={testId}
            className={`${className} ${styles.badge} ${(type == "isBooked" ? styles.booked : styles.free)}`}
            style={style}
        >
            {(type == "isBooked") ? "Booked" : "Free"}
        </p>
    );
};

export default Badge;
