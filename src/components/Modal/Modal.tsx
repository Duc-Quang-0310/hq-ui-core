import React from 'react';
import { createPortal } from 'react-dom';

import { Divider } from '../Divider';

export interface HQModal {
  isOpen: boolean;
  containerClassname?: string;
  contentClassname?: string;
  handleClose: () => void;
  children?: React.ReactNode;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<HQModal> = ({
  isOpen = true,
  containerClassname,
  contentClassname,
  children,
  body,
  footer,
  header,
  handleClose,
}) => {
  const handleClickClose = React.useCallback(() => {
    handleClose?.();
  }, [handleClose]);

  const renderHeader = React.useMemo(() => {
    if (!header) return null;
    return <header className="modal-header">{header}</header>;
  }, [header]);

  const renderFooter = React.useMemo(() => {
    if (!footer) return null;
    return (
      <footer className="modal-footer">
        <Divider style={{ marginBottom: '8px' }} />
        {footer}
      </footer>
    );
  }, [footer]);

  const renderBody = React.useMemo(() => {
    if (!body) return null;
    return <body className="modal-body">{body}</body>;
  }, [body]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      id="hq-modal"
      data-type="hq-modal"
      className={containerClassname}
      data-display={isOpen}
    >
      <div className={`modal-content ${contentClassname}`}>
        <span className="hq-close" onClick={handleClickClose}>
          &times;
        </span>
        {children ? (
          children
        ) : (
          <>
            {renderHeader}
            {renderBody}
            {renderFooter}
          </>
        )}
      </div>
    </div>,
    document.querySelector('body') as Element | DocumentFragment
  );
};
