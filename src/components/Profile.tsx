import styles from '../styles/components/Profile.module.css'

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/jvbs.png" alt="João Vitor"/>
      <div>
        <strong>João Vitor</strong>
        <p>
          <img src="icons/level.svg" alt="Level icon"/>
          Level 1</p>
      </div>
    </div>
  )
}

export default Profile