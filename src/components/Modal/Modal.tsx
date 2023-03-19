import React from 'react';
import { createPortal } from 'react-dom';

export interface HQModal {
  isOpen?: boolean;
  containerClassname?: string;
  contentClassname?: string;
  handleClose?: () => void;
  handleSubmit?: () => void;
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
  handleClose,
  //   handleSubmit,
  header,
}) => {
  const [open, setOpen] = React.useState(isOpen);

  const handleClickClose = React.useCallback(() => {
    setOpen(false);
    handleClose?.();
  }, [handleClose]);

  const renderHeader = React.useMemo(() => {
    if (!header) return null;
    return header;
  }, [header]);

  const renderFooter = React.useMemo(() => {
    if (!footer) return null;
    return footer;
  }, [footer]);

  const renderBody = React.useMemo(() => {
    if (!body) return null;
    return body;
  }, [body]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      id="hq-modal"
      data-type="hq-modal"
      className={containerClassname}
      data-display={open}
    >
      <div className={`modal-content ${contentClassname}`}>
        {children ? (
          children
        ) : (
          <>
            <span className="hq-close" onClick={handleClickClose}>
              &times;
            </span>
            <section>
              {renderHeader}
              {renderFooter}
              {renderBody}
            </section>
          </>
        )}
      </div>
    </div>,
    document.querySelector('body') as Element | DocumentFragment
  );
};
