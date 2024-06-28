import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoo, faHeart } from '@fortawesome/free-solid-svg-icons';

function Tweet(props) {


    
    const tweetDate = new Date(props.date);

    const now = new Date();
    const diff = now - tweetDate;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
}
    return (
        <>
            <div className={styles.tweetWrapper}>

                <div className={styles.tweetHeader}>
                    <img className={styles.profileImg} src="/egg.jpg" alt="img" />
                    <div className={styles.profileNames}><p className={styles.firstname}>{props.firstname}</p>
                        <p className={styles.username}>@{props.username} </p>
                    </div>
                    <p className={`${styles.username} ${styles.dateContainer}`}>{tweetDate} </p>

                </div>

                <div className={styles.message}>{props.message}</div>
                <div className={styles.messageBtnContainer}>
                    <FontAwesomeIcon icon={faHeart} className={styles.heart} onClick={() => props.updateLiked(props.username, props.message)} />
                    <FontAwesomeIcon icon={faPoo} className={styles.poo} onClick={() => props.deleteTweet(props.username, props.message)} />
                    <p>count</p>
                </div>
            </div>
        </>
    )


export default Tweet