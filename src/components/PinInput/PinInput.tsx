import React from 'react';

const BACKSPACE = 'Backspace';

export type PinType = number | string | undefined;

export interface HQPinInputProps extends React.HTMLAttributes<HTMLDivElement> {
  regexPattern?: RegExp;
  pinLength?: number;
  setPinValue: React.Dispatch<React.SetStateAction<Array<PinType>>>;
  onSuccess?: () => void;
  passwordMode?: boolean;
  pinWidth?: number | string;
  pinHeight?: number | string;
  currentPin: Array<PinType>;
  disabled?: boolean;
}

export const PinInput = React.forwardRef<HTMLDivElement, HQPinInputProps>(
  (
    {
      pinLength = 5,
      regexPattern = /^[0-9]\d*$/,
      setPinValue,
      onSuccess,
      passwordMode = false,
      pinWidth = '35px',
      pinHeight = '35px',
      style,
      className,
      color = '#ccd4e1',
      currentPin: pins,
      disabled = false,
      ...other
    },
    ref
  ) => {
    const [currentPin, setCurrentPin] = React.useState<Array<PinType>>([]);
    const inputRefs = React.useRef<HTMLInputElement[]>([]);
    const [errorList, setErrorList] = React.useState<
      Array<boolean | undefined>
    >([]);
    const [isInPasswordMode, setisInPasswordMode] = React.useState(
      passwordMode
    );

    const userStyle = React.useMemo(
      () =>
        ({
          '--pin-border': color,
        } as React.CSSProperties),
      [color]
    );

    const onPinChange = React.useCallback(
      (pinEntry: PinType, index: number) => {
        const newPin = [...currentPin];
        newPin[index] = pinEntry;
        setCurrentPin(newPin);
        setPinValue(newPin);
      },
      [currentPin, setPinValue]
    );

    const changeFocusPin = React.useCallback((pinIndex: number) => {
      const focusedPinIndex = inputRefs.current[pinIndex];
      if (focusedPinIndex) {
        focusedPinIndex.focus();
      }
    }, []);

    const handlePressBack = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const currentCode = event.nativeEvent.code;

        if (currentCode !== BACKSPACE) {
          return null;
        }

        setErrorList(prev => {
          const newErrList = [...prev];
          newErrList[index] = undefined;
          return newErrList;
        });

        if (currentPin[index] === undefined) {
          return changeFocusPin(index - 1);
        }

        onPinChange(undefined, index);
      },
      [changeFocusPin, currentPin, onPinChange]
    );

    const handleChangePin = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const valuesArray = event.target.value.split('');
        const matchPattern = regexPattern.test(valuesArray[0]);

        setPinValue(prev => {
          const newPin = [...prev];
          newPin[index] = valuesArray[0];
          return newPin;
        });

        setCurrentPin(prev => {
          const newPin = [...prev];
          newPin[index] = valuesArray[0];
          return newPin;
        });

        if (!matchPattern) {
          setErrorList(prev => {
            const newErrList = [...prev];
            newErrList[index] = true;
            return newErrList;
          });

          return null;
        }

        setErrorList(prev => {
          const newErrList = [...prev];
          newErrList[index] = false;
          return newErrList;
        });

        changeFocusPin(index + 1);
      },
      [changeFocusPin, regexPattern, setPinValue]
    );

    const renderBorder = React.useCallback((errValue: boolean | undefined) => {
      if (errValue === undefined) {
        return null;
      }

      if (!errValue) {
        return 'hq-block-pin-correct';
      }

      return 'hq-block-pin-false';
    }, []);

    const disabledCheck = React.useCallback(
      (index: number) => {
        if (disabled) return true;

        return errorList?.findIndex(el => el) + 1
          ? index > errorList?.findIndex(el => el)
          : false;
      },
      [errorList, disabled]
    );

    React.useEffect(() => {
      if (pins?.length > 0) {
        setCurrentPin(pins);
      }
    }, [pins]);

    React.useEffect(() => {
      setisInPasswordMode(passwordMode || false);
    }, [passwordMode]);

    React.useEffect(() => {
      changeFocusPin(0);
    }, [changeFocusPin]);

    React.useEffect(() => {
      setErrorList(new Array(pinLength).fill(undefined));
    }, [pinLength]);

    React.useEffect(() => {
      const allDataValid =
        currentPin.every(pin => pin) && currentPin.length === pinLength;
      const haveErrEl = errorList.some(e => e);
      if (allDataValid && !haveErrEl) {
        onSuccess?.();
      }
    }, [currentPin, errorList, onSuccess, pinLength]);

    return (
      <div ref={ref} {...other}>
        {new Array(pinLength).fill('pin-input').map((_, index) => (
          <input
            key={`pinner+${index}`}
            className={`hq-block-pin ${renderBorder(
              errorList[index]
            )} ${className}`}
            ref={el => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            style={{
              width: pinWidth,
              height: pinHeight,
              ...userStyle,
              ...style,
            }}
            maxLength={1}
            max={1}
            disabled={disabledCheck(index)}
            onChange={event => handleChangePin(event, index)}
            onKeyDown={event => handlePressBack(event, index)}
            value={currentPin?.[index] || ''}
            type={isInPasswordMode ? 'password' : 'text'}
          />
        ))}
      </div>
    );
  }
);

PinInput.displayName = 'PinInput';
