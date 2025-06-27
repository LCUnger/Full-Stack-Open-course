import styles from '../styles/Notification.module.css'

const Notification = ({message, isError}: {message: string | null, isError: boolean}) => {
    if (message === null) {
        return null
    }

    return (
        <div className={`${styles.notification} ${isError ? styles.error : ''}`}>
            {message}
        </div>
    )
}

export default Notification