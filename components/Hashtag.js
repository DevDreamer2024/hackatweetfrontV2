import styles from '../styles/Hashtag.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tweet from './Tweet';
import Image from 'next/image';
import { useRouter } from 'next/router';



function Hashtag(props) {


    const dispatch = useDispatch();
    
   
   // Récupère l'utilisateur actuel depuis l'état global Redux
    const user = useSelector((state) => state.user.value);
    // Déclare les états locaux pour le prénom, le nom d'utilisateur, le message, l'ajout de tweet, la longueur du message et les tweets
    const [firstname, setFirstName] = useState('');
    const [username, setUserName] = useState(user.username);
    const [message, setMessage] = useState('');
    const [isTweetAdded, setIsTweetAdded] = useState(false);
    const [messageLength, setMessageLength] = useState(0);
    const [tweets, setTweets] = useState([]);
    const currentDate = Date.parse(new Date());

    const router = useRouter();

 // Premier useEffect pour récupérer le prénom de l'utilisateur connecté
    useEffect(() => {
        fetch(`http://localhost:3000/users/connected/${username}`)
            .then(response => response.json())
            .then(data => {
                setFirstName(data.user.firstname)
            })

    }, [])
 // Deuxième useEffect pour récupérer les tweets chaque fois que isTweetAdded change
    useEffect(() => {
        fetch('http://localhost:3000/tweets/')
            .then(response => response.json())
            .then(data => {
                data.result && setTweets([...data.tweets])
            })
    }, [isTweetAdded])
 // Mappe chaque tweet à un composant Tweet pour l'affichage
    const tweetElements = tweets.map((e, i) => {

        return <Tweet key={i} {...e} currentDate />
    })
  // Déclare l'état local pour le hashtag
    const [hashtag, setHashtag] = useState('#');

    // Fonction pour gérer la recherche de tendance basée sur le hashtag
    const searchTrend = (e) => {
        const hashtagLength = e.target.value.length;
        if (hashtagLength < 2) {
            setHashtag('#')
        } else {
            setHashtag(e.target.value)
        }
    }
 // Rendu du composant Hashtag
    return (
        <div className={styles.homeBody}>
            <div className={styles.leftContainer}>
                <div className={styles.logoContainer}>
                    <Image className="logo" src="/twiter-inverse.png" alt="Logo" width={80} height={80} />
                </div>
                <div className={styles.profileAndButtonContainer}>
                    <div className={styles.userConnection}>
                        <img className={styles.profileImg} src="/egg.jpg" alt="img" />

                        <div className={styles.profileNames}><p className={styles.firstname}>{firstname}</p>
                            <p className={styles.username}>@{username}</p>
                        </div>

                    </div>
                </div>

            </div>

            <div className={styles.centerContainer}>
                <h2 className={styles.pageTitle}>Hashtag</h2>
                <div className={styles.writeTweet}>
                    <input className={styles.input} type="text" placeholder="What's up?" id="newTweet" onChange={(e) => { setMessage(e.target.value); setMessageLength(e.target.value.length) }} maxLength={280} value={message} style={{ 'resize': 'none' }} />
                </div>

                <div className={styles.tweetContainer}>

                    {tweetElements}

                </div>

            </div>

            <div className={styles.rightContainer}>

            </div>

        </div>
    )
};

export default Hashtag;


