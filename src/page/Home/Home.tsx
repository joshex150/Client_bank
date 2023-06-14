import { useState, lazy, Suspense } from 'react'
import { Header, Footer, Slider } from '../../layout/index'
import { Loader } from '../../components/index';
import React from 'react';

const Container = lazy(() => import('../../layout/Container/Container'));
const Homecontent = lazy(() => import('../../layout/Homecontent/Homecontent'));

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

const Home: React.FC = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="App" >
        <Slider/>
      <ErrorBoundary>
        <Suspense fallback={<Loader/>}>
          <Container>
            <Homecontent/>
          </Container>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default Home;
