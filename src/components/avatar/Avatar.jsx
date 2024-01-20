import styles from './avatar.module.scss';
import avatar1 from '../../assets/avatar1.webp';
import avatar2 from '../../assets/avatar2.webp';
import avatar3 from '../../assets/avatar3.webp';
import avatar4 from '../../assets/avatar4.webp';
import avatar5 from '../../assets/avatar5.webp';
import avatar6 from '../../assets/avatar6.webp';
import avatar7 from '../../assets/avatar7.webp';
import avatar8 from '../../assets/avatar8.webp';


const Avatar = ({id}) => {
  
  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8
  ]

  return (
    <div className={styles.container}>
      <img src={avatars[id.slice(-1) - 1]} alt="avatar" />
    </div>
  )
}

export default Avatar;