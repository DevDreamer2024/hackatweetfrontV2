import styles from '../styles/Login.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from './Signup';
import SignIn from './Signin';
import { Button, Modal  } from "antd";
import Image from 'next/image';

import { useRouter } from 'next/router';



function Login() {


  const dispatch = useDispatch();
  const router = useRouter();

  const [modalOpenSignUp, setmodalOpenSignUp] = useState(false);
  const [modalOpenSignin, setmodalOpenSignin] = useState(false);


  return (
    <>
    <div className='main'>
      <div className={styles.container}>
        <div className={styles.columnLeft}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/twiter-bg.jpg" 
              alt="Twiter intro"
              layout="fill"
              className={styles.customImage}
            />
          </div>
        </div>
        <div className={styles.columnRight}>
          <div className={styles.columnRightContent}>
            <Image src="/images/twiter-inverse.png" alt="twiter logo" width={70} height={70} />
            <h1>See what's <br />happening</h1>
            <h2>Join Hacktweet today.</h2>
            <Button type="primary" shape="round" onClick={() => setmodalOpenSignUp(true)}> SignUp </Button>
            <Modal
              centered
              open={modalOpenSignUp}
              onOk={() => setmodalOpenSignUp(false)}
              onCancel={() => setmodalOpenSignUp(false)}
              className='customModal'
              footer={null}
            >
              <SignUp />
            </Modal>
            <p>Already have an account?</p>
            <Button type="primary" shape="round" ghost onClick={() => setmodalOpenSignin(true)}>
              SignIn
            </Button>
            <Modal
              centered
              open={modalOpenSignin}
              onOk={() => setmodalOpenSignin(false)}
              onCancel={() => setmodalOpenSignin(false)}
              className= 'customModal' 
              footer={null}
            >
              <SignIn />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default Login;
