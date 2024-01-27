import React from 'react';
import styled from 'styled-components';

interface AppThemeProps {
  children: React.ReactNode;
}

const Container = styled.div`
  width: 370px;
  height: 500px;
  margin: auto;
  background: #f3f2f8;
  padding: 0.6rem;
`;

const AppTheme: React.FC<AppThemeProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AppTheme;
