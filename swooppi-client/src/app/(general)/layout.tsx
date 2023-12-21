import styles from './layout.module.scss'
import Footer from './components/footer';
import Header from './components/header';
import './layout.module.scss'

export default function GeneralLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.generalLayout}>
            <Header />
            <div className={styles.generalChildren} >
                {children}
            </div>
            <Footer />
        </div>
    );
}