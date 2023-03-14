import React, { FC, HTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, ...other }) => {
  return <button {...other}>{children}</button>;
};
