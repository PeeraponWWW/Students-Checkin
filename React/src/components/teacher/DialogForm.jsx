import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import { format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { makeid } from "../../../helper";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  where,
  deleteDoc,
  query,
  getDocs,
} from "firebase/firestore";

export function DialogForm({ ...props }) {
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");
  const [code, setCode] = useState(makeid(5));
  const [section, setSection] = useState("");
  const [date, setDate] = useState(new Date());
  const [alert, setAlert] = useState(false);

  const handlesavecheckin = () => {
    addDoc(collection(db, "checkin"), {
      subject: subject,
      room: room,
      id: code,
      class_date: date,
      section: Number(section),
      teacher_email: props.email,
      teacher_name: props.name,
    })
      .then(() => {
        console.log("Document successfully written!");
        setSubject("");
        setRoom("");
        setCode(makeid(5));
        setSection("");
        setDate(new Date());
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  //updatebycode
  const handleupdatecheckin = async () => {
    try {
      const q = query(collection(db, "checkin"), where("id", "==", code));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((docs) => {
        updateDoc(doc(db, "checkin", docs.id), {
          subject: subject,
          room: room,
          class_date: date,
          section: Number(section),
        })
          .then(() => {
            console.log("Document successfully updated!");
            setAlert(true);
            setSubject("");
            setRoom("");
            setCode(makeid(5));
            setSection("");
            setDate(new Date());
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  //deletebycode
  const handledeletecheckin = async (code) => {
    const q = query(collection(db, "checkin"), where("id", "==", code));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        deleteDoc(doc.ref)
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      }
    });
  };

  useEffect(() => {
    if (props.subject) {
      setSubject(props.subject);
    }
    if (props.room) {
      setRoom(props.room);
    }
    if (props.code) {
      setCode(props.code);
    }
    if (props.date) {
      setDate(props.date);
    }
    if (props.section) {
      setSection(props.section);
    }
  }, [props.subject, props.room, props.code, props.date, props.section]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{props.title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.des}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              วิชา
            </Label>
            <Input
              id="subject"
              defaultValue={subject}
              className="col-span-3"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="room" className="text-right">
              ห้อง
            </Label>
            <Input
              id="room"
              defaultValue={room}
              className="col-span-3"
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              รหัสห้อง
            </Label>
            {props.title === "เพิ่มเช็คชื่อ" ? (
              <Input
                id="code"
                defaultValue={code}
                className="col-span-3"
                onChange={(e) => setCode(e.target.value)}
              />
            ) : (
              <Input
                id="code"
                defaultValue={code}
                className="col-span-3"
                disabled
              />
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section" className="text-right">
              กลุ่มเรียน
            </Label>
            <Input
              type="number"
              min="1"
              onChange={(e) => setSection(e.target.value)}
              id="section"
              defaultValue={section}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              วันที่
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {alert && (
            <Alert variant="success">
              <Terminal className="h-4 w-4" />
              <AlertTitle>แก้ไขรายการเช็คชื่อสำเร็จ</AlertTitle>
              <AlertDescription>
                รายการเช็คชื่อได้รับการแก้ไขเรียบร้อยแล้ว
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            {props.title === "เพิ่มเช็คชื่อ" ? (
              <Button type="button" onClick={handlesavecheckin}>
                เช็คชื่อ
              </Button>
            ) : (
              <div className="flex gap-2 justify-end">
                <Button onClick={handleupdatecheckin} type="button">
                  แก้ไข
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>ลบ</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        คุณต้องการลบห้อง {subject} ใช่หรือไม่
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        หากคุณลบห้อง {subject} แล้ว
                        ข้อมูลทั้งหมดที่เกี่ยวข้องกับห้องนี้จะถูกลบทั้งหมด
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handledeletecheckin(code)}
                      >
                        ลบ
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
