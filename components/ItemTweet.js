import styles from "../styles/Tweets.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faHeart, faTrash} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import{ removeTweets} from '../reducers/tweets';
import { useState } from "react";

function ItemTweet(props) {
    
    const dispatch= useDispatch()
    const currentUser = useSelector((state) => state.users.value);
    const [likes, setLikes] = useState(props.likes);
    const [isLiked, setIsLiked] = useState(props.likedBy.includes(currentUser.token));
    const userToken = currentUser.token;
    //delete
    const deleteTweet =() => {
        console.log('props:',props)
        dispatch(removeTweets(props))
        fetch('http://localhost:3000/tweets/delete', {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({tweet: props.tweet, username: props.username }),
        })
        .then(response => response.json())
        .then(data => console.log('deleted :', data))
    }
    //like/dislike
    const coeurColor = isLiked ? { color: 'red' } : {};

    const handleLike = () => {

        fetch(`http://localhost:3000/tweets/togglelike/`+props._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userToken: userToken,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            
            setIsLiked(!isLiked);
            setLikes(data.likes);
            console.log(isLiked);
          })
          .catch((error) => {
            console.log(error);
          });
      };

    
    const dataFormatted = (date) => {

        const tweetDate = new Date(date);
    
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
      };
    
    return (
        <div className={styles.tweetItem}>
            <div className={styles.tweetHead}>
                <div className="avatar"><Image
          src="/images/egg.jpg"
          alt="Profile"
          width={70}
          height={70}
          className={styles.profileImage}
        /></div>
                <p className={styles.name}>{props.name}</p>
                <span className="username">@{props.username}</span>
                <span>{dataFormatted(props.date)}</span>
            </div>
            <div className={styles.tweetBody}>
                <p>{props.tweet}</p>
            </div>
            <div className={styles.tweetBottom}>
                <FontAwesomeIcon onClick={() => handleLike()} icon={faHeart} className={styles.iconCoeur} style={coeurColor} />
                <span className={styles.likeCounter}>{props.likes}</span>
                {currentUser.username===props.username ? <FontAwesomeIcon className={styles.iconTrash} onClick={ ()=> deleteTweet(props)} icon={faTrash}/> : ''}
            </div>
        </div>
    )

}

export default ItemTweet;