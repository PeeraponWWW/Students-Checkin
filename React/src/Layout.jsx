import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const Login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  const Logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      }else{
        setUser(null);
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="page-home">
        <div id="header" className="container py-4 sm:px-4">
          <div className="flex justify-between items-center justify-items-center">
            <h1 className="font-bold text-2xl">Students Checkin</h1>
            <div className="flex gap-4 items-center justify-items-center">
              {user ? (
                <>
                  <p>สวัสดี {user.displayName}</p>
                  <Avatar>
                    <AvatarImage src={user.photoURL} />
                    <AvatarFallback>{user.displayName}</AvatarFallback>
                  </Avatar>

                  <Button onClick={Logout}>Logout</Button>
                </>
              ) : (
                <Button onClick={Login}>Login</Button>
              )}
            </div>
          </div>
        </div>
        <div id="content" className="container sm:px-4 my-4">
          {children}
        </div>
      </div>
    );
  }
}
