import Image from 'next/image'
import styles from './styles/footer.module.scss'
import logo from '@/app/(general)/assets/SwooppiLogo.png'
import google from '@/app/(general)/assets/googleIcon.png'
import apple from '@/app/(general)/assets/appleIcon.png'
import Link from 'next/link'

interface FooterProps {

}

const Footer: React.FunctionComponent<FooterProps> = () => {
    const swooppi = [
        {
            name: 'About us',
            url: '#'
        },
        {
            name: 'Career',
            url: '#'
        },
        {
            name: 'Get help',
            url: '#'
        }
    ]

    const resources = [
        {
            name: 'List your store',
            url: '#'
        },
        {
            name: 'Become a Swoopper',
            url: '#'
        },
        {
            name: 'View all cities',
            url: '#'
        }
    ]

    const communities = [
        {
            name: 'Facebook',
            url: '#'
        },
        {
            name: 'X (Formally Twitter)',
            url: '#'
        },
        {
            name: 'Instagram',
            url: '#'
        }
    ]

    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div>
                    <Image src={logo} alt='logo' width={107} height={71} />
                </div>
                <div>
                    <h3>SWOPPPI</h3>
                    {swooppi.map((item, index) => (
                        <Link href={item.url} key={index}>{item.name}</Link>
                    ))}
                </div>
                <div>
                    <h3>RESOURCES</h3>
                    {resources.map((item, index) => (
                        <Link href={item.url} key={index}>{item.name}</Link>
                    ))}
                </div>
                <div>
                    <h3>COMMUNITIES</h3>
                    {communities.map((item, index) => (
                        <Link href={item.url} key={index}>{item.name}</Link>
                    ))}
                </div>
            </div>
            <div className={styles.middle}>
                <div className={styles.left}>
                    <Link href='#'>Privacy Policy</Link>
                    <Link href='#'>Terms of use</Link>
                    <Link href='#'>Refund policy</Link>
                </div>
                <div className={styles.right}>
                    <Link href='#'>
                        <Image src={google} alt='google playstore' width={135} height={40} />
                    </Link>
                    <Link href='#'>
                        <Image src={apple} alt='google playstore' width={120} height={40} />
                    </Link>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>©Swooppi Inc. 2023. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;