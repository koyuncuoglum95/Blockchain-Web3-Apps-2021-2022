import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import styles from '../styles';
import { useGlobalContext } from '../context'
import { Alert, ActionButton, Card, GameInfo, PlayerInfo } from '../components';
import { attack, attackSound, defense, defenseSound, player01 as player01Icon, player02 as player02Icon } from '../assets';
import { playAudio } from '../utils/animation';

const Battle = () => {

  const { contract, gameData, walletAddress, showAlert, setShowAlert, battleGround, setErrorMessage, player1Ref, player2Ref } = useGlobalContext();
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const { battleName } = useParams();

  console.log(gameData);

  useEffect(() => {
    const getPlayerInfo = async () => {
      try {
        let player01Address = null;
        let player02Address = null;

        if (gameData.activeBattles.players[0].toLowerCase() === walletAddress.toLowerCase()) {
          player01Address = gameData.activeBattles.players[0];
          player02Address = gameData.activeBattles.players[1];

        } else {
          player01Address = gameData.activeBattles.players[1];
          player02Address = gameData.activeBattles.players[2];
        }
        
        const p1TokenData = await contract.getPlayerToken(player01Address);
        const player01 = await contract.getPlayer(player01Address);
        const player02 = await contract.getPlayer(player02Address);


        const p1Attack = p1TokenData.attackStrength.toNumber();
        const p1Defense = p1TokenData.defenseStrength.toNumber();
        const p1Health = player01.playerHealth.toNumber();
        const p1Mana = player01.playerMana.toNumber();
        const p2Health = player02.playerHealth.toNumber();
        const p2Mana = player02.playerMana.toNumber();

        setPlayer1({ ...player01, attack: p1Attack, defense: p1Defense, health: p1Health, mana: p1Mana });
        setPlayer2({ ...player02, attack: 'X', defense: 'X', health: p2Health, mana: p2Mana });


      } catch (error) {
        setErrorMessage(error);
      }
    };
    if(contract && gameData.activeBattles) getPlayerInfo();
  },[contract, gameData, battleName]);

  const makeMove = async (choice) => {
    playAudio(choice === 1 ? attackSound : defenseSound);

    try {
      await contract.attackOrDefendChoice( choice, battleName, {
        gasLimit: 200000
      });

      setShowAlert({
        status: true,
        type: 'info',
        message: `Starting ${choice === 1 ? 'attack' : 'defense'}`
      });
      
    } catch (error) {
      setErrorMessage(error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!gameData?.activeBattles) navigate('/');
    }, [2000]);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround}`}>
      {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message}/>}

      <PlayerInfo player={player2} playerIcon={player02Icon} mt />

      <div className={`${styles.flexCenter} flex-col my-10`}>
        <Card 
          card={player2}
          title={player2?.playerName}
          cardRef={player2Ref}
          playerTwo
        />

        <div className='flex items-center flex-row'>

          <ActionButton 
            imgUrl={attack}
            handleClick={() => makeMove(1)}
            restType="mr-2 hover:border-yellow-400"
          />

          <Card 
            card={player1}
            title={player1?.playerName}
            cardRef={player1Ref}
            restType="mt-3"
          />

          <ActionButton 
            imgUrl={defense}
            handleClick={() => makeMove(2)}
            restType="ml-6 hover:border-red-600"
          />

        </div>
      </div>

      <PlayerInfo player={player1} playerIcon={player01Icon} mt />

      <GameInfo/>
    </div>
  )
}

export default Battle