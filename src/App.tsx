import React from 'react';

//React Router
import {
  Route,
  Routes
} from 'react-router-dom';

//Pages
import MainPage from './Pages/MainPage/MainPage';
import Collection from './Pages/Collection/Collection';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:collectionID" element={<Collection />} />
      </Routes>
    </>
  );
}

export default App;
