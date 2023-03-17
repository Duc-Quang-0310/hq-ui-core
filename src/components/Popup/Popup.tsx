import React from 'react';
import { createPortal } from 'react-dom';

import { InfoFilled } from '../Icon/InfoFilled';
import { SuccessFilled } from '../Icon/SuccessFilled';
import { WarningFilled } from '../Icon/WarningFilled';
import { ErrorFilled } from '../Icon/ErrorFilled';
import { Button } from '../Button/Button';

export type HQContentAlign = 'left-to-right' | 'top-to-bottom';
export type HQPopupType = 'info' | 'error' | 'success' | 'warning';

export interface HQPopup {
  containerClassname?: string;
  contentClassname?: string;
  children?: React.ReactNode;
  contentAlign?: HQContentAlign;
  modalType?: HQPopupType;
  isOpen?: boolean;
  contentTitle?: string;
  contentBody?: string;
  buttonLeftText?: string;
  buttonRightText?: string;
  handleClose?: () => void;
  handleSubmit?: () => void;
}

export const Popup: React.FC<HQPopup> = ({
  containerClassname,
  contentClassname,
  children,
  isOpen = true,
  modalType = 'info',
  contentTitle = 'Content title',
  contentBody = 'It is a long established fact that a reader will be distracted by the readable content.',
  buttonLeftText = 'Cancel',
  buttonRightText = 'Submit',
  contentAlign = 'top-to-bottom',
  handleClose,
  handleSubmit,
}) => {
  const [open, setOpen] = React.useState(isOpen);
  const contentStucture = React.useMemo<{
    color: string;
    icon: React.ReactNode;
  }>(() => {
    const infoStructure = {
      color: '#366AE2',
      icon: (
        <InfoFilled
          width={contentAlign === 'top-to-bottom' ? '38px' : undefined}
          height={contentAlign === 'top-to-bottom' ? '38px' : undefined}
        />
      ),
    };

    switch (modalType) {
      case 'error':
        return {
          color: '#E14337',
          icon: (
            <ErrorFilled
              width={contentAlign === 'top-to-bottom' ? '38px' : undefined}
              height={contentAlign === 'top-to-bottom' ? '38px' : undefined}
            />
          ),
        };
      case 'info':
        return infoStructure;
      case 'success':
        return {
          color: '#39AC6D',
          icon: (
            <SuccessFilled
              width={contentAlign === 'top-to-bottom' ? '38px' : undefined}
              height={contentAlign === 'top-to-bottom' ? '38px' : undefined}
            />
          ),
        };
      case 'warning':
        return {
          color: '#FC6B03',
          icon: (
            <WarningFilled
              width={contentAlign === 'top-to-bottom' ? '38px' : undefined}
              height={contentAlign === 'top-to-bottom' ? '36px' : undefined}
            />
          ),
        };
      default:
        return infoStructure;
    }
  }, [modalType, contentAlign]);

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
            <span
              className="hq-close"
              onClick={() => {
                setOpen(false);
                handleClose?.();
              }}
            >
              &times;
            </span>
            <div
              className="hq-popup-icon_container"
              style={{ marginBottom: '13px' }}
              data-top-to-bottom={contentAlign === 'top-to-bottom'}
            >
              <div className={`hq-popup-icon hq-popup-icon_${modalType} `}>
                {contentStucture.icon}
              </div>
            </div>
            <section
              className="hq-popup-content_container"
              data-top-to-bottom={contentAlign === 'top-to-bottom'}
            >
              <p
                className={
                  contentAlign === 'top-to-bottom' ? 'text-center' : ''
                }
              >
                {contentTitle}
              </p>
              <div
                className={
                  contentAlign === 'top-to-bottom' ? 'text-center' : ''
                }
              >
                {contentBody}
              </div>
            </section>
            <section
              className="hq-popup-button_container"
              data-top-to-bottom={contentAlign === 'top-to-bottom'}
            >
              <Button
                color="#F2F5F8"
                onClick={() => {
                  setOpen(false);
                  handleClose?.();
                }}
              >
                <span style={{ color: '#5B759A', fontSize: '14px' }}>
                  {buttonLeftText}
                </span>
              </Button>
              <Button
                color={contentStucture.color}
                onClick={() => handleSubmit?.()}
              >
                <span style={{ color: 'white', fontSize: '14px' }}>
                  {buttonRightText}
                </span>
              </Button>
            </section>
          </>
        )}
      </div>
    </div>,
    document.querySelector('body') as Element | DocumentFragment
  );
};
