import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

import styles from '../styles';
import { PageHOC, CustomButton, CustomInput, GameLoading } from '../components';

const CreateBattle = () => {
  const { contract, battleName, setBattleName, gameData, setErrorMessage } = useGlobalContext();
  const [waitingBattle,setWaitingBattle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData?.activeBattles?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattles.name}`);
    } else if (gameData?.activeBattles?.battleStatus === 0) {
      setWaitingBattle(true);
    }
  }, [gameData])


  const handleClick = async () => {
    if (!battleName === '' || battleName.trim() === '') return null;

    try {
      await contract.createBattle(battleName, {
        gasLimit: 200000
      });

      setWaitingBattle(true);

    } catch (error) {
      setErrorMessage(error);
    }
  }


  return (
    <>
    {waitingBattle && <GameLoading />}
    <div className='flex flex-col mb-5'>
      <CustomInput
        Label="Battle Name"
        placeholder="Enter battle name"
        value={battleName}
        handleValueChange={setBattleName}
      />

      <CustomButton
        title="Create Battle"
        handleClick={handleClick}
        restType="mt-6"
      />
    </div>

    <p className={styles.infoText} onClick={() => navigate('/join-battle')}>Or join already existing battles</p>
    </>
  )
};

// taking over Home page under PageHOC component
export default PageHOC(
  CreateBattle, // Component props
  <>Create <br /> a new Battle</>, // title props
  <>Create your own battle and wait for other players to join you</> // description props
);