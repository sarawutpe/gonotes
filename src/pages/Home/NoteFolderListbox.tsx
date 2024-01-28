import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Listbox } from '@headlessui/react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { GroupNote } from '@services/webextension.type';
import {
  OTHER_GROUP_NOTE,
  chromeGetGroupNoteList,
  chromeNoteUpdateGroupId,
} from '@services/webextension';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setCurrentNote } from '@redux/features/noteReducer';
interface NoteFolderListboxProps {
  open: boolean;
  onClose: () => void;
}

const NoteFolderListbox: React.FC<NoteFolderListboxProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const currentNote = useSelector((state: RootState) => state.note.currentNote);
  const [groupNoteList, setGroupNoteList] = useState<GroupNote[]>([]);
  const [selectedGroupNote, setSelectedGroupNote] = useState<GroupNote>(OTHER_GROUP_NOTE);

  const handleGroupNoteChange = async (groupNote: GroupNote) => {
    if (!groupNote || !currentNote) return;
    setSelectedGroupNote(groupNote);

    const newGroupId = groupNote.id;
    if (currentNote.groupId === newGroupId) return;
    await chromeNoteUpdateGroupId(currentNote.id, newGroupId);
    dispatch(setCurrentNote({ ...currentNote, groupId: newGroupId }));
  };

  const restorGroupNote = useCallback(async () => {
    if (!currentNote) return;
    const groupNotes = await chromeGetGroupNoteList();

    const currentGroupNote = groupNotes.find((groupNote) => groupNote.id === currentNote.groupId);
    if (currentGroupNote) {
      setSelectedGroupNote(currentGroupNote);
    }

    setGroupNoteList(groupNotes);
  }, [currentNote]);

  useEffect(() => {
    restorGroupNote();
  }, [restorGroupNote]);

  return (
    <div>
      {/* Modal */}
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="absolute z-10" onClose={onClose}>
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
                <Dialog.Panel className="w-full h-[80dvh] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Select Folder
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="fixed top-16 w-72">
                      <Listbox value={selectedGroupNote} onChange={handleGroupNoteChange}>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
                            <span className="block truncate">{selectedGroupNote.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                              {groupNoteList.map((groupNote) => (
                                <Listbox.Option
                                  key={groupNote.id}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                  }
                                  value={groupNote}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                        }`}
                                      >
                                        {groupNote.name}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                  <div className="mt-4"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NoteFolderListbox;
