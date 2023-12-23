'use client'

import Image from 'next/image';
import styles from './styles/header.module.scss'
import logo from '@/app/(general)/assets/logo.png'
import CustomDropdown from './customDropdown';
import CartMenu from './cartMenu';
import DropdownMenuComponent from './dropdownMenu';

interface HeaderProps {

}

export type RoutesType = {
    title: string
    link: string
}[]

const Header: React.FunctionComponent<HeaderProps> = () => {

    const routes: RoutesType = [
        {
            title: 'Most Popular',
            link: '/',
        },
        {
            title: 'Mains',
            link: '/',
        },
        {
            title: 'Family Value',
            link: '/',
        },
        {
            title: 'Drinks',
            link: `/`,
        },
        {
            title: 'Drinks',
            link: '/',
        }
    ]
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <DropdownMenuComponent routes={routes} />

                <Image src={logo} alt='logo' width={60} height={40} />
                <div className={styles.dropdown}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0026 18.3332C10.8359 14.1665 16.6693 13.6817 16.6693 8.33317C16.6693 4.65127 13.6845 1.6665 10.0026 1.6665C6.32071 1.6665 3.33594 4.65127 3.33594 8.33317C3.33594 13.6817 9.16927 14.1665 10.0026 18.3332Z" stroke="#48505E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.0026 10.8332C11.3833 10.8332 12.5026 9.71388 12.5026 8.33317C12.5026 6.95246 11.3833 5.83317 10.0026 5.83317C8.62189 5.83317 7.5026 6.95246 7.5026 8.33317C7.5026 9.71388 8.62189 10.8332 10.0026 10.8332Z" stroke="#48505E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <CustomDropdown list={[]} placeholder='23, Kudirat Abiola Way' onSelect={value => console.log(value)} />
                </div>
                <div className={styles.search}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5024 17.5L14.5859 14.5833M16.6691 9.58333C16.6691 13.4954 13.4978 16.6667 9.58577 16.6667C5.67376 16.6667 2.50244 13.4954 2.50244 9.58333C2.50244 5.67132 5.67376 2.5 9.58577 2.5C13.4978 2.5 16.6691 5.67132 16.6691 9.58333Z" stroke="#48505E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input type="search" name="" id="" placeholder='Search for place' />
                </div>
            </div>
            <div className={styles.right}>
                <CartMenu />
            </div>
        </header>
    );
}

export default Header;