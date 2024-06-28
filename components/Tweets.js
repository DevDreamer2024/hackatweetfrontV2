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

  useEffect(() => {
    fetch("http://localhost:3000/tweets", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          dispatch(initialiseTweets(data.data.reverse()));
        }
      });
  }, []);

  const sentNewTweet = () => {
    fetch("http://localhost:3000/tweets/newtweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: currentUser.name,
        username: currentUser.username,
        tweet: tweetToPost,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addTweets(data.data));
      })
      .then(setTweetToPost(""));
  };

  const tweets = useSelector((state) => state.tweets.value);

  const itemTweet = tweets.map((data, i) => <ItemTweet key={i} {...data} />);
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
              onChange={(e) => setTweetToPost(e.target.value)}
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
