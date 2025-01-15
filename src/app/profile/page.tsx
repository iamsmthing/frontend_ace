"use client";
import ProfilePage from "@/components/profile-page/ProfilePage";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useAuth } from "@/contexts/auth-context";
import React from "react";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoadingOverlay />;
  }
  return <ProfilePage user={user} />;
};

export default Profile;
