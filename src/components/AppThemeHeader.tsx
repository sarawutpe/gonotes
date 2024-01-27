import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface EditorThemeHeaderProps {
  children?: React.ReactNode;
  title?: string;
  backPath?: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 0.5rem;
  height: 40px;
`;

const TitleWrapper = styled.div<{ isHover?: boolean }>`
  display: flex;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  opacity: 1;

  ${(props) =>
    props.isHover &&
    css`
      cursor: pointer;
      &:hover {
        opacity: 0.6;
      }
    `}
`;

const EditorThemeHeader: React.FC<EditorThemeHeaderProps> = (props) => {
  const { children, title = 'Go Notes', backPath } = props;
  const navigate = useNavigate();
  const isAllowdGoBack = !!backPath;

  const handleGoBack = () => {
    if (backPath) {
      navigate(backPath);
    }
  };

  return (
    <Container>
      <TitleWrapper isHover={isAllowdGoBack} onClick={handleGoBack}>
        {isAllowdGoBack && <ChevronLeftIcon className="w-[24px] h-[24px] text-[#E2BF58]" />}
        <p className="text-base font-bold">{title}</p>
      </TitleWrapper>

      <div className="flex gap-2">{children}</div>
    </Container>
  );
};

export default EditorThemeHeader;
