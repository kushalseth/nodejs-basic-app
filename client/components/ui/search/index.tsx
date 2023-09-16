import React, { ChangeEvent } from "react";
import styles from "./search.module.scss";

interface SearchProps {
    className?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    testId?: string;
    onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({
    className = "",
    placeholder = "",
    style = {},
    testId = "",
    onSearch,
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onSearch(value);
    };

    return (
        <input
            data-testid={testId}
            className={`${styles.search} ${className}`}
            placeholder={placeholder}
            style={style}
            onChange={handleChange}
        />
    );
};

export default Search;
