import { Context } from '../../contexts/context';
import styles from './creator.module.scss';

import { useContext, useState } from 'react';

const Creator = ({placeholder, submitText, isComment, maxLength, postId, setState, commentsCount, state}) => {

  const { posts, setPosts, bearer, ip } = useContext(Context);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const openCreator = () => {
    setIsOpen(true);
  }

  const closeCreator = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    setValue('');
  }

const createPost = async (e) => {
  if (!isCreating) {
    e.preventDefault();
  try {
    setIsCreating(true);
    if (!value) {
      return;
    }
    const payload = {
      author: localStorage.userId,
      text: value
    }

    const req = await fetch(`${isComment ? `${ip}/api/posts/${postId}/comment` : `${ip}/api/posts`}`, {
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
        const newData = [json, ...state];
        setState(newData);
      }
      setIsCreating(false);
      closeCreator(e);
    }
  }
  catch (err) {
    console.error(err);
  }
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