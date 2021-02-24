import styles from '../styles/pages/Profile.module.css'

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/jvbs.png" alt="João Vitor"/>
      <div>
        <strong>João Vitor</strong>
        <p>Level 1</p>
      </div>
    </div>
  )
}

export default Profile