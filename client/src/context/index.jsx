import React, { useReducer, createContext, useEffect, useRef, useState, useContext } from "react";
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import {ABI, ADDRESS } from '../contract';
import { createEventListeners } from "./createEventListeners";
import { GetParams } from '../utils/onboard';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [provider, setProvider] = useState('');
    const [contract, setContract] = useState('');
    const [showAlert, setShowAlert] = useState({ status: false, type: 'info', message: ''});
    const [battleName, setBattleName] = useState('');
    const [gameData, setGameData] = useState({
        players: [], pendingBattles: [], activeBattles: [], endedBattles: []
    });
    const [updateGameData, setUpdateGameData] = useState(0);
    const [battleGround, setBattleGround] = useState('bg-astral');
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    const player1Ref = useRef();
    const player2Ref = useRef();
  

    const navigate = useNavigate();

    useEffect(() => {
        const isBattlegroundLocalStorage = localStorage.getItem('battleground');

        if (isBattlegroundLocalStorage) {
            setBattleGround(isBattlegroundLocalStorage);
        }
        else {
            localStorage.setItem('battleground', battleGround);
        }
    },[]);

    // Reset Web3 onboarding modal params
    useEffect(() => {
        const resetParams = async () => {
            const currentStep = await GetParams();

            setStep(currentStep.step);
        }

        resetParams();

        window?.ethereum?.on('chainChanged', () => resetParams());
        window?.ethereum?.on('accountsChanged', () => resetParams());

    },[])

    // Set the wallet address to the state
    const updateWalletAddress = async () => {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });

        if (accounts) setWalletAddress(accounts[0]);
    }

    useEffect(() => {
        updateWalletAddress();

        window.ethereum.on('accountsChanged', updateWalletAddress);
    }, []);


    // Set the smart contract the provider to the state
    useEffect(() => {
        const setSmartContractAndProvider = async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const newProvider = new ethers.providers.Web3Provider(connection);
            const signer = newProvider.getSigner();
            const newContract = new ethers.Contract(ADDRESS, ABI, signer);

            setProvider(newProvider);
            setContract(newContract);
        }

        setSmartContractAndProvider();
    }, []);



    useEffect(() => {
        if (step !== -1 && contract) {
            createEventListeners({
                navigate, contract, provider, 
                walletAddress, setShowAlert,
                setUpdateGameData, player1Ref,
                player2Ref,
            })
        }
    }, [contract, step]);


    // Show Alert
    useEffect(() => {
        if (showAlert?.status) {
            const timer = setTimeout(() => {
                setShowAlert({ status: false, type: 'info', message: '' })
            }, [5000])

            return () => clearTimeout(timer);
        }
    },[showAlert]);

    // Handle error messages
    useEffect(() => {
        if (errorMessage) {
            const parsedErrorMessage = errorMessage?.reason?.slice('execution reverted: '.length).slice(0, -1);

            if (parsedErrorMessage) {
                setShowAlert({
                status: true,
                type: 'failure',
                message: parsedErrorMessage,
              });
            }
          }
    },[errorMessage]);

    // Set the game data to the state
    
    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const allBattles = await contract.getAllBattles();
                const battlesPending = allBattles.filter((battle) => battle.battleStatus === 0);
                let activeBattle = null;

                allBattles.forEach((battle) => {
                    if(battle.players.find((player) => player.toLowerCase() === walletAddress.toLocaleLowerCase())) {
                        if(battle.winner.startsWith('0x00')) {
                            activeBattle = battle;
                        }
                    }
                });

                setGameData({
                    pendingBattles: battlesPending.slice(1),
                    activeBattles: activeBattle,
                });

            } catch (error) {
                setErrorMessage(error);
            }
        }

        if(contract) fetchGameData();
    },[contract, updateGameData])

    return (
        <GlobalContext.Provider value={{ 
            walletAddress, provider, contract, 
            showAlert, setShowAlert, battleName, 
            setBattleName, gameData, battleGround,
            setBattleGround, errorMessage, setErrorMessage,
            player1Ref, player2Ref, updateWalletAddress
            }}>
            {children}
        </GlobalContext.Provider>   
    )
};


export const useGlobalContext = () => useContext(GlobalContext);