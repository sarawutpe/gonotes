import React from 'react';
import NoteFolder from '@pages/NoteFolder/NoteFolder';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@pages/Home/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note-folder/*" element={<NoteFolder />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
