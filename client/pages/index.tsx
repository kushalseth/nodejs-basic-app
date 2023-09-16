import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from 'components/common/header';
import MainBody from 'components/main-body';
import { APP_TITLE, APP_DESCRIPTION, APP_AUTHOR } from 'lib/constants';
import { useState } from 'react';

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{APP_TITLE}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="author" content={APP_AUTHOR} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header onSearch={handleSearch} />
      <MainBody searchValue={searchValue} />
    </div>
  );
};

export default Home;
