import { setCurrentNote } from '@redux/features/noteReducer';
import { chromeAddNote, chromeGetNote, chromeUpdateNote } from '@services/webextension';
import { Note } from '@services/webextension.type';
import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';

export interface NoteEditorRef {
  onAddNewNote: () => void;
}

interface NoteEditorProps {
  noteId?: string;
}

const NoteEditor = forwardRef<NoteEditorRef, NoteEditorProps>((props, ref) => {
  const { noteId } = props;
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

  // Expose the function
  useImperativeHandle(ref, () => ({
    onAddNewNote: async () => {
      const result = await chromeAddNote('');
      if (result) {
        setNote(result);
        dispatch(setCurrentNote(result));
      }
    },
  }));

  const initialize = useCallback(async () => {
    try {
      const note = await chromeGetNote(noteId);
      if (note) {
        setNote(note);
        dispatch(setCurrentNote(note));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, noteId]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <ReactQuill
      theme="snow"
      value={note.content}
      onChange={handleQuillChange}
      modules={{
        toolbar: {
          container: [[{ header: [1, 2, 3, 4] }], ['bold', 'italic', 'underline', 'strike'], ['link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
        },
      }}
    />
  );
});

export default NoteEditor;
