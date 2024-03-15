import styles from './postcreator.module.scss';

import { useState } from 'react';

const PostCreator = () => {

  const [isOpen, setIsOpen] = useState(false);

  const openCreator = () => {
    setIsOpen(true);
  }

  const closeCreator = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    console.log('pablo')
  }

  return (
    <div className={isOpen ? styles.containerFocused : styles.container} onClick={openCreator}>
      {isOpen ? (
        <>
          <textarea className={styles.textFocused} maxLength='120' autoFocus></textarea>
          <div className={styles.closer} onClick={closeCreator}>x</div>
        </>
      ) : (
        <input type="text" placeholder="What's on your mind?" className={styles.text} readOnly/>
      )}
    </div>
  )

};

export default PostCreator;