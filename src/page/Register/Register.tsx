import { useState, lazy, Suspense } from 'react'
import { Header, Footer, Slider } from '../../layout/index'
import { Loader } from '../../components/index';
import React from 'react';

const Container = lazy(() => import('../../layout/Container/Container'));
const Registercontent = lazy(() => import('../../layout/Registercontent/Registercontent'));

function ErrorFallback() {
  return <Loader/>;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

const Register: React.FC = () => {

  return (
    <div className="Login">
      <ErrorBoundary>
        <Suspense fallback={<Loader/>}>
            <Registercontent/>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default Register;