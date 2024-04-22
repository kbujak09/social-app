import styles from './creator.module.scss';

import { useState } from 'react';

const Creator = ({placeholder, submitText, isComment, maxLength, postId}) => {

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

    const req = await fetch(`${isComment ? `http://localhost:5000/api/posts/${postId}/comment` : 'http://localhost:5000/api/posts'}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(payload)
    });

    console.log(req);

    if (req) {
      closeCreator(e);
    }
  }
  catch (err) {
    console.error(err);
  }
};

  return (
    <div className={isOpen ? `${styles.container} ${isComment ? styles.containerFocusedComment : styles.containerFocused}` : styles.container} onClick={openCreator}>
      {isOpen ? (
        <>
          <textarea value={value} onChange={(e) => setValue(e.target.value)} className={styles.textFocused} maxLength={maxLength} autoFocus></textarea>
          <div className={styles.submit} onClick={createPost}>{submitText}</div>
          <div className={styles.closer} onClick={closeCreator}>x</div>
        </>
      ) : (
        <input type="text" placeholder={placeholder} className={styles.text} readOnly/>
      )}
    </div>
  )

};

export default Creator;