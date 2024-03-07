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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { db } from "../../../firebase"
import { collection ,addDoc, doc, updateDoc, where, deleteDoc, query, getDocs  } from "firebase/firestore";

export default function Studentform({...props}){
  const [email,setEmail] = useState("")
  const [id,setId] = useState("")
  const [name,setName] = useState("")
  
  const handlesavestudentform = () =>{
    addDoc(collection(db,"student"),{
      email:email,
      id:id,
      name:name
    })
  }
return(
    <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{props.title}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>
              {props.des}
            </DialogDescription>
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
              {props.title === "เพิ่มเช็คชื่อ" ? <Input
                id="code"
                defaultValue={code}
                className="col-span-3"
                onChange={(e) => setCode(e.target.value)}
                /> : <Input
                id="code"
                defaultValue={code}
                className="col-span-3"
                disabled
                />}
            
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
            {alert && <Alert variant="success">
                <Terminal className="h-4 w-4" />
                <AlertTitle>แก้ไขรายการเช็คชื่อสำเร็จ</AlertTitle>
              <AlertDescription>
                รายการเช็คชื่อได้รับการแก้ไขเรียบร้อยแล้ว
              </AlertDescription>
              </Alert>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
                {props.title === "เพิ่มเช็คชื่อ" ? <Button type="button" onClick={handlesavecheckin}>เช็คชื่อ</Button> : (
                    <>
                        <Button onClick={handleupdatecheckin} type="button">แก้ไข</Button>
                        <Button onClick={()=>handledeletecheckin(code)} type="button" >ลบ</Button>
                    </>
                )}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
)
}