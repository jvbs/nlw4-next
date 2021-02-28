import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

const Profile = () => {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/jvbs.png" alt="João Vitor" />
      <div>
        <strong>João Vitor</strong>
        <p>
          <img src="icons/level.svg" alt="Level icon" />
          Level {level}</p>
      </div>
    </div>
  )
}

export default Profile