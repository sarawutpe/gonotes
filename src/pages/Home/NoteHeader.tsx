import React from 'react';
import { BookmarkIcon, FolderIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import IconButton from '@components/IconButton';
import { useNavigate } from 'react-router-dom';

interface NoteHeaderProps {
  onCallbackOpenModalNoteFolder: () => void;
  onCallbackAddNewNote: () => void;
}

const NoteHeader: React.FC<NoteHeaderProps> = (props) => {
  const { onCallbackOpenModalNoteFolder, onCallbackAddNewNote } = props;
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <IconButton color="#E2BF58" size="24px" disableripple="true" onClick={onCallbackAddNewNote}>
        <PlusCircleIcon />
      </IconButton>
      <IconButton
        color="#E2BF58"
        size="24px"
        disableripple="true"
        onClick={onCallbackOpenModalNoteFolder}
      >
        <BookmarkIcon />
      </IconButton>
      <IconButton
        color="#E2BF58"
        size="24px"
        onClick={() => navigate('/notefolder')}
        disableripple="true"
      >
        <FolderIcon />
      </IconButton>
    </div>
  );
};

export default NoteHeader;
