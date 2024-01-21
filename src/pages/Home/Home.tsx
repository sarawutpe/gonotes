import React from 'react'
import EditorHeader from './EditorHeader';
import Editor from './Editor';

const Home: React.FC = () => {
  return (
    <div className="container flex flex-col justify-center w-full h-full max-w-[450px] relative m-auto bg-[#f3f2f8]">
      <EditorHeader />
      <Editor />
    </div>
  );
};

export default Home;
