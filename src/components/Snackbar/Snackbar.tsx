import React from 'react';
import { createPortal } from 'react-dom';
import { ErrorFilled, InfoFilled, SuccessFilled, WarningFilled } from '../Icon';
import { uniqueID } from '../../helper/index';

// <-- typing
const placements = [
  'top-left',
  'top-right',
  'top-middle',
  'bottom-left',
  'bottom-right',
  'bottom-middle',
] as const;

export type HQSnackbarPlacement = typeof placements[number];

export type HQSnackbarType =
  | 'default'
  | 'success'
  | 'info'
  | 'warnning'
  | 'error';

export interface HQSnackbar {
  placement?: HQSnackbarPlacement;
  type?: HQSnackbarType;
  invert?: boolean;
  title: React.ReactNode;
  message?: React.ReactNode;
  time?: number;
}

export type HQSnackbarReducer = Omit<HQSnackbar, 'title' | 'message' | 'type'>;

export type TSnackBarItem = HQSnackbar & {
  icon: React.ReactNode;
  id: string;
};

type SnackbarRef = {
  openSnackbar: (data: HQSnackbar) => void;
};

// <-- typing
const SnackBarItem: React.FC<TSnackBarItem & {
  setNotifications: React.Dispatch<React.SetStateAction<TSnackBarItem[]>>;
}> = ({
  message,
  title,
  type,
  icon,
  time = 4,
  id,
  setNotifications,
  invert = false,
}) => {
  const [display, setDisplay] = React.useState(true);

  const handleClearItem = React.useCallback(() => {
    setDisplay(false);
    setTimeout(() => {
      setNotifications(prev => {
        const currentItemIndex = prev.findIndex(i => i.id === id);
        if (currentItemIndex === -1) {
          return prev;
        }
        return prev.filter(noti => noti.id !== id);
      });
    }, 350);
  }, [setNotifications, id]);

  React.useEffect(() => {
    if (display) {
      setTimeout(handleClearItem, time * 1000);
    }
  }, [time, handleClearItem, display]);

  return (
    <div
      className={`snackbar-wrap ${display ? 'slide-in' : 'slide-out'} ${
        invert ? 'invert' : ''
      }`}
      data-snackbar-type={type}
    >
      <div className="snackbar-icon">{icon}</div>
      <div className="snackbar-content">
        <p className="snackbar-title">{title}</p>
        <p className="snackbar-body">{message}</p>
      </div>
      <span className="snackbar-close" onClick={handleClearItem}>
        &times;
      </span>
    </div>
  );
};

const SnackbarBase = React.forwardRef<SnackbarRef>((_, ref) => {
  const [notifications, setNotifications] = React.useState<TSnackBarItem[]>([]);

  const renderIcon = React.useCallback(
    (type: HQSnackbarType, invert: boolean) => {
      switch (type) {
        case 'default':
          return (
            <InfoFilled
              width="20px"
              height="20px"
              fill={!invert ? 'white' : '#1C2430'}
            />
          );
        case 'error':
          return (
            <ErrorFilled
              width="20px"
              height="20px"
              fill={!invert ? 'white' : undefined}
            />
          );
        case 'info':
          return (
            <InfoFilled
              width="20px"
              height="20px"
              fill={!invert ? 'white' : undefined}
            />
          );
        case 'success':
          return (
            <SuccessFilled
              width="20px"
              height="20px"
              fill={!invert ? 'white' : undefined}
            />
          );
        case 'warnning':
          return (
            <WarningFilled
              width="20px"
              height="20px"
              fill={!invert ? 'white' : undefined}
            />
          );
        default:
          return null;
      }
    },
    []
  );

  const renderMainContent = React.useCallback(
    (notificationData: TSnackBarItem[], placement: HQSnackbarPlacement) =>
      createPortal(
        <section
          id="hq-snackbar"
          data-type="hq-snackbar"
          data-snackbar-placement={placement}
        >
          {notificationData?.map(noti => (
            <SnackBarItem
              id={noti.id}
              icon={noti.icon}
              message={noti.message}
              title={noti.title}
              type={noti.type}
              time={noti.time}
              key={noti.id}
              setNotifications={setNotifications}
              invert={noti.invert}
            />
          ))}
        </section>,
        document.querySelector('body') as Element | DocumentFragment
      ),
    []
  );

  React.useImperativeHandle(ref, () => ({
    openSnackbar: ({
      message,
      title,
      invert = false,
      placement = 'top-right',
      time = 3,
      type = 'default',
    }) => {
      setNotifications(prev => [
        ...prev,
        {
          message,
          title,
          id: uniqueID(),
          icon: renderIcon(type, invert),
          time,
          type,
          placement,
          invert,
        },
      ]);
    },
  }));

  if (!notifications.length) {
    return null;
  }

  return (
    <>
      {notifications?.some(n => n.placement === 'top-right') &&
        renderMainContent(
          notifications?.filter(n => n.placement === 'top-right'),
          'top-right'
        )}
      {notifications?.some(n => n.placement === 'top-left') &&
        renderMainContent(
          notifications?.filter(n => n.placement === 'top-left'),
          'top-left'
        )}
      {notifications?.some(n => n.placement === 'top-middle') &&
        renderMainContent(
          notifications?.filter(n => n.placement === 'top-middle'),
          'top-middle'
        )}
      {notifications?.some(n => n.placement === 'bottom-right') &&
        renderMainContent(
          notifications?.filter(n => n.placement === 'bottom-right'),
          'bottom-right'
        )}
      {notifications?.some(n => n.placement === 'bottom-left') &&
        renderMainContent(
          notifications?.filter(n => n.placement === 'bottom-left'),
          'bottom-left'
        )}
      {notifications?.some(n => n.placement === 'bottom-middle') &&
        renderMainContent(
          notifications?.filter(n => n.placement === 'bottom-middle'),
          'bottom-middle'
        )}
    </>
  );
});

const SnackbarBaseRef = React.createRef<SnackbarRef>();

export const openSnackbar = (data: HQSnackbar) => {
  SnackbarBaseRef.current?.openSnackbar(data);
};

export const Snackbar = () => <SnackbarBase ref={SnackbarBaseRef} />;
