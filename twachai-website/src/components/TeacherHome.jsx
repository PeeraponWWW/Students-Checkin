import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { db, auth } from "../../firebase"
import { collection , onSnapshot  } from "firebase/firestore";
import CheckinList from "./teacher/checkinlist";
import { DialogForm } from "./teacher/DialogForm";
import { onAuthStateChanged } from "firebase/auth";

export default function TeacherHome() {
  const [checkin, setCheckin] = useState([])
  const [user, setUser] = useState({email: "", displayName: ""})
  
  const handlegetcheckin = () => {
    onSnapshot(collection(db, "checkin"), (querySnapshot) => {
      let temp = []
      querySnapshot.forEach((doc) => {
        temp.push(doc.data())
      });
      setCheckin(temp)
    });
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
    <div>
      <h1>Teacher Home</h1>
      <DialogForm title="เพิ่มเช็คชื่อ" des="เพิ่มรายการเช็คชื่อใหม่" email={user.email} name={user.displayName}/>
      <Button onClick={handlegetcheckin}>แสดงรายการเช็คชื่อ</Button>
      {checkin.length > 0 && <CheckinList checkin={checkin}/>}
    </div>
  );
}