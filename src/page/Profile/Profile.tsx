import React, { useState, lazy, Suspense, useEffect, useContext } from "react";
import { ProfileHeader, ProfileStats, ProfileLinks } from "../../layout";
import useLocalStorage from "../../hook/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { AES, enc } from "crypto-ts";
import { Loader, PayStack } from "../../components/index";
import { userContext } from "../../context/User/userContext";

type Props = {};

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

const Profile: React.FC<Props> = (props) => {
  const { getStorage } = useLocalStorage();
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const links = [
    { href: "/panel/transfers", text: "Transfers", icon: "ion-card" },
    {
      href: "/panel/change-details",
      text: "Change details",
      icon: "ion-android-checkbox-outline",
    },
  ];

  if (!user) {
    return <Loader />;
  }

  const decryptedBytes = AES.decrypt(user, "07052580111");
  const decryptedData = decryptedBytes.toString(enc.Utf8);
  const flag = decryptedData ? JSON.parse(decryptedData) : {};

  const profile = {
    createdAt: flag?.createdAt || "",
    firstname: flag?.firstname || "",
    lastname: flag?.lastname || "",
    email: flag?.email || "",
    password: flag?.password || "",
    country: flag?.country || "",
    state: flag?.state || "",
    city: flag?.city || "",
    zip: flag?.zip || 0,
    phone: flag?.phone || "",
    amount: flag?.balance || 0,
    stats: {
      accsDetails: {
        type: "classic",
        balance: flag?.balance || 0,
      },
      messagesCount: 0,
    },
  };

  return (
    <div className="row panel-content">
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <div className="col">
            <section className="module profile">
              <ProfileHeader profile={profile} />
              <ProfileStats stats={profile.stats} />
              <ProfileLinks links={links} />
            </section>
            <PayStack></PayStack>
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Profile;
