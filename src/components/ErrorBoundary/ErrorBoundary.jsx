import React, { Component } from "react";

import { ErrorInfo } from "./ErrorInfo";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorInfo error={this.state.error} />;
    }
    return this.props.children;
  }
}
