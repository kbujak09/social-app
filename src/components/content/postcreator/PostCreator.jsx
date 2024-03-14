import styles from './postcreator.module.scss';

import { useState } from 'react';

const PostCreator = () => {

  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div className={styles.containerFocused}>
        <textarea type="text" className={styles.textFocused}></textarea>
      </div>
    )
  }

  return (
    <div className={styles.container} onClick={() => setIsOpen(true)}>
      <input type='text' placeholder="What's on your mind?" className={styles.text} readonly/>
    </div>
  )

};

export default PostCreator;