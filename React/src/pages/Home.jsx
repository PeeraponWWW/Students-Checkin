import { useState, useEffect } from "react";
import { auth, db } from '../../firebase'
import { collection, query, where, getDocs} from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import Layout from "../Layout";
import StudentHome from "@/components/StudentHome";
import TeacherHome from "@/components/TeacherHome";
import NotFound from "@/components/NotFound";
import NotLogin from "@/components/NotLogin";

export default function Home() {
  const [isStdORTc, setIsStdORTc] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let q = query(collection(db, "students"), where("email", "==", user.email));
        getDocs(q).then((querySnapshot) => {
          if(querySnapshot.size > 0){
            setIsStdORTc("student")
            return;
          }
        }).catch((error) => {
          console.log("Error getting documents: ", error);
        });
        q = query(collection(db, "teachers"), where("email", "==", user.email));
        getDocs(q).then((querySnapshot) => {
          if(querySnapshot.size > 0){
            setIsStdORTc("teacher")
            return;
          }
        }).catch((error) => {
          console.log("Error getting documents: ", error);
        });
        if(user.email.split("@")[1] == "kkumail.com"){
          setIsStdORTc("student")
          return;
        }
        setIsStdORTc("unknown")
      }
    });
  }, [])
  return (
    <Layout>
      <div>
        {isStdORTc === "student" ? <StudentHome/> : isStdORTc === "teacher" ? <TeacherHome/> : isStdORTc === "unknown" ? <NotFound/> : <NotLogin/>}
      </div>
    </Layout>
  );
}
