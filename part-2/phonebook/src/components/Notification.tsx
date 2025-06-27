import styles from '../styles/Notification.module.css'

const Notification = ({message}: {message: string | null}) => {
    if (message === null) {
        return null
    }

    return (
        <div className={styles.notification}>
            {message}
        </div>
    )
}

export default Notification