import { Button, HQButtonType, HQButtonVariant } from '../Button/Button';
import React from 'react';

export interface HQMessage {
  type?: HQButtonType;
  message?: string;
  color?: string;
}

export interface HQNumberPicker
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'value'
  > {
  pickerSize?: 'xs' | 's' | 'md' | 'lg';
  onChange?: (value: number) => void;
  value?: number;
  min?: number;
  max?: number;
  disableModifier?: boolean;
  button?: {
    variant?: HQButtonVariant;
    color?: string;
  };
  textColor?: string;
}

export const NumberPicker = React.forwardRef<HTMLInputElement, HQNumberPicker>(
  (
    {
      disabled,
      onChange,
      className,
      pickerSize = 'md',
      disableModifier = false,
      width,
      value,
      min,
      max,
      button = {
        variant: 'ghost',
        color: '#CFD7E3',
      },
      style,
      textColor = '#394960',
      ...other
    },
    ref
  ) => {
    const [numberValue, setNumberValue] = React.useState<number>(value || 0);
    return (
      <div
        className={className}
        data-number-picker-size={pickerSize}
        data-number-picker-disabled={disabled}
        style={{ width }}
      >
        <Button
          size={pickerSize}
          data-action="add"
          variant={button.variant}
          style={{ borderWidth: '2px' }}
          color={button.color}
          onClick={() => setNumberValue(prev => prev + 1)}
          disabled={
            disabled ||
            disableModifier ||
            (max !== undefined &&
              max !== null &&
              numberValue !== undefined &&
              numberValue !== null &&
              numberValue >= max - 1) ||
            false
          }
        >
          <span style={{ color: textColor }}>+</span>
        </Button>
        <input
          type="number"
          ref={ref}
          data-custom="hq-input-number"
          onChange={e => onChange?.(parseInt(e.target.value, 10))}
          value={numberValue}
          disabled={disabled}
          style={{
            color: textColor,
            ...style,
          }}
          {...other}
        />
        <Button
          size={pickerSize}
          data-action="minus"
          variant={button.variant}
          style={{ borderWidth: '2px' }}
          color={button.color}
          onClick={() => setNumberValue(prev => prev - 1)}
          disabled={
            disabled ||
            disableModifier ||
            (min !== undefined &&
              min !== null &&
              numberValue !== undefined &&
              numberValue !== null &&
              numberValue <= min + 1) ||
            false
          }
        >
          <span style={{ color: textColor }}>-</span>
        </Button>
      </div>
    );
  }
);
