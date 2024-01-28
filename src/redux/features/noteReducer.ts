import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Note } from '@services/webextension.type';

export interface noteState {
  currentNote: Note;
}

const initialState: noteState = {
  currentNote: { id: '', groupId: '', content: '', createdDate: '', updatedDate: '' },
};

export const noteReducer = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setCurrentNote: (state, action: PayloadAction<Note>) => {
      state.currentNote = action.payload;
    },
  },
});

export const { setCurrentNote } = noteReducer.actions;
export default noteReducer.reducer;
