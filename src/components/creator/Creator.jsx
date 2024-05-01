import { Context } from '../../contexts/context';
import styles from './creator.module.scss';

import { useContext, useState } from 'react';

const Creator = ({placeholder, submitText, isComment, maxLength, postId, setState}) => {

  const { posts, setPosts, bearer } = useContext(Context);

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
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      body: JSON.stringify(payload)
    });

    if (req) {
      const json = await req.json();
      if (setState) {
        if (isComment) {
          let updatedPosts = [];
          for (let post of posts) {
            if (post._id === postId) {
              let updatedComments = [...post.comments, payload];
              updatedPosts.push({...post, comments: updatedComments});
            }
            else {
              updatedPosts.push(post);
            }
          }
          setPosts(updatedPosts);
        }
        setState(prevData => [json, ...prevData]);
      }
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