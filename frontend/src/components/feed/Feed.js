import React, { useEffect, useState } from 'react';

const Feed = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));


  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

}

export default Feed;
