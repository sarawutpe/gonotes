import React from 'react';
import { BookmarkIcon, FolderIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { paths } from '@utils/constant';
import IconButton from '@components/IconButton';
import { useNavigate } from 'react-router-dom';
import { chromeAddNote } from '@services/webextension';

interface NoteHeaderProps {
  onClickModalNoteFolder: () => void;
}

const NoteHeader: React.FC<NoteHeaderProps> = ({ onClickModalNoteFolder }) => {
  const navigate = useNavigate();

  const handleAddNewNote = async () => {
    try {
      const id = await chromeAddNote('');
      if (id) {
        navigate(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-2">
      <IconButton color="#E2BF58" size="24px" disableRipple onClick={handleAddNewNote}>
        <PlusCircleIcon />
      </IconButton>
      <IconButton color="#E2BF58" size="24px" disableRipple onClick={onClickModalNoteFolder}>
        <BookmarkIcon />
      </IconButton>
      <IconButton
        color="#E2BF58"
        size="24px"
        onClick={() => navigate(paths.notefolder.index)}
        disableRipple
      >
        <FolderIcon />
      </IconButton>
    </div>
  );
};

export default NoteHeader;
