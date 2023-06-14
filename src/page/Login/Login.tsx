import { useState, lazy, Suspense, useEffect } from "react";
import { Header, Footer, Slider } from "../../layout/index";
import { Loader } from "../../components/index";
import useLocalStorage from "../../hook/useLocalStorage";
import { useNavigate } from "react-router-dom";
import React from "react";

const Container = lazy(() => import("../../layout/Container/Container"));
const Logincontent = lazy(
  () => import("../../layout/Logincontent/Logincontent")
);

function ErrorFallback() {
  return <Loader />;
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

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const flag = localStorage.getItem("flag");
    if (flag) {
      navigate("/profile");
    }
  }, [navigate]);
  return (
    <div className="Login">
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Logincontent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Login;
