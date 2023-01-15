import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHOC, CustomInput, CustomButton } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { walletAddress, contract, setShowAlert, gameData, setErrorMessage } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();


  const handleClick = async () => {
    try {
      const playerExist = await contract.isPlayer(walletAddress);

      if (!playerExist) {
        await contract.registerPlayer(playerName, playerName, {
          gasLimit: 200000
        });

        setShowAlert({
          status: true, 
          type: 'info',
          message: `${playerName} has been registered successfully!`
        })
        console.log(contract)
      }

    } catch (error) {
      setErrorMessage(error)
    }
  }

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExist = await contract?.isPlayer(walletAddress);
      const playerTokenExist = await contract.isPlayerToken(walletAddress);
      
      if(playerExist && playerTokenExist) navigate('/create-battle')
    }

    checkForPlayerToken();
  }, [contract]);

  useEffect(() => {
    if(gameData.activeBattles) {
      navigate(`/battle/${gameData.activeBattles.name}`)
    }
  },[gameData])
  
  return (
    <div className='flex flex-col'>
      <CustomInput
        Label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <CustomButton
        title="Register"
        handleClick={handleClick}
        restType="mt-6"
      />
    </div>
  )
};

// taking over Home page under PageHOC component
export default PageHOC(
  Home, // Component props
  <>Welcome to Avax Gods <br /> a Web3 NFT Card Game</>, // title props
  <>Connect your wallet to start playing the game <br /> the ultimate Web3 Battle Card Game</> // description props
);