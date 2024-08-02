const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/movies/`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

// SHOW MOVIE
const show = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};

const create = async (movieFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// GET review
const getReview = async (movieId, reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/${reviewId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
    });
    return res.json();
  } catch (error) {
    console.log(error)
  }
}

const createComment = async (movieId, reviewId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/${reviewId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (movieId, reviewId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/${reviewId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    return res.json();
  } catch (error) {
    console.log(error)
  }
}

const updateComment = async (movieId, reviewId, commentId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/${reviewId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error)
  }
}

const deleteMovie = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function update(movieId, movieFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/edit`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export { index, show, create, getReview, createComment, deleteComment, updateComment, deleteMovie, update };