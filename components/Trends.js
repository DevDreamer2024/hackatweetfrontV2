import styles from "../styles/Trends.module.css";
import LeftSection from "./LeftSection";
import ItemTweet from "./ItemTweet";
import RightSection from "./RightSection"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {initialiseTweets } from "../reducers/tweets";

function Trends() {

  const hashtagToSave = useSelector((state) => state.hashtag.value)
  const [trendToSearch, setTrendToSearch] = useState(hashtagToSave);
  const dispatch = useDispatch()
  const tweets = useSelector((state) => state.tweets.value);


  let itemTweet;
  let content = []; 

  useEffect(() => {
    fetch(`http://localhost:3000/tweets/#${trendToSearch}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          itemTweet = data.data.filter(e => e.hashtag.includes(trendToSearch))
          dispatch(initialiseTweets(itemTweet.reverse()));
          console.log("itemTweet", itemTweet)
          console.log("content1", content)
        }
      });

  }, [trendToSearch]);

  const filteredTweet = tweets.map((data, i) => <ItemTweet key={i} {...data} />);


  if(itemTweet){
    content = itemTweet.map((data, i) => <ItemTweet key={i} {...data} />)
  }

  console.log("content", content)

  return (
    <div className={styles.mainSection}>
      <div className={styles.leftSection}>
        <LeftSection />
      </div>
      <div className={styles.middleSection}>
        <div className={styles.middleHead}>
          <div className={styles.trendHeader}>
            <h2>Trends</h2>
            <input
              className={styles.trendSearch}
              type="search"
              placeholder="#Hashtag"
              onChange={(e) => setTrendToSearch(e.target.value)}
              value={trendToSearch}
            />
          </div>
        </div>
        <div className={styles.tweetContainer}>
          {filteredTweet}
        </div>
      </div>
      <div className={styles.rightSection}>
        <RightSection />
      </div>
    </div>
  );
}

export default Trends;
