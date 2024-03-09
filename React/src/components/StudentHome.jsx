import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { Terminal } from "lucide-react";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import DrawerComment from "./teacher/DrawerComment";
import { postToFirebase } from "../../helper";
import { hostname } from "../../config";
import { dateoptions } from "../../helper";

export default function StudentHome() {
  const [searchParams] = useSearchParams();
  const [checkin, setCheckin] = useState(searchParams.get('checkin'));

  const [user, setUser] = useState(null);
  const [code, setCode] = useState("");
  const [stddata, setStddata] = useState(null);
  const [roomdata, setRoomdata] = useState(null);
  const [haveroom, setHaveroom] = useState(null);
  const [qanda, setQanda] = useState(false);

  const handleCheckin = async () => {
    let q = query(collection(db, "checkin"), where("id", "==", code));
    const querySnapshot = await getDocs(q);
    if (!stddata) {
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          let room = doc.data();
          let checked = room.checked ? room.checked : [];
          let data = postToFirebase({
            std_id: "unknown",
            name: user.displayName,
            checked_date: new Date(),
          });
          checked.push(data);
          updateDoc(doc.ref, { checked })
            .then(() => {
              console.log("Document successfully updated!");
              setRoomdata(room);
              setHaveroom(true);
            })
            .catch((error) => {
              setHaveroom(false);
              console.error("Error updating document: ", error);
            });
        }
      });
      if (querySnapshot.size === 0) {
        setHaveroom(false);
      }
      return;
    }
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        let room = doc.data();
        let std = stddata;
        let checked = room.checked ? room.checked : [];
        let data = postToFirebase({
          std_id: std.id,
          name: std.name,
          checked_date: new Date(),
        });
        checked.push(data);
        updateDoc(doc.ref, { checked })
          .then(() => {
            console.log("Document successfully updated!");
            setRoomdata(room);
            setHaveroom(true);
          })
          .catch((error) => {
            setHaveroom(false);
            console.error("Error updating document: ", error);
          });
      }
    });
    if (querySnapshot.size === 0) {
      setHaveroom(false);
    }
  };

  const handleCheckinWithQR = async (code) => {
    if (!stddata) {
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          let room = doc.data();
          let checked = room.checked ? room.checked : [];
          let data = postToFirebase({
            std_id: "unknown",
            name: user.displayName,
            checked_date: new Date(),
          });
          checked.push(data);
          updateDoc(doc.ref, { checked })
            .then(() => {
              console.log("Document successfully updated!");
              setRoomdata(room);
              setHaveroom(true);
            })
            .catch((error) => {
              setHaveroom(false);
              console.error("Error updating document: ", error);
            });
        }
      });
      if (querySnapshot.size === 0) {
        setHaveroom(false);
      }
      return;
    }
    let q = query(collection(db, "checkin"), where("id", "==", code));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        let room = doc.data();
        let std = stddata;
        let checked = room.checked ? room.checked : [];
        let data = postToFirebase({
          std_id: std.id,
          name: std.name,
          checked_date: new Date()
        });
        checked.push(data);
        updateDoc(doc.ref, { checked })
          .then(() => {
            console.log("Document successfully updated!");
            setRoomdata(room);
            setHaveroom(true);
            if (searchParams.has('checkin')) {
              searchParams.delete('checkin');
              window.history.replaceState({}, '', `${hostname}`);
            }
          })
          .catch((error) => {
            setHaveroom(false);
            console.error("Error updating document: ", error);
          });
      }
    });
    if (querySnapshot.size === 0) {
      setHaveroom(false);
    }
  };

  const handlecheckroom = async (code) => {
    let q = query(collection(db, "checkin"), where("id", "==", code));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        setQanda(true);
      }
    });
    if (querySnapshot.size === 0) {
      setHaveroom(false);
    }
  };


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        let q = query(
          collection(db, "students"),
          where("email", "==", user.email)
        );
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setStddata(doc.data());
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    });
  }, []);

  useEffect(() => {
     if(stddata){
      if (checkin) {
        handleCheckinWithQR(checkin);
     }
    }
  }, [checkin, stddata]);
  return (
    <div className="min-h-dvh">
      <h1 className="mb-4 text-center text-lg">สำหรับนักเรียน/นักศึกษา</h1>
      <div className="mb-4">
        {haveroom ? (
          <div></div>
        ):(
          <div className="flex gap-2">
          <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">เช็คชื่อเข้าเรียน</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>เช็คชื่อ</DialogTitle>
              <DialogDescription>
                กรุณากรอกรหัสห้องเรียนที่ได้จากครู/อาจารย์
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
                <Button type="button" onClick={handleCheckin}>
                  เช็คชื่อ
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">ถาม-ตอบ</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>ถาม-ตอบ</DialogTitle>
              <DialogDescription>
                กรุณากรอกรหัสห้องเรียนที่ได้จากครู/อาจารย์
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
                  onChange={(e) => {
                    setCode(e.target.value);
                    handlecheckroom(e.target.value);
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                {qanda && <DrawerComment roomId={code} />}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
        )}
        
      </div>
      {haveroom ? (
        <>
        <Alert variant="success" className="mb-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>เช็คชื่อสำเร็จ</AlertTitle>
          <AlertDescription>
            ขอบคุณที่เข้าเรียน วิชา {roomdata.subject} ห้อง {roomdata.room}{" "}
            วันที่ {new Date().toLocaleDateString('en-US',dateoptions).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')} เข้าเรียนเวลา{" "}
            {new Date().toLocaleTimeString('en-US', { hour12: false })} น. สอนโดย {roomdata.teacher_name}
          </AlertDescription>
        </Alert>
        <DrawerComment roomId={roomdata.id}/>
      </>
      ) : (
        haveroom === false && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>เช็คชื่อไม่สำเร็จ</AlertTitle>
            <AlertDescription>
              กรุณาตรวจสอบรหัสห้องและลองใหม่อีกครั้ง
            </AlertDescription>
          </Alert>
        )
      )}
    </div>
  );
}
