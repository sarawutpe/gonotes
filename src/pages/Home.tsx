import { useState, useEffect } from 'react';
import chrome from 'webextension-polyfill';
import debounce from 'lodash.debounce';

const Home = () => {
  const [note, setNote] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNoteChange = debounce((value: string) => {
    handleSaveChange(value);
    console.log('done')
  }, 1000);

  const handleSaveChange = debounce(async (value: string) => {
    await chrome.storage.sync.set({ NOTE: value });
    setIsLoading(false);
  }, 1000);

  const handleRestoreNote = async () => {
    try {
      const { NOTE } = await chrome.storage.sync.get(['NOTE']);
      setNote(NOTE || '');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleRestoreNote();
  }, []);

  return (
    <>
      <div className="container relative p-4">
        <div className="w-full flex justify-end">
          <div className="relative w-[30px] h-[30px]">
            {isLoading ? (
              <div className="relative fadeIn" role="status">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              <div className="relative fadeIn">
                <span className="material-icons-outlined ">cloud_done</span>
              </div>
            )}
          </div>
        </div>

        <label htmlFor="about" className="block text-sm font-bold leading-6 text-gray-900">
          Notes:
        </label>
        <div className="mt-2">
          <textarea
            rows={3}
            className="block p-2 text-base w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={function (e) {
              setIsLoading(true)
              return handleNoteChange(e.target.value);
            }}
          >
            {note}
          </textarea>
        </div>
      </div>
    </>
  );
};

export default Home;
