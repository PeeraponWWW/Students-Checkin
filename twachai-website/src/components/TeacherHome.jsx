import { useState } from "react";
import { Button } from "./ui/button";
import { db } from "../../firebase"
import { collection , onSnapshot  } from "firebase/firestore";
import CheckinList from "./teacher/checkinlist";
import { DialogForm } from "./teacher/DialogForm";

export default function TeacherHome() {
  const [checkin, setCheckin] = useState([])
  
  const handlegetcheckin = () => {
    onSnapshot(collection(db, "checkin"), (querySnapshot) => {
      let temp = []
      querySnapshot.forEach((doc) => {
        temp.push(doc.data())
      });
      setCheckin(temp)
    });
  }
  return (
    <div>
      <h1>Teacher Home</h1>
    <DialogForm title="เพิ่มเช็คชื่อ" des="เพิ่มรายการเช็คชื่อใหม่"/>
    <Button onClick={handlegetcheckin}>แสดงรายการเช็คชื่อ</Button>
    {checkin.length > 0 && <CheckinList checkin={checkin}/>}
    </div>
  );
}