import React from 'react';
import { ErrorFilled, SuccessFilled } from '../Icon';

export type HQStepDirection = 'vertical' | 'horizontal';

export interface HQStepItem {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  colorSchema?: string;
  finishEL?: React.ReactNode;
  ErrorEl?: React.ReactNode;
  content?: React.ReactNode;
  indicator?: React.ReactNode;
  isError?: boolean;
  disableChange?: boolean;
}

export interface HQStepsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  width?: number | string;
  height?: number | string;
  direction?: HQStepDirection;
  currentPos?: number;
  items?: HQStepItem[];
  handleChangeStep?: (step: number) => void;
}

type StepProps = HQStepItem & {
  direction: HQStepDirection;
  isActive: boolean;
  isSuccess: boolean;
  index: number;
  onChangeStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
};

const StepItem: React.FC<StepProps> = ({
  ErrorEl,
  colorSchema = '#366AE2',
  content = 'Body content',
  finishEL,
  subTitle,
  title = 'Content title',
  indicator,
  direction,
  index,
  isActive,
  isError,
  isSuccess,
  onChangeStep,
  disableChange,
  isLastStep,
  isFirstStep,
}) => {
  const renderIcon = (isError: boolean, isSuccess: boolean) => {
    if (isSuccess) {
      return finishEL ? finishEL : <SuccessFilled fill={colorSchema} />;
    }

    if (isError) {
      return ErrorEl ? ErrorEl : <ErrorFilled />;
    }

    return indicator ? (
      indicator
    ) : (
      <span style={{ color: isActive ? 'white' : 'rgba(0, 0, 0, 0.65)' }}>
        {index}
      </span>
    );
  };

  const renderBorderColor = React.useCallback(() => {
    if (isActive || isSuccess) {
      return colorSchema;
    }

    if (isError) {
      return '#e14337';
    }

    return '#F2F5F8';
  }, [isActive, isSuccess, isError, colorSchema]);

  const renderBGColor = () => {
    if (isActive) {
      return colorSchema;
    }

    if (isSuccess || isError) {
      return 'white';
    }

    return 'rgba(0, 0, 0, 0.06)';
  };

  const handleChangeStep = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!disableChange) onChangeStep();
  };

  if (direction === 'vertical') {
    return (
      <section
        className="hq-item-vertical"
        style={{ opacity: isActive ? 1 : 0.5 }}
      >
        <div
          className="hq-step-title_container"
          style={{
            cursor: 'pointer',
            borderRight: !isLastStep
              ? `3px solid ${renderBorderColor()}`
              : undefined,
          }}
          onClick={handleChangeStep}
        >
          {title ? <p className="title">{title}</p> : null}
          {subTitle ? <p className="sub-title">{subTitle}</p> : null}
          <div
            style={{
              backgroundColor: renderBGColor(),
            }}
            className={`step-icon ${isLastStep ? 'last-step' : ''}`}
          >
            {renderIcon(isError || false, isSuccess)}
          </div>
        </div>
        <div className="hq-step-content_container">{content}</div>
      </section>
    );
  }

  return (
    <section
      className="hq-item-horizontal"
      style={{
        opacity: isActive ? 1 : 0.5,
        flex: !isFirstStep ? '1 1 60px' : undefined,
      }}
    >
      {!isFirstStep ? (
        <div
          className="horizontal-line-progress"
          style={{
            backgroundColor: renderBorderColor(),
          }}
        />
      ) : null}
      <div
        className="horizontal-icon"
        style={{
          backgroundColor: renderBGColor(),
        }}
        onClick={handleChangeStep}
      >
        {renderIcon(isError || false, isSuccess)}
      </div>
      <div>
        {title ? <p className="horizontal-title">{title}</p> : null}
        {subTitle ? <p className="horizontal-sub-title">{subTitle}</p> : null}
      </div>
    </section>
  );
};

export const Steps = React.forwardRef<HTMLDivElement, HQStepsProps>(
  (
    {
      width = '100%',
      height = '100px',
      style,
      direction = 'vertical',
      currentPos,
      items,
      className,
      handleChangeStep,
      ...other
    },
    ref
  ) => {
    const [currentStep, setCurrentStep] = React.useState<number>(1);

    React.useEffect(() => {
      if (currentPos) setCurrentStep(currentPos);
    }, [currentPos]);

    return (
      <>
        <section
          data-step-display={direction}
          ref={ref}
          className={`hq-steps ${className}`}
          {...other}
        >
          {items?.map((step, index) => (
            <StepItem
              key={`stepItem${index}`}
              index={index + 1}
              ErrorEl={step?.ErrorEl}
              colorSchema={step?.colorSchema}
              content={step?.content}
              finishEL={step?.finishEL}
              indicator={step?.indicator}
              subTitle={step?.subTitle}
              title={step?.title}
              isError={step?.isError || false}
              direction={direction}
              isActive={currentStep === index + 1}
              isSuccess={index + 1 < currentStep}
              onChangeStep={() => {
                setCurrentStep(index + 1);
                handleChangeStep?.(index + 1);
              }}
              disableChange={step?.disableChange || false}
              isLastStep={index + 1 === items?.length}
              isFirstStep={index === 0}
            />
          ))}
        </section>
        {direction === 'horizontal' ? (
          <div>{items?.[currentStep - 1]?.content}</div>
        ) : null}
      </>
    );
  }
);

Steps.displayName = 'Steps';
