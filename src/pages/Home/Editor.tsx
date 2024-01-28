import { setCurrentNote } from '@redux/features/noteReducer';
import { chromeAddNote, chromeGetNote, chromeUpdateNote } from '@services/webextension';
import { Note } from '@services/webextension.type';
import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  },
};

const Editor: React.FC = () => {
  const [note, setNote] = useState<Note>({
    id: '',
    groupId: '',
    content: '',
    createdDate: '',
    updatedDate: '',
  });

  const dispatch = useDispatch();

  const handleQuillChange = (content: string) => {
    setNote({ ...note, content: content });
    if (!note.id) {
      // Add a new note
      chromeAddNote(content);
    } else {
      // Update note by id
      chromeUpdateNote(note.id, content);
    }
  };

  const handleRestoreNote = useCallback(async () => {
    try {
      const note = await chromeGetNote();
      if (note) {
        console.log(note);
        setNote(note);
        dispatch(setCurrentNote(note));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleRestoreNote();
  }, [handleRestoreNote]);

  return (
    <ReactQuill theme="snow" value={note.content} onChange={handleQuillChange} modules={modules} />
  );
};

export default Editor;
