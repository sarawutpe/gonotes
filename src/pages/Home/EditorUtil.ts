import debounce from 'lodash.debounce';
// import chrome from 'webextension-polyfill';

export const chromeKey = {};

export const setChromeNote = debounce(async (content: string) => {
  try {
    console.log(content)
    // await chrome.storage.sync.set({ GONOTE: content });
  } catch (error) {
    console.log(error);
  }
}, 100);

export const getChromeNote = async () => {
  try {
    const GONOTE = '';
    // const { GONOTE } = await chrome.storage.sync.get(['GONOTE']);
    return GONOTE || '';
  } catch (error) {
    console.log(error);
  }
};
