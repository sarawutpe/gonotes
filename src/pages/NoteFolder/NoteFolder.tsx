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
import {
  GroupNote,
  addChromGroupNote,
  deleteChromeGroupNote,
  getChromGroupNote,
  updateChromeGroupNote,
} from '@services/webextension';
import classnames from 'classnames';

const NoteFolder: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isToggleSetting, setIsToggleSetting] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [groupNote, setGroupNote] = useState<GroupNote>();
  const [groupNoteList, setGroupNoteList] = useState<GroupNote[]>([]);
  const [selectedGroupNoteId, setSelectedGroupNoteId] = useState('');
  const isModifyMode = !!groupNote && isToggleSetting;

  const handleToggleSetting = () => {
    setIsToggleSetting((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setIsConfirmDelete(false);
    setGroupNote(undefined);
  };

  const handleUpdateGroupNote = (value: GroupNote) => {
    setGroupNote(value);
    handleOpenModal();
  };

  const handleGroupNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setGroupNote({ id: '', name: name, createdDate: '', updatedDate: '' });
  };

  const handleProcessAddGroupNote = async () => {
    if (!groupNote) return;
    await addChromGroupNote(groupNote.name);
    handleRestoreGroupNote();
    handleCloseModal();
  };

  const handleProcessUpdateGroupNote = async () => {
    if (!groupNote) return;
    await updateChromeGroupNote(selectedGroupNoteId, groupNote.name);
    handleRestoreGroupNote();
    handleCloseModal();
  };

  const handleProcessDeleteGroupNote = async () => {
    if (!isConfirmDelete || !groupNote) {
      setIsConfirmDelete(true);
      return;
    }

    await deleteChromeGroupNote(groupNote.id);
    handleRestoreGroupNote();
    handleCloseModal();
  };

  const handleRestoreGroupNote = useCallback(async () => {
    const data = await getChromGroupNote();
    setGroupNoteList(data);
  }, []);

  useEffect(() => {
    handleRestoreGroupNote();
  }, []);

  return (
    <>
      <EditorTheme>
        <EditorThemeHeader backPath="/">
          <IconButton color="#E2BF58" size="24px" disableRipple onClick={handleOpenModal}>
            <FolderPlusIcon />
          </IconButton>
          <IconButton
            className={classnames({ 'rotate-90': isToggleSetting })}
            color="#E2BF58"
            size="24px"
            disableRipple
            onClick={handleToggleSetting}
          >
            <Cog6ToothIcon />
          </IconButton>
        </EditorThemeHeader>
        <AppThemeContent>
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="grid columns-1">
              {groupNoteList.map((item, _) => (
                <div
                  id={item.id}
                  className="flex justify-between text-gray-700 bg-white hover:bg-gray-50 w-full cursor-pointer px-3 py-2.5 border-b-2 border-gray-50"
                >
                  <div>
                    <p className="text-sm select-none line-clamp-1">{item.name}</p>
                  </div>
                  <div className="flex">
                    {!isToggleSetting ? (
                      <ChevronRightIcon className="w-[24px] h-[24px] text-[#E2BF58]" />
                    ) : (
                      <PencilSquareIcon
                        className="w-[24px] h-[24px] text-[#E2BF58]"
                        onClick={() => {
                          setSelectedGroupNoteId(item.id);
                          handleUpdateGroupNote(item);
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AppThemeContent>

        <Transition appear show={isOpenModal} as={Fragment}>
          <Dialog as="div" className="absolute z-10" onClose={handleCloseModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
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
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {!isModifyMode && 'New Folder'}
                    </Dialog.Title>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="fullName"
                        className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                        value={groupNote?.name}
                        onChange={handleGroupNoteChange}
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex gap-2">
                        {!isConfirmDelete && (
                          <button
                            type="button"
                            className="w-[90px] inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() =>
                              isModifyMode
                                ? handleProcessUpdateGroupNote()
                                : handleProcessAddGroupNote()
                            }
                          >
                            Save
                          </button>
                        )}
                        {isModifyMode && (
                          <button
                            type="button"
                            className="w-[90px] inline-flex justify-center rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            onClick={handleProcessDeleteGroupNote}
                          >
                            {isConfirmDelete ? 'Comfirm' : 'Delete'}
                          </button>
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
