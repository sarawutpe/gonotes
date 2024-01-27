import dayjs from 'dayjs';
// import debounce from 'lodash.debounce';
import { v4 as uuidv4 } from 'uuid';
import browser from 'webextension-polyfill';

export const chromeKey = {};

const contextDB = {
  contextNote: 'contextNote',
  contextGroupNote: 'contextGroupNote',
};

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

export const getChromGroupNote = async (): Promise<GroupNote[] | []> => {
  const result = await browser.storage.local.get(contextDB.contextGroupNote);
  return result[contextDB.contextGroupNote] || [];
};

export const addChromGroupNote = async (name: string) => {
  const note: GroupNote = {
    id: uuidv4(),
    name: name,
    createdDate: dayjs().toISOString(),
    updatedDate: dayjs().toISOString(),
  };

  const currentContext = await getChromGroupNote();
  const context = [...currentContext, note];

  await browser.storage.local.set({
    [contextDB.contextGroupNote]: context,
  });
};

export const updateChromeGroupNote = async (id: string, name: string) => {
  const currentContext = await getChromGroupNote();
  const context = currentContext.map((item) => {
    if (item.id === id) {
      console.log(id)
      return { ...item, name: name };
    }
    return item;
  });

  await browser.storage.local.set({
    [contextDB.contextGroupNote]: context,
  });
};

export const deleteChromeGroupNote = async (id: string) => {
  const currentContext = await getChromGroupNote();
  const context = currentContext.filter((item) => item.id !== id);
  await browser.storage.local.set({
    [contextDB.contextGroupNote]: context,
  });
};

// export const getChromeNote = async () => {
//   try {
//     const { context } = await chrome?.storage.sync.get(['context']);
//     return context || '';
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const setChromeNote = debounce(async (content: string) => {
//   try {
//     const noteObj = await getChromeNote();
//     const note: Note[] = JSON.parse(noteObj);
//     if (typeof note !== 'object') return;

//     const noteData = await chrome.storage.sync.set({ context: content });
//   } catch (error) {
//     console.log(error);
//   }
// }, 100);

// export const addChromNote = async (content: string) => {
//   const note: Note = {
//     id: uuidv4(),
//     groupId: '',
//     content: content,
//     createdDate: dayjs().toISOString(),
//     updatedDate: dayjs().toISOString(),
//   };

//   const currentContext = await getChromeNote();
//   const context = [...currentContext, note];
//   await browser.storage.local.set({ context: context });
// };

// export const updateChromNote = async (content: string) => {
//   const noteObj = await getChromeNote();
//   const note: Note[] = JSON.parse(noteObj);
//   if (typeof note !== 'object') return;

//   await chrome.storage.sync.set({ context: content });
// };
