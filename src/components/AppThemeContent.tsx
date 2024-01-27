import React from 'react';
import styled from 'styled-components';

interface AppThemeContentProps {
  children: React.ReactNode;
}

const Container = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  padding-bottom: 50px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: rgba(31, 31, 31, 0.16);
    border-radius: 8px;
    border: 1px solid transparent;
    box-shadow: none;
    height: 185px;
    max-height: 33%;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(218, 220, 224);
    background-clip: padding-box;
    border: 4px solid transparent;
    border-radius: 8px;
    box-shadow: none;
    min-height: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border: none;
    margin-bottom: 4px;
    margin-top: 4px;
  }
`;

const AppThemeContent: React.FC<AppThemeContentProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AppThemeContent;
