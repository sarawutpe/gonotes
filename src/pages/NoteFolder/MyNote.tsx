import React from 'react';
import EditorTheme from '@components/AppTheme';
import AppThemeContent from '@components/AppThemeContent';
import EditorThemeHeader from '@components/AppThemeHeader';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useNavigate, useParams } from 'react-router-dom';

const MyNote: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const groupNoteDataList = useSelector((state: RootState) => state.note.groupNoteDataList);
  const noteList = groupNoteDataList.find((item) => item.id === groupId)?.notes ?? [];

  return (
    <EditorTheme>
      <EditorThemeHeader backPath="notefolder" />
      <AppThemeContent>
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="grid columns-1">
            {noteList.map((note) => (
              <div
                key={note.id}
                id={note.id}
                className="flex justify-between text-gray-700 bg-white hover:bg-gray-50 w-full cursor-pointer px-3 py-2.5 border-b-2 border-gray-50"
                onClick={() => navigate(`home/${note.id}`)}
              >
                <div>
                  <p className="text-sm select-none line-clamp-1">{note.content}</p>
                </div>
                <div className="flex">
                  <ChevronRightIcon className="w-[24px] h-[24px] text-[#E2BF58]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppThemeContent>
    </EditorTheme>
  );
};

export default MyNote;
