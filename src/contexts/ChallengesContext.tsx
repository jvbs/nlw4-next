import { useState, createContext, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  completeChallenge: () => void;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

//* realizando tipagem da children
interface ChallengesProviderProps {
  children: ReactNode,
  level: number,
  currentExperience: number,
  challengesCompleted: number
  //* ReactNode assimila qualquer tipo de elemento para children
  //* seja tag html ou componente react (como neste caso)
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider = ({ 
  children,
  //* trazendo todas as propriedades exceto a children dentro
  //* do ...rest operator
  ...rest
}: ChallengesProviderProps) => {
  // * ?? -> se não existir, retornar o default
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', level.toString())
    Cookies.set('currentExperience', currentExperience.toString())
    Cookies.set('challengesCompleted', challengesCompleted.toString())
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} de xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    // buscando a qtd de xp do desafio ativo
    const { amount } = activeChallenge
    // atualizando pontuação final
    let finalExperience = currentExperience + amount
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge
      }}>
      { children}
    </ChallengesContext.Provider>
  )
}