import styles from '../styles/SignIn.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/users';
import Image from 'next/image';
import { useRouter } from 'next/router';
function SignIn() {

  const[signInUsername, setSignInUsername] = useState('');
  const[signInPassword, setSignInPassword] = useState('');
  const[connectionError, setConnectionError] = useState(false);
  const dispatch = useDispatch();
const router = useRouter();
	const handleConnection = () => {

		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
          console.log('La personne existe bien');
          dispatch(login({username: signInUsername, token : data.token , name : data.name}));
					setSignInUsername('');
					setSignInPassword('');
					setConnectionError(false);
                    router.push('/tweets')
				} else {
					setConnectionError(true);//si l'utilisateur n'existe pas un message conditionnel apparait en return
				}
			});
	};


  return (
    <div>
      <div className={styles.registerContainer}>
				<div className={styles.registerSection}>
					<Image src="/images/twiter-inverse.png" alt="twiter logo" width={70} height={70} />
					<p>Connect to Hackatweet</p>
					<input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
					<input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
					<button id="connection" onClick={() => handleConnection()}>Sign In</button>
					{connectionError && <p>User not found or invalid credential</p>}
				</div>
			</div>
    </div>
  );
}

export default SignIn;