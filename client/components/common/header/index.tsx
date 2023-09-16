import { FC, useState } from 'react';
import { HeaderProps } from 'lib/@types/common';
import { PAGE_TITLE, PAGE_SUBTITLE, HEADER_BTN_TEXT, SEARCH_PLACEHOLDER } from 'lib/constants/Header';
import styles from './Header.module.scss';
import Label from 'components/ui/label';
import Button from 'components/ui/button';
import Search from 'components/ui/search';

interface HeaderPropsWithSearch extends HeaderProps {
    onSearch: (value: string) => void;
}

const Header: FC<HeaderPropsWithSearch> = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        setSearchValue(value);
        onSearch(value);
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.header__title}>{PAGE_TITLE}</h1>
            <div className={styles.header__actions}>
                <Label type="subtitle">{PAGE_SUBTITLE}</Label>
                <Button buttonText={HEADER_BTN_TEXT} className={styles.header__actions__button} />
            </div>
            <Search testId={"search"} placeholder={SEARCH_PLACEHOLDER} onSearch={handleSearch} />
        </header>
    );
};

export default Header;
