import { forwardRef } from 'react';
import { CloudArrowUpIcon, FolderIcon } from '@heroicons/react/24/solid';

interface EditorHeaderProps {}

export interface EditorHeaderRef {
  handleSetLoading: (value: boolean) => void;
}

const EditorHeader = forwardRef<EditorHeaderRef, EditorHeaderProps>((_, ref) => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useImperativeHandle(ref, () => ({
  //   // handleSetLoading: (value: boolean) => {
  //   //   // setIsLoading(value);
  //   // },
  // }));

  return (
    <div className="w-full flex justify-between p-2 pb-0">
      <p className="text-base font-bold">Go Notes</p>
      <div className="flex gap-2">
        <CloudArrowUpIcon className="w-[24px] h-[24px] text-[#E2BF58]" />
        <div className="icon-button">
          <FolderIcon className="w-[24px] h-[24px] text-[#E2BF58]" />
        </div>
      </div>
    </div>
  );
});

export default EditorHeader;
