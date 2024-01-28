import React, { useState } from 'react';
import Editor from '@pages/Home/Editor';
import AppTheme from '@components/AppTheme';
import AppThemeHeader from '@components/AppThemeHeader';
import { BookmarkIcon, FolderIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { paths } from '@utils/constant';
import AppThemeContent from '@components/AppThemeContent';
import IconButton from '@components/IconButton';
import NoteFolderListbox from '@pages/Home/NoteFolderListbox';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenModalNoteFolder, setIsOpenModalNoteFolder] = useState<boolean>(false);

  const handleModalNoteFolder = () => {
    setIsOpenModalNoteFolder((prev) => !prev);
  };

  return (
    <AppTheme>
      <AppThemeHeader>
        <div className="flex gap-2">
          <IconButton color="#E2BF58" size="24px" disableRipple onClick={handleModalNoteFolder}>
            <BookmarkIcon />
          </IconButton>
          <IconButton
            color="#E2BF58"
            size="24px"
            onClick={() => navigate(paths.notefolder)}
            disableRipple
          >
            <FolderIcon />
          </IconButton>
        </div>
      </AppThemeHeader>
      <AppThemeContent>
        <Editor />
      </AppThemeContent>

      <NoteFolderListbox open={isOpenModalNoteFolder} onClose={handleModalNoteFolder} />
    </AppTheme>
  );
};

export default Home;
