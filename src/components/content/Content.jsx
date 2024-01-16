import styles from './content.module.scss';

const Content = () => {

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div onClick={logOut}>log out</div>
  )
}

export default Content;