import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GroupNoteData, Note } from '@services/webextension.type';

export interface noteState {
  currentNote: Note;
  groupNoteDataList: GroupNoteData[];
}

const initialState: noteState = {
  currentNote: { id: '', groupId: '', content: '', createdDate: '', updatedDate: '' },
  groupNoteDataList: [],
};

export const noteReducer = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setCurrentNote: (state, action: PayloadAction<Note>) => {
      state.currentNote = action.payload;
    },
    setGroupNoteData: (state, action: PayloadAction<GroupNoteData[]>) => {
      state.groupNoteDataList = action.payload;
    },
  },
});

export const { setCurrentNote, setGroupNoteData } = noteReducer.actions;
export default noteReducer.reducer;
