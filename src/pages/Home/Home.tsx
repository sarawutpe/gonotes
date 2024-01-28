import React, { useState, useEffect } from 'react';
import Editor from '@pages/Home/Editor';
import AppTheme from '@components/AppTheme';
import AppThemeHeader from '@components/AppThemeHeader';
import { useParams } from 'react-router-dom';
import AppThemeContent from '@components/AppThemeContent';
import NoteFolderListbox from '@pages/Home/NoteFolderListbox';
import NoteHeader from '@pages/Home/NoteHeader';

const Home: React.FC = () => {
  const params = useParams();
  const [noteId, setNoteId] = useState('');
  const [isOpenModalNoteFolder, setIsOpenModalNoteFolder] = useState<boolean>(false);

  const handleModalNoteFolder = () => {
    setIsOpenModalNoteFolder((prev) => !prev);
  };

  useEffect(() => {
    if (params.noteId) {
      setNoteId(params.noteId);
    }
  }, [params.noteId]);

  return (
    <AppTheme>
      <AppThemeHeader>
        <NoteHeader onClickModalNoteFolder={handleModalNoteFolder} />
      </AppThemeHeader>
      <AppThemeContent>
        <Editor id={noteId} />
      </AppThemeContent>
      <NoteFolderListbox open={isOpenModalNoteFolder} onClose={handleModalNoteFolder} />
    </AppTheme>
  );
};

export default Home;
