const likeSwitch = async (array, setArray, data, setData, state, setState, id, api) => {
  try {
    let updatedLikes; 

    if (data.likes) {
      updatedLikes = [...data.likes];
    }
    else {
      updatedLikes = [];
    }

    if (!data.likes.includes(localStorage.userId)) {
      updatedLikes.push(localStorage.userId);
      setState(true);
    }
    else {
      const index = updatedLikes.indexOf(localStorage.userId);
      if (index !== -1) {
        updatedLikes.splice(index, 1);
      }
    }

    const updatedItems = array.map(item => {
      if (item._id === id) {
        return {
          ...item,
          likes: updatedLikes
        }
      }
      return item;
    });

    setArray(updatedItems);

    setData(prevData => ({
      ...prevData, likes: updatedLikes
    }));

    setState(!state);

    await fetch(api, {
      method: 'POST'
    });
  }
  catch (err) {
    console.error(err.message);
  }
};

export { likeSwitch };

