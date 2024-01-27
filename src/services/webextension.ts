import debounce from 'lodash.debounce';
// import chrome from 'webextension-polyfill';

export const chromeKey = {};

export const setChromeNote = debounce(async (content: string) => {
  try {
    await chrome.storage.sync.set({ CONTEXT: content });
  } catch (error) {
    console.log(error);
  }
}, 100);

export const getChromeNote = async () => {
  try {
    const { CONTEXT } = await chrome.storage.sync.get(['CONTEXT']);
    return CONTEXT || '';
  } catch (error) {
    console.log(error);
  }
};
