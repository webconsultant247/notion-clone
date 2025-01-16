"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">
          {user?.firstName}
          &#39;s Space
        </h1>
      )}
      {/* Breadcrubms */}
      <Breadcrumbs />
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
