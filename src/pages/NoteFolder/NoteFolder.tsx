import EditorTheme from '@components/AppTheme';
import AppThemeContent from '@components/AppThemeContent';
import EditorThemeHeader from '@components/AppThemeHeader';
import React, { Fragment, useState, useEffect, useCallback } from 'react';
import {
  ChevronRightIcon,
  FolderPlusIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
} from '@heroicons/react/16/solid';
import IconButton from '@components/IconButton';
import { Dialog, Transition } from '@headlessui/react';

import classnames from 'classnames';
import {
  chromeAddGroupNote,
  chromeDeleteGroupNote,
  chromeGetGroupNoteList,
  chromeUpdateGroupNote,
} from '@services/webextension';
import { GroupNote, GroupNoteData } from '@services/webextension.type';
import { useNavigate } from 'react-router-dom';

interface ActionButtonProps {
  type: 'button';
  classname: string;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}
const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  classname,
  onClick,
  label,
  disabled,
}) => (
  <button
    type={type}
    className={classnames(
      classname,
      'w-[90px] inline-flex justify-center rounded-md border border-transparent px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50'
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

const NoteFolder: React.FC = () => {
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isToggleSetting, setIsToggleSetting] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [selectedGroupNote, setSelectedGroupNote] = useState<GroupNote>({
    id: '',
    name: '',
    createdDate: '',
    updatedDate: '',
  });
  const [groupNoteList, setGroupNoteList] = useState<GroupNoteData[]>([]);
  const isAddMode = !selectedGroupNote.id;
  const isUpdateMode = !!selectedGroupNote.id;

  const handleToggleSetting = () => {
    setIsToggleSetting((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setIsConfirmDelete(false);
    setTimeout(() => {
      setSelectedGroupNote({ id: '', name: '', createdDate: '', updatedDate: '' });
    }, 100);
  };

  const handleClickUpdateNote = (value: GroupNote) => {
    setSelectedGroupNote(value);
    handleOpenModal();
  };

  const handleGroupNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGroupNote({ ...selectedGroupNote, name: event.target.value });
  };

  const handleClickDeleteGroupNote = () => {
    setIsConfirmDelete(true);
  };

  const handleCancelDeleteGroupNote = () => {
    setIsConfirmDelete(false);
  };

  const handleProcessAddGroupNote = async () => {
    if (!selectedGroupNote) return;
    await chromeAddGroupNote(selectedGroupNote.name);
    handleRestoreGroupNote();
    handleCloseModal();
  };

  const handleProcessUpdateGroupNote = async () => {
    if (!selectedGroupNote) return;
    await chromeUpdateGroupNote(selectedGroupNote.id, selectedGroupNote.name);
    handleRestoreGroupNote();
    handleCloseModal();
  };

  const handleProcessDeleteGroupNote = async () => {
    if (!isConfirmDelete || !selectedGroupNote) {
      setIsConfirmDelete(true);
      return;
    }

    await chromeDeleteGroupNote(selectedGroupNote.id);
    handleRestoreGroupNote();
    handleCloseModal();
  };

  const handleRestoreGroupNote = useCallback(async () => {
    const data = await chromeGetGroupNoteList();
    setGroupNoteList(data);
  }, []);

  useEffect(() => {
    handleRestoreGroupNote();
  }, [handleRestoreGroupNote]);

  return (
    <>
      <EditorTheme>
        <EditorThemeHeader backPath="/">
          <IconButton color="#E2BF58" size="24px" disableripple="true" onClick={handleOpenModal}>
            <FolderPlusIcon />
          </IconButton>
          <IconButton
            className={classnames({ 'rotate-90': isToggleSetting })}
            color="#E2BF58"
            size="24px"
            disableripple="true"
            onClick={handleToggleSetting}
          >
            <Cog6ToothIcon />
          </IconButton>
        </EditorThemeHeader>
        <AppThemeContent>
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="grid columns-1">
              {groupNoteList.length === 0 ? <p className="p-2 text-center">Empty folders.</p> : ''}
              {groupNoteList.map((item) => (
                <div
                  id={item.id}
                  className="flex justify-between text-gray-700 bg-white hover:bg-gray-50 w-full cursor-pointer px-3 py-2.5 border-b-2 border-gray-50"
                  onClick={() => {
                    if (isToggleSetting) return;
                    navigate(`/notefolder/mynote/${item.id}`);
                  }}
                >
                  <div>
                    <p className="text-sm select-none line-clamp-1">{item.name}</p>
                  </div>
                  <div className="flex relative z-10">
                    {!isToggleSetting ? (
                      <div className="flex items-center">
                        <p className="text-base text-gray-400">{item.notes.length}</p>
                        <ChevronRightIcon className="w-[24px] h-[24px] text-[#E2BF58]" />
                      </div>
                    ) : (
                      <PencilSquareIcon
                        className="w-[24px] h-[24px] text-[#E2BF58]"
                        onClick={() => handleClickUpdateNote(item)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AppThemeContent>

        {/* Modal */}
        <Transition appear show={isOpenModal} as={Fragment}>
          <Dialog as="div" className="absolute z-10" onClose={handleCloseModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-100"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {!isUpdateMode && 'New Folder'}
                    </Dialog.Title>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="fullName"
                        className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                        value={selectedGroupNote?.name}
                        onChange={handleGroupNoteChange}
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex gap-2">
                        {isAddMode && (
                          <ActionButton
                            type="button"
                            classname="bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500"
                            onClick={handleProcessAddGroupNote}
                            label="Save"
                            disabled={!selectedGroupNote.name}
                          />
                        )}
                        {isUpdateMode && (
                          <React.Fragment>
                            <ActionButton
                              type="button"
                              classname="bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500"
                              onClick={() =>
                                isConfirmDelete
                                  ? handleCancelDeleteGroupNote()
                                  : handleProcessUpdateGroupNote()
                              }
                              label={isConfirmDelete ? 'Cancel' : 'Save'}
                              disabled={!selectedGroupNote.name}
                            />
                            <ActionButton
                              type="button"
                              classname="bg-red-100 text-red-900 hover:bg-red-200 focus-visible:ring-red-500"
                              onClick={() =>
                                isConfirmDelete
                                  ? handleProcessDeleteGroupNote()
                                  : handleClickDeleteGroupNote()
                              }
                              label={isConfirmDelete ? 'Confirm' : 'Delete'}
                            />
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </EditorTheme>
    </>
  );
};

export default NoteFolder;
