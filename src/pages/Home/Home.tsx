import React from 'react';
import Editor from '@pages/Home/Editor';
import AppTheme from '@components/AppTheme';
import AppThemeHeader from '@components/AppThemeHeader';
import { CloudArrowUpIcon, FolderIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { paths } from '@utils/constant';
import AppThemeContent from '@components/AppThemeContent';
import IconButton from '@components/IconButton';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppTheme>
      <AppThemeHeader>
        <div className="flex gap-2">
          <IconButton color="#E2BF58" size="24px" disableRipple>
            <CloudArrowUpIcon />
          </IconButton>
          <IconButton color="#E2BF58" size="24px" onClick={() => navigate(paths.notefolder)} disableRipple>
            <FolderIcon />
          </IconButton>
        </div>
      </AppThemeHeader>
      <AppThemeContent>
        <Editor />
      </AppThemeContent>
    </AppTheme>
  );
};

export default Home;
