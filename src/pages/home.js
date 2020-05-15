import React from 'react';
import TitleBar from '../components/titlebar.js'
import axios from 'axios'
function HomePage() {
  React.useEffect(function() {
    axios.get("http://127.0.0.1:8080/api/v1/messages",{mode:"no-cors"}).then(function(result) {
      console.log(result)
    })
  },[])
  return (
    <>
        <TitleBar type="hometitle" />
    </>
  );
}

export default HomePage;
