import styles from './comments.module.scss';

const Comments = ({comments}) => {

  return (
    <div className={styles.container}>
      { comments && comments.length > 0 && 
          comments.map(comment => {
            return <div>{comment}</div>
      })}
    </div>
  )
}

export default Comments;