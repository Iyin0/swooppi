'use client'

import styles from './styles/header.module.scss'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface CartMenuProps {

}

const CartMenu: React.FunctionComponent<CartMenuProps> = () => {
    return (
        <section className={styles.cartDropdownComponent}>
            <DropdownMenu.Root >
                <DropdownMenu.Trigger asChild>
                    <button className={styles.hamburger}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.6665 1.6665H2.75497C2.95999 1.6665 3.0625 1.6665 3.14499 1.7042C3.21769 1.73743 3.27929 1.79086 3.32246 1.85813C3.37145 1.93446 3.38595 2.03594 3.41494 2.23889L3.80936 4.99984M3.80936 4.99984L4.68594 11.4427C4.79718 12.2603 4.85279 12.6691 5.04825 12.9768C5.22049 13.2479 5.46741 13.4635 5.7593 13.5976C6.09056 13.7498 6.50312 13.7498 7.32826 13.7498H14.4598C15.2453 13.7498 15.638 13.7498 15.959 13.6085C16.242 13.4839 16.4847 13.283 16.6601 13.0284C16.8589 12.7395 16.9324 12.3537 17.0794 11.5821L18.1824 5.79125C18.2342 5.51968 18.26 5.38389 18.2225 5.27775C18.1897 5.18465 18.1248 5.10624 18.0395 5.05652C17.9422 4.99984 17.804 4.99984 17.5275 4.99984H3.80936ZM8.33317 17.4998C8.33317 17.9601 7.96007 18.3332 7.49984 18.3332C7.0396 18.3332 6.6665 17.9601 6.6665 17.4998C6.6665 17.0396 7.0396 16.6665 7.49984 16.6665C7.96007 16.6665 8.33317 17.0396 8.33317 17.4998ZM14.9998 17.4998C14.9998 17.9601 14.6267 18.3332 14.1665 18.3332C13.7063 18.3332 13.3332 17.9601 13.3332 17.4998C13.3332 17.0396 13.7063 16.6665 14.1665 16.6665C14.6267 16.6665 14.9998 17.0396 14.9998 17.4998Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p>1 basket | 2 items</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content className={styles.menu}>
                    <DropdownMenu.Group className={styles.DropdownGroup}>
                        <DropdownMenu.Item className={styles.DropdownItem}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="#48505E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p>Add Item</p>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className={styles.DropdownItem}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5" stroke="#EE2024" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className={styles.clear}>Clear basket</p>
                        </DropdownMenu.Item>
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </section>
    );
}

export default CartMenu;