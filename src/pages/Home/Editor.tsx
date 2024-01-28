import { setCurrentNote } from '@redux/features/noteReducer';
import { chromeAddNote, chromeGetNote, chromeUpdateNote } from '@services/webextension';
import { Note } from '@services/webextension.type';
import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';

interface EditorProps {
  id?: string;
}

const Editor: React.FC<EditorProps> = ({ id }) => {
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

    // Add a new note
    if (!note.id) {
      chromeAddNote(content);
    } else {
      // Update note by id
      chromeUpdateNote(note.id, content);
    }
  };

  const initialize = useCallback(async () => {
    try {
      const note = await chromeGetNote(id);
      if (note) {
        setNote(note);
        dispatch(setCurrentNote(note));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (id) {
      initialize()
    }
  }, [id, initialize])
  
  return (
    <ReactQuill
      theme="snow"
      value={note.content}
      onChange={handleQuillChange}
      modules={{
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        },
      }}
    />
  );
};

export default Editor;
