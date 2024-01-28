import React from 'react';
import NoteFolder from '@pages/NoteFolder/NoteFolder';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@pages/Home/Home';
import MyNote from '@pages/NoteFolder/MyNote';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/:noteId" element={<Home />} />
        <Route path="/notefolder" element={<NoteFolder />} />
        <Route path="/notefolder/mynote/:groupId" element={<MyNote />} />
        <Route index path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
