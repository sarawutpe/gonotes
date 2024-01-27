import React from 'react';
import NoteFolder from '@pages/NoteFolder/NoteFolder';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@pages/Home/Home';
// import NotFound from '@pages/NotFound/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index path="*" element={<Home />} />
        <Route path="/notefolder" element={<NoteFolder />} />
      </Routes>
    </Router>
  );
};

export default App;
