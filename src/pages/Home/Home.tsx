import React, { useState, useRef } from 'react';
import NoteEditor, { NoteEditorRef } from '@pages/Home/NoteEditor';
import AppTheme from '@components/AppTheme';
import AppThemeHeader from '@components/AppThemeHeader';
import { useParams } from 'react-router-dom';
import AppThemeContent from '@components/AppThemeContent';
import NoteFolderListbox from '@pages/Home/NoteFolderListbox';
import NoteHeader from '@pages/Home/NoteHeader';

const Home: React.FC = () => {
  const { noteId } = useParams();
  const noteEditorRef = useRef<NoteEditorRef | null>(null);
  const [isOpenModalNoteFolder, setIsOpenModalNoteFolder] = useState<boolean>(false);

  const handleModalNoteFolder = () => {
    setIsOpenModalNoteFolder((prev) => !prev);
  };

  const handleOnCallbackAddNewNote = () => {
    if (!noteEditorRef.current) return;
    noteEditorRef.current.onAddNewNote();
  };

  return (
    <AppTheme>
      <AppThemeHeader>
        <NoteHeader
          onCallbackOpenModalNoteFolder={handleModalNoteFolder}
          onCallbackAddNewNote={handleOnCallbackAddNewNote}
        />
      </AppThemeHeader>
      <AppThemeContent>
        <NoteEditor ref={noteEditorRef} noteId={noteId} />
      </AppThemeContent>
      <NoteFolderListbox open={isOpenModalNoteFolder} onClose={handleModalNoteFolder} />
    </AppTheme>
  );
};

export default Home;
