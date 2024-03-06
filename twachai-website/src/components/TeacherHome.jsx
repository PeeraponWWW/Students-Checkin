import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { db, auth } from "../../firebase"
import { collection , onSnapshot, where, query  } from "firebase/firestore";
import CheckinList from "./teacher/checkinlist";
import { DialogForm } from "./teacher/DialogForm";
import { onAuthStateChanged } from "firebase/auth";

export default function TeacherHome() {
  const [checkin, setCheckin] = useState([])
  const [user, setUser] = useState({email: "", displayName: ""})
  
  const handlegetcheckin = () => {
    // onSnapshot(collection(db, "checkin"), (querySnapshot) => {
    //   let temp = []
    //   querySnapshot.forEach((doc) => {
    //     temp.push(doc.data())
    //   });
    //   setCheckin(temp)
    // });

    onSnapshot(
      query(
        collection(db, "checkin"),
        where("teacher_email", "==", user.email)
      ),
      (querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
        setCheckin(temp)
      }
    );

  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        console.log("User is signed out")
      }
    });
  }, [])
 
  return (
    <div className="min-h-dvh">
      <h1 className="mb-4 text-center text-lg">สำหรับครู/อาจารย์</h1>
      <div className="mb-4 flex gap-4">
        <DialogForm title="เพิ่มเช็คชื่อ" des="เพิ่มรายการเช็คชื่อใหม่" email={user.email} name={user.displayName}/>
        <Button onClick={handlegetcheckin}>แสดงรายการเช็คชื่อ</Button>
      </div>
      {checkin.length > 0 && <CheckinList checkin={checkin}/>}
    </div>
  );
}