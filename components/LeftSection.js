import styles from "../styles/LeftSection.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {logout} from '../reducers/users';
import {useRouter} from 'next/router'




function LeftSection() {
    const router = useRouter()
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users.value);
    console.log('current user:', users)
    const clickLogout = () => {
        dispatch(logout())
        setTimeout(function(){
            router.push("/")
         }, 1000);
    }

    return (
        <div className={styles.mainContainerLeft}>
            <FontAwesomeIcon icon={faTwitter} className={styles.iconBack} onClick = {() => router.push("/tweets")
     }/>
            <div className={styles.userinfos}>
                <div className={styles.imgContainer}></div>
                <div className={styles.currentUser}>
                    
                    <Image
          src="/images/egg.jpg"
          alt="Profile"
          width={70}
          height={70}
          className={styles.profileImage}
        />
                    <div>
                        <p className={styles.name}>{users.name}</p>
                        <p className="username">@{users.name}</p>
                    </div>
                    <div onClick={() => clickLogout()} className="btnLogout">Log Out</div>
                </div>
            </div>
        </div>
    )
}

export default LeftSection;