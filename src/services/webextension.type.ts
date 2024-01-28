export interface Note {
  id: string;
  groupId: string;
  content: string;
  createdDate: string;
  updatedDate: string;
}

export interface GroupNote {
  id: string;
  name: string;
  createdDate: string;
  updatedDate: string;
}

export interface GroupNoteData extends GroupNote {
  notes: Note[] | []
}

export const STORAGE_KEY_NOTE = 'STORAGE_KEY_NOTE';
export const STORAGE_KEY_GROUP_NOTE = 'STORAGE_KEY_GROUP_NOTE';
export const STORAGE_KEY_CURRENT_NOTE_ID = 'STORAGE_KEY_CURRENT_NOTE_ID';
