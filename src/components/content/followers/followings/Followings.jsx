import { useState, useEffect } from 'react';

import styles from './followings.module.scss';

const Followings = () => {

  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      const data = await fetch(`http://localhost:5000/api/${localStorage.userId}/followings`);
      const json = await data.json();
      setData(json)
    }
    catch (err) {
      console.error(err);
    }
  }

  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.title}>People you follow</div>
      <div className={styles.followings}>
        {data.length > 0 && data.map(item => {
          return <div>{item.username}</div>
        })}
      </div>
    </div>
  )
};

export default Followings;  