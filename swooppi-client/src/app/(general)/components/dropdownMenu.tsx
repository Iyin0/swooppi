'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from "next/link";
import styles from './styles/header.module.scss';
import { usePathname } from "next/navigation";
import { RoutesType } from './header';

interface DropdownMenuComponentProps {
    routes: RoutesType
}



const DropdownMenuComponent: React.FunctionComponent<DropdownMenuComponentProps> = ({ routes }) => {

    const params = usePathname()


    return (
        <div className={styles.pageDropdownMenu}>
            <DropdownMenu.Root >
                <DropdownMenu.Trigger asChild>
                    <button className={styles.hamburger}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12H15M3 6H21M3 18H21" stroke="#48505E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content className={styles.menu}>
                    <DropdownMenu.Group className={styles.DropdownGroup}>
                        {routes.map((item, index) => (
                            <DropdownMenu.Item asChild key={index}>
                                <Link href={item.link}>{item.title}</Link>
                            </DropdownMenu.Item>
                        ))}
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    );
}

export default DropdownMenuComponent;