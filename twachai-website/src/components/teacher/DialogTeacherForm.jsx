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

export default function TeacherForm({...props}){
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")

    const handlesaveteacherform = () =>{
        addDoc(collection(db,"teachers"),{
          email:email,
          name:name
        }).then(()=>{
          setEmail("")
          setName("")
        }).catch((error)=>{
          console.error("Error writing document: ", error)
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
              <Label htmlFor="name" className="text-right">
                ชื่อ
              </Label>
              <Input
                id="name"
                defaultValue={name}
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                อีเมล
              </Label>
              <Input
                id="emai"
                defaultValue={email}
                className="col-span-3"
                onChange={(e) => setEmail(e.target.value)}
              />
            
            </div>
            {/* {alert && <Alert variant="success">
                <Terminal className="h-4 w-4" />
                <AlertTitle>แก้ไขรายการเช็คชื่อสำเร็จ</AlertTitle>
              <AlertDescription>
                รายการเช็คชื่อได้รับการแก้ไขเรียบร้อยแล้ว
              </AlertDescription>
              </Alert>} */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
                {props.title === "เพิ่มอาจารย์" ? <Button type="button" onClick={handlesaveteacherform}>เพิ่มอาจารย์</Button> : (
                    <>
                        <Button type="button">แก้ไข</Button>
                        <Button  type="button" >ลบ</Button>
                    </>
                )}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}