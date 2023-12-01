import { Sidebar, Feed, Widgets } from '../components/index'
import { useContext } from 'react'
import { TwitterContext } from '../context/TwitterContext'
import Image from 'next/image'
import MetaMaskImage from '../assets/metamask.png'
import ErrorImage from '../assets/error.png'

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
}

export default function Home() {
  const { appStatus, connectWallet } = useContext(TwitterContext)

  const app = (status = appStatus) => {
    switch (status) {
      case 'Connected':
        return userLoggedIn    
      
      case 'Not Connected':
        return noUserFound

      case 'noMetaMask':
        return noMetaMaskFound

      case 'error':
        return error
    
      default:
        return loading
    }
  }

  const userLoggedIn = (
    <div className={style.content}>
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  )

  const noUserFound = (
    <div className={style.loginContainer}>
      <Image src={MetaMaskImage} height={200} width={200}/>
      <div 
        className={style.walletConnectButton}
        onClick={() => connectWallet()}
      >
        Connect Wallet
      </div>
      <div className={style.loginContent}>Connect to Wallet</div>
    </div>
  )

  const error = (
    <div className={style.loginContainer}>
      <Image src={ErrorImage} height={250} width={250}/>
      <div className={style.loginContainer}>
        An error occurred. Please try again later or use another browser
      </div>
    </div>
  )

  const loading = (
  <div className={style.loginContainer}>
    <div className={style.loginContent}>Loading...</div>
  </div>
  )

  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <Image src={MetaMaskImage} height={200} width={200} />
      <div>
        <a
          target="_blank"
          rel='noreferrer'
          href={'https://metamask.io/download.html'}
        >
          You must install Metamask, a <br /> virtual Ethereum wallet in your browser
        </a>
      </div>
    </div>
  )

  return (
    <div className={style.wrapper}>{app(appStatus)}</div>
  )
}
