import styles from './postcreator.module.scss';

import { useState } from 'react';

const PostCreator = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  const openCreator = () => {
    setIsOpen(true);
  }

  const closeCreator = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    setValue('');
  }

const createPost = async (e) => {
  e.preventDefault();
  try {
    if (!value) {
      return;
    }
    const payload = {
      author: localStorage.userId,
      text: value
    }

    const req = await fetch('http://localhost:5000/api/posts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(payload)
    });

    if (req) {
      closeCreator(e);
    }
  }
  catch (err) {
    console.error(err);
  }
};

  return (
    <div className={isOpen ? styles.containerFocused : styles.container} onClick={openCreator}>
      {isOpen ? (
        <>
          <textarea value={value} onChange={(e) => setValue(e.target.value)} className={styles.textFocused} maxLength='120' autoFocus></textarea>
          <div className={styles.submit} onClick={createPost}>POST</div>
          <div className={styles.closer} onClick={closeCreator}>x</div>
        </>
      ) : (
        <input type="text" placeholder="What's on your mind?" className={styles.text} readOnly/>
      )}
    </div>
  )

};

export default PostCreator;