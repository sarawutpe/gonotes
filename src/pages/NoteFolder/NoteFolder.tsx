import EditorTheme from '@components/AppTheme';
import AppThemeContent from '@components/AppThemeContent';
import EditorThemeHeader from '@components/AppThemeHeader';
import React from 'react';
import { ChevronRightIcon, FolderPlusIcon } from '@heroicons/react/16/solid';
import IconButton from '@components/IconButton';

const NoteFolder: React.FC = () => {
  return (
    <EditorTheme>
      <EditorThemeHeader backPath="/">
        <IconButton color="#E2BF58" size="24px" disableRipple>
          <FolderPlusIcon />
        </IconButton>
      </EditorThemeHeader>
      <AppThemeContent>
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="grid columns-1">
            {Array.from(Array(6)).map(() => (
              <div className="flex justify-between text-gray-700 bg-white hover:bg-gray-50 w-full cursor-pointer px-3 py-2.5 border-b-2 border-gray-50">
                <div>
                  <p className="text-sm select-none">Name here</p>
                </div>
                <ChevronRightIcon className="w-[24px] h-[24px] text-[#E2BF58]" />
              </div>
            ))}
          </div>
        </div>
      </AppThemeContent>
    </EditorTheme>
  );
};

export default NoteFolder;
