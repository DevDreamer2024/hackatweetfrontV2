import styles from "../styles/Tweets.module.css";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTweets, initialiseTweets } from "../reducers/tweets";
import ItemTweet from "./ItemTweet";

function Tweets() {
  const dispatch = useDispatch();
  const [tweetToPost, setTweetToPost] = useState("");
  const currentUser = useSelector((state) => state.users.value);
  const newTweet = useSelector((state) => state.tweets.value);
  useEffect(() => {
    const fetchTweets = () => {
    fetch("http://localhost:3000/tweets", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          dispatch(initialiseTweets(data.data.reverse())); // Initialise les tweets dans le store Redux en inversant l'ordre
        }
      });
    };
      fetchTweets();
      const interval = setInterval(fetchTweets, 1000); // Rafraîchit les tweets toutes les 1 secondes
      return () => clearInterval(interval);
  }, [dispatch, newTweet]);

const sentNewTweet = () => {
  // Prépare le corps de la requête avec les informations du tweet
  const requestBody = {
      name: currentUser.name,
      username: currentUser.username,
      tweet: tweetToPost,
  };

  fetch("http://localhost:3000/tweets/newtweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
  })
  .then((response) => response.json())
  .then((data) => {
      // Réinitialise l'état du tweet à poster avant d'ajouter le nouveau tweet au store Redux
      setTweetToPost("");
      // Ajoute le nouveau tweet au store Redux
      dispatch(addTweets(data.data));
  })
  .catch((error) => console.error('Erreur lors de l\'envoi du tweet:', error));
};

  const tweets = useSelector((state) => state.tweets.value);  // Sélectionne les tweets depuis le store Redux

  const itemTweet = tweets.map((data, i) => <ItemTweet key={i} {...data} />); // Crée un composant ItemTweet pour chaque tweet
  return (
    <div className={styles.mainSection}>
      <div className={styles.leftSection}>
        <LeftSection />
      </div>
      <div className={styles.middleSection}>
        <div className={styles.middleHead}>
          <h2>Home</h2>
          <div className={styles.tweetPostContainer}>
            <input
              type="text-area"
              onChange={(e) => setTweetToPost(e.target.value)} // Met à jour l'état avec le contenu du tweet
              value={tweetToPost}
              placeholder="Post something"
            />
            <div className={styles.posterBottom}>
              <span className={styles.stringCounter}>
                {tweetToPost.length}/280
              </span>
              <div onClick={() => sentNewTweet()} className={styles.btnTweet}>
                Tweet
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tweetContainer}>{itemTweet}</div>
      </div>
      <div className={styles.rightSection}>
        <RightSection />
      </div>
    </div>
  );
}

export default Tweets;
