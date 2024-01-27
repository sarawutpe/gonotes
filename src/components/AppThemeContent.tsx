import React from 'react';
import styled from 'styled-components';

interface AppThemeContentProps {
  children: React.ReactNode;
}

const Container = styled.div`
  width: 100%;
  height: calc(100% - 40px);
`;

const AppThemeContent: React.FC<AppThemeContentProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AppThemeContent;
