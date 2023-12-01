import { useState, useContext } from "react"
import InitialState from '../mintinModal/InitialState'
import LoadingState from '../mintinModal/LoadingState'
import FinishedState from '../mintinModal/FinishedState'
import { useRouter } from "next/router"
import { client } from "../../lib/client"
import { contractABI, contractAddress } from "../../lib/constants"
import { ethers } from "ethers"
import { TwitterContext } from "../../context/TwitterContext"
import { pinJSONToIPFS, pinFileToIPFS } from '../../lib/pinata'


let metamask
let window

if(typeof window !== 'undefined') {
  metamask = window.ethereum
}

const getEthereumContract = async () => {
  if (!metamask) return
  const provider = new ethers.providers.Web3Provider(metamask)
  const signer = provider.getSigner()
  const transaction = new ethers.Contract(contractAddress, contractABI, signer)

  return transaction;

}

const ProfileImageMinter = () => {
    const { currentAccount, setAppStatus } = useContext(TwitterContext)
    const router = useRouter()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('initial')
    const [profileImage, setProfileImage] = useState()

    const mint = async () => {
      if (!name || !description || !profileImage) return
      setAppStatus('loading')

      const pinataMetadata = {
        name: `${name} -${description}`
      }

      const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetadata)

      await client
      .patch(currentAccount)
      .set({ profileImage: ipfsImageHash })
      .set({ isProfileImageNft: true })
      .commit()

      const imageMetaData = {
        name: name,
        description: description,
        image: `ipfs://${ipfsImageHash}`,
      }

      const ipfsJsonHash = await pinJSONToIPFS(imageMetaData, pinataMetadata)
      const contract = await getEthereumContract()

      const transactionParameters = {
        to: contractAddress,
        from: currentAccount,
        data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`)
      }

      await metamask.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })

      setAppStatus('finished')


    }

    const modalChildren = (modalStatus = status) => {
        switch (modalStatus) {
            case 'initial':
              return (
              <InitialState
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              mint={mint}
              />
            )

            case 'loading':
              return <LoadingState />

            case 'finished':
              return <FinishedState />
                
            default:
              router.push('/')
              setAppStatus('error')
              break        
        }
    }

  return (
    <>{modalChildren(status)}</>
  )
}

export default ProfileImageMinter