import { useState, useEffect } from 'react'
import { onAuthStateChanged,  GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../firebase'
import { Button } from './components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Layout({ children }) {
    const [user, setUser] = useState(null)

    const Login = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setUser(user)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }
    const Logout = () => {
        signOut(auth).then(() => {
            setUser(null)
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
        });
    }, [])
    return (
        <div>
            <h1>Header</h1>
            {user ? (
                <>
                    สวัสดี <p>{user.displayName}</p>
                    <Avatar>
                        <AvatarImage src={user.photoURL} />
                        <AvatarFallback>{user.displayName}</AvatarFallback>
                    </Avatar>

                    <Button onClick={Logout}>Logout</Button>
                </>
            ):(
                <Button onClick={Login}>Login</Button>
            )}
                {children}
            <h1>Footer</h1>
        </div>
    )
}