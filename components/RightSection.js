import styles from "../styles/RightSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateHashtag } from "../reducers/hashtags"
import { useRouter } from 'next/router'


function RightSection(){
    const router = useRouter()
    const dispatch = useDispatch()
    const hashtagToSave = useSelector((state) => state.hashtag.value)
    console.log(hashtagToSave)

    const handleRedirection = (name) => {
      dispatch(updateHashtag(name))
      setTimeout(function(){
        router.push("/trends")
     }, 1000);
    }


    const tweets = useSelector((state) => state.tweets.value);
    console.log("voici tweets l22 rightsection ",tweets , "voici hashtag l23 rightsection ", hashtagToSave)
    const hashtags = tweets?.map(e => e.hashtag?.map(e => e.toLowerCase()) || []).flat();
    const uHashtags = [...new Set(hashtags)].filter(e => e !== "")

    const leftCollContent = uHashtags.map(e => {
        const filter = hashtags.filter(item => item === e)
        return <div className={styles.itemTrend}>
            <h3 onClick={() => handleRedirection(e)}>{e}</h3>
            <span>{filter.length} Tweets</span>
        </div>
    })
 


    return(
    <div>
        <h2>Trends</h2>
        <div className={styles.trendsContainer}>
            {leftCollContent}
        </div>
     </div>
    )
}

export default RightSection