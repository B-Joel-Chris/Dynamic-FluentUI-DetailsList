import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';

import { faker } from '@faker-js/faker';
import DetailsListDocumentsExample from './components/Dynamicdetails';

function App() {

  const ldata:any = [];

  const getDataRow = () =>{
    const personname = faker.person.fullName();
    const personage = Math.floor(Math.random()*101)
    const personPosition = faker.person.jobTitle();
    const personLocation = faker.location.county();
    const occupation = faker.hacker.verb();
    return {name:personname,age:personage,position:personPosition,location:personLocation,occupation:occupation}
  }

  const generateData = () =>{
    for(let i = 0;i<80;i++){
      ldata.push(getDataRow())
    }
    console.log(ldata);
    return ldata
  }

  return (
    <div className="App">
      <DetailsListDocumentsExample column={['name','age','position','location','occupation'] } rowdata={generateData()}/>
    </div>
  );
}

export default App;
