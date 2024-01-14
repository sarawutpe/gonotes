import { useEffect, useCallback, createRef, useState } from 'react';
// import chrome from 'webextension-polyfill';
import debounce from 'lodash.debounce';
import EditorJS from '@/components/EditorJS';
import TextEditorToolbar, { TextEditorToolbarRef } from '@/pages/TextEditorToolbar';

const Home = () => {
  const [content, setContent] = useState('');
  const textEditorToolbarRef = createRef<TextEditorToolbarRef>();

  const handleNoteChange = (content: string) => {
    if (textEditorToolbarRef.current) {
      textEditorToolbarRef.current.handleSetLoading(true);
    }
    handleNoteDebounceChange(content);
  };

  const handleNoteDebounceChange = debounce(async (content: string) => {
    // await chrome.storage.sync.set({ NOTE: content });
    console.log(content);
    if (textEditorToolbarRef.current) {
      textEditorToolbarRef.current.handleSetLoading(false);
    }
  }, 200);

  const handleRestoreNote = useCallback(async () => {
    try {
      // const { NOTE } = await chrome.storage.sync.get(['NOTE']);
      setContent('');
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  useEffect(() => {
    handleRestoreNote();
  }, [handleRestoreNote]);

  return (
    <>
      <div className="container flex flex-col justify-center w-full h-full max-w-[450px] relative p-2 m-auto">
        <TextEditorToolbar ref={textEditorToolbarRef} />
        <EditorJS value={content} onChange={handleNoteChange} />
      </div>
    </>
  );
};

export default Home;
