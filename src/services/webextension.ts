import { setGroupNoteData } from '@redux/features/noteReducer';
import { store } from '@redux/store';
import {
  GroupNote,
  Note,
  GroupNoteData,
  STORAGE_KEY_GROUP_NOTE,
  STORAGE_KEY_NOTE,
} from '@services/webextension.type';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';
import { v4 as uuidv4 } from 'uuid';

// Initialize
export const initialize = () => {};

export const OTHER_GROUP_NOTE = {
  id: 'OTHER_GROUP',
  name: 'Others',
  createdDate: '',
  updatedDate: '',
};

// Service Chrome Group Note
export const chromeGetGroupNoteList = async (): Promise<GroupNoteData[] | []> => {
  try {
    const groupNoteResult = await chrome.storage.sync.get(STORAGE_KEY_GROUP_NOTE);
    const noteResult = await chrome.storage.sync.get(STORAGE_KEY_NOTE);
    const groupNoteList: GroupNote[] = [
      ...groupNoteResult[STORAGE_KEY_GROUP_NOTE],
      OTHER_GROUP_NOTE,
    ] || [OTHER_GROUP_NOTE];
    const noteList: Note[] = noteResult[STORAGE_KEY_NOTE] || [];

    const data: GroupNoteData[] = groupNoteList.map((group) => ({
      ...group,
      notes: noteList.filter((note) => note.groupId === group.id),
    }));

    store.dispatch(setGroupNoteData(data));

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const chromeAddGroupNote = async (name: string) => {
  try {
    const note: GroupNote = {
      id: uuidv4(),
      name: name,
      createdDate: dayjs().toISOString(),
      updatedDate: dayjs().toISOString(),
    };
    const currentContext = await chromeGetGroupNoteList();
    const context = [...currentContext, note];

    await chrome.storage.sync.set({ [STORAGE_KEY_GROUP_NOTE]: context });
  } catch (error) {
    console.log(error);
  }
};

export const chromeUpdateGroupNote = async (id: string, name: string) => {
  try {
    const currentContext = await chromeGetGroupNoteList();
    const context = currentContext.map((item) => {
      if (item.id === id) {
        return { ...item, name: name };
      }
      return item;
    });

    await chrome.storage.sync.set({ [STORAGE_KEY_GROUP_NOTE]: context });
  } catch (error) {
    console.log(error);
  }
};

export const chromeDeleteGroupNote = async (id: string) => {
  try {
    const currentContext = await chromeGetGroupNoteList();
    const context = currentContext.filter((item) => item.id !== id);
    await chrome.storage.sync.set({ [STORAGE_KEY_GROUP_NOTE]: context });
  } catch (error) {
    console.log(error);
  }
};

// Service Chrome Note
export const chromeGetNote = async (id?: string): Promise<Note | null> => {
  try {
    const result = await chrome.storage.sync.get(STORAGE_KEY_NOTE);
    const noteList: Note[] = result[STORAGE_KEY_NOTE] || [];
    if (!Array.isArray(noteList) || noteList.length === 0) return null;

    if (id) {
      const note = noteList.find((item) => item.id === id);
      console.log(note)
      return note || null;
    }

    console.log(noteList[0])
    return noteList[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const chromeGetNoteList = async (): Promise<Note[] | []> => {
  try {
    const result = await chrome.storage.sync.get(STORAGE_KEY_NOTE);
    console.log(result[STORAGE_KEY_NOTE] || [])
    return result[STORAGE_KEY_NOTE] || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const chromeAddNote = debounce(async (content: string) => {
  try {
    const objectId = uuidv4();
    const note: Note = {
      id: objectId,
      groupId: '',
      content: content,
      createdDate: dayjs().toISOString(),
      updatedDate: dayjs().toISOString(),
    };
    const currentContext = await chromeGetNoteList();
    const context = [...currentContext, note];
    await chrome.storage.sync.set({ [STORAGE_KEY_NOTE]: context });

    chromeGetNoteList()

    return objectId;
  } catch (error) {
    console.log(error);
    return ''
  }
}, 100);

export const chromeUpdateNote = debounce(async (id: string, content: string) => {
  try {
    const currentContext = await chromeGetNoteList();
    if (!Array.isArray(currentContext) || currentContext.length === 0) return;
    const context = currentContext.map((item) => {
      if (item.id === id) {
        return { ...item, content: content };
      }
      return item;
    });

    await chrome.storage.sync.set({ [STORAGE_KEY_NOTE]: context });
  } catch (error) {
    console.log(error);
  }
}, 100);

export const chromeDeleteNote = async (id: string) => {
  try {
    const currentContext = await chromeGetNote();
    if (!currentContext || !Array.isArray(currentContext)) return;
    const context = currentContext.filter((item) => item.id !== id);
    await chrome.storage.sync.set({ [STORAGE_KEY_NOTE]: context });
  } catch (error) {
    console.log(error);
  }
};

export const chromeNoteUpdateGroupId = async (id: string, groupId: string) => {
  try {
    const currentContext = await chromeGetNoteList();
    if (!Array.isArray(currentContext) || currentContext.length === 0) return;
    const context = currentContext.map((item) => {
      if (item.id === id) {
        return { ...item, groupId: groupId };
      }
      return item;
    });

    await chrome.storage.sync.set({ [STORAGE_KEY_NOTE]: context });

    console.log('ok new group', groupId);
  } catch (error) {
    console.log(error);
  }
};
