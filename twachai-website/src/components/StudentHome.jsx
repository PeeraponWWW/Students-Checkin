import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, updateDoc} from "firebase/firestore"; 
import { postToFirebase } from "../../helper";


export default function StudentHome() {
    const [code, setCode] = useState("")
    const [stddata, setStddata] = useState(null)
    const [haveroom, setHaveroom] = useState(false)

    const handleCheckin = async () => {
        if (!stddata) {
            console.error("Student data is not available yet.");
            return;
        }
        if (code === "") {
            console.error("Code is empty.");
            return;
        }
        let q = query(collection(db, "checkin"), where("id", "==", code));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if(doc.exists()){
                let room = doc.data()
                let std = stddata
                console.log(std)
                let checked = room.checked? room.checked : []
                let data = postToFirebase({
                    std_id: std.id,
                    name: std.name,
                    checked_date: new Date(),
                    section: std.section
                })
                checked.push(data)
                updateDoc(doc.ref, 
                    { checked }
                ).then(() => {
                    console.log("Document successfully updated!");
                    setHaveroom(true)
                }).catch((error) => {
                    console.error("Error updating document: ", error);
                });
            }
        });
}

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                let q = query(collection(db, "students"), where("email", "==", user.email));
                getDocs(q).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setStddata(doc.data())
                        console.log(stddata)
                    });
                }).catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            }
        });
    }, [])
  return (
    <div>
      <h1>Student Home</h1>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">เช็คชื่อเข้าเรียน</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>เช็คชื่อ</DialogTitle>
          <DialogDescription>
            กรุณากรอกรหัสที่ตได้จากครู/อาจารย์
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              รหัสห้อง
            </Label>
            <Input
              id="code"
              defaultValue=""
              className="col-span-3"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleCheckin}>เช็คชื่อ</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  );
}