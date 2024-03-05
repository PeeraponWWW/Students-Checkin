import { useState } from "react";
import { format, set } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
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
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import makeid from "../../helper"
import { db } from "../../firebase"
import { collection ,addDoc } from "firebase/firestore";


export default function TeacherHome() {
  const [subject, setSubject] = useState("") 
  const [room, setRoom] = useState("")
  const [code, setCode] = useState(makeid(5))
  const [date, setDate] = useState(new Date())
  const handlesavecheckin = () => {
    addDoc(collection(db, "checkin"), {
      subject: subject,
      room: room,
      id: code,
      class_date: date
    }).then(() => {
      console.log("Document successfully written!");
      setSubject("")
      setRoom("")
      setCode(makeid(5))
      setDate(new Date())
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  }
  return (
    <div>
      <h1>Teacher Home</h1>

      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">เพิ่มเช็คชื่อ</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>เพิ่มเช็คชื่อ</DialogTitle>
          <DialogDescription>
            เพิ่มรายการเช็คชื่อใหม่
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              วิชา
            </Label>
            <Input
              id="subject"
              defaultValue=""
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
              defaultValue=""
              className="col-span-3"
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              รหัสห้อง
            </Label>
            <Input
              id="code"
              defaultValue={code}
              className="col-span-3"
              onChange={(e) => setCode(e.target.value)}
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
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handlesavecheckin}>บันทึก</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  );
}