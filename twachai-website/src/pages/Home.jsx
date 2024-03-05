import { useState, useEffect } from "react";
import { auth, db } from '../../firebase'
import { collection, query, where, getDocs} from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import Layout from "../Layout";
import StudentHome from "@/components/StudentHome";
import TeacherHome from "@/components/TeacherHome";

export default function Home() {
  const [isStdORTc, setIsStdORTc] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let q = query(collection(db, "students"), where("email", "==", user.email));
        getDocs(q).then((querySnapshot) => {
          if(querySnapshot.size > 0){
            setIsStdORTc("student")
          }
        }).catch((error) => {
          console.log("Error getting documents: ", error);
        });
        q = query(collection(db, "teachers"), where("email", "==", user.email));
        getDocs(q).then((querySnapshot) => {
          if(querySnapshot.size > 0){
            setIsStdORTc("teacher")
          }
        }).catch((error) => {
          console.log("Error getting documents: ", error);
        });
      }
    });
  }, [])
  return (
    <Layout>
      <div className="container sm:px-2">
        {isStdORTc === "student" ? <StudentHome/> : isStdORTc === "teacher" ? <TeacherHome/> : isStdORTc === null && <h1>Not found</h1>}
      </div>
    </Layout>
  );
}
