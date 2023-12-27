import React from 'react'
import GetInTouch from '../components/GetInTouch';
import GetStarted from '../components/GetStarted';
import Header from '../components/Header';
import Search from '../components/Search';


const Home = () => {
  return (
    <>

      <Header />
      <Search />
      <GetStarted />
      <GetInTouch />
    </>

  )
}

export default Home