import React from 'react';
import styled, { css } from 'styled-components';

interface IconButtonProps {
  children?: React.ReactNode;
  color?: string;
  size?: string;
  disableripple?: string;
  onClick?: () => void;
  [key: string]: unknown;
}

const Container = styled.div<{ color?: string; size?: string; disableripple?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.color ? props.color : 'rgba(0, 0, 0, 0.54)')};
  background: transparent;
  border-radius: 100px;
  padding: 2px;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  & .icon {
    width: ${(props) => (props.size ? props.size : '18px')};
    height: ${(props) => (props.size ? props.size : '18px')};
  }

  ${(props) =>
    props.disableripple === 'false' &&
    css`
      width: 30px;
      height: 30px;
      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }
    `}
`;

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children, color = '', size = '', disableripple = 'false', onClick, ...restProps } = props;
  return (
    <Container color={color} size={size} disableripple={disableripple} onClick={onClick} {...restProps}>
      <div className="icon">{children}</div>
    </Container>
  );
};

export default IconButton;
