import styles from './commentslist.module.scss';
import Comment from '../comment/Comment';
import { CommentContext } from '../../../contexts/context';

import ReactLoading from 'react-loading';
import { useContext } from 'react';

const Comments = () => {

  const { comments } = useContext(CommentContext);

  let key = 0;

  if (!comments) {
    return (
      <div className={styles.loading}>
        <ReactLoading type='spin' width={'48px'}/>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      { comments && comments.length > 0 && 
          comments.map(comment => {
            return <Comment key={key++} data={comment}/>
      })}
    </div>
  )
}

export default Comments;