import { getChromeNote, setChromeNote } from '@services/webextension';
import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor: React.FC = () => {
  const [note, setNote] = useState('');
  const handleQuillChange = (value: string) => {
    setNote(value);
    handleDebounceChange(value);
  };

  const handleDebounceChange = useCallback((value: string) => {
    setChromeNote(value);
  }, []);

  const handleRestoreNote = useCallback(async () => {
    try {
      const note = await getChromeNote();
      setNote(note);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleRestoreNote();
  }, [handleRestoreNote]);

  return (
      <ReactQuill
        theme="snow"
        value={note}
        onChange={handleQuillChange}
        modules={{ toolbar: false }}
      />
  );
};

export default Editor;
