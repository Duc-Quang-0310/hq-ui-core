import React from 'react';

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: unknown) {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, _errorInfo: unknown) {
    // <-- Log out the current errors -->
    // eslint-disable-next-line no-console
    console.log('🚀 ~ Errors: ', error);
  }

  componentWillUnmount(): void {
    this.setState({ hasError: false });
  }

  render() {
    const { children, fallback } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        fallback || (
          <div className="err-container">
            <div className="err-title">Oops</div>
            <div className="err-message">
              Something went wrong, please try again later.
            </div>
          </div>
        )
      );
    }

    return children;
  }
}
