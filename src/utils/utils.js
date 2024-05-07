const likeSwitch = async (array, setArray, data, setData, state, setState, id, api, bearer) => {
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

    const req = await fetch(api, {
      method: 'POST',
      headers: {
        'Authorization': bearer
      }
    });

    if (req.ok) {
      setArray(updatedItems);

      setData(prevData => ({
        ...prevData, likes: updatedLikes
      }));

      setState(!state);
    }

  }
  catch (err) {
    console.error(err.message);
  }
};

export { likeSwitch };

