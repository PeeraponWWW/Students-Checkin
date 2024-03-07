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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export default function Studentform({...props}){
  const [email,setEmail] = useState("")
  const [id,setId] = useState("")
  const [name,setName] = useState("")
  const [section,setSection] = useState("")
  const [alert, setAlert] = useState(false)
  
  const handlesavestudentform = () =>{
    addDoc(collection(db,"students"),{
      id:id,
      email:email,
      name:name,
      section:Number(section)
    }).then(()=>{
      setEmail("")
      setId("")
      setName("")
      setSection("")
    }).catch((error)=>{
      console.error("Error writing document: ", error)
    })
  }
  const handelupdatestudent = async ()=>{
    try{
      const data = query(collection(db, "students"), where("id", "==", id));
      const realtime = await getDocs(data)
      realtime.forEach((docs) => {
        updateDoc(doc(db, "students", docs.id), {
            name:name,
            email:email,
            section:Number(section)
        }).then(() => {
            console.log("Document successfully updated!");
            setAlert(true)
            setName("");
            setEmail("");
            setSection("");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    })
    }catch (error) {
      console.error("Error updating document: ", error);
  }
  }
  const handeldeletestudent = async(id) => {
    const data = query(collection(db, "students"), where("id", "==", id));
    const realtime = await getDocs(data)
    realtime.forEach((doc) => {
      if(doc.exists()){
          deleteDoc(doc.ref).then(() => {
              console.log("Document successfully deleted!");
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
      }
  });
  }
  useEffect(()=>{
    if(props.id){setId(props.id)}
    if(props.name){setName(props.name)}
    if(props.email){setEmail(props.email)}
    if(props.section){setSection(props.section)}
  },[props.id,props.name,props.email,props.section])
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
              <Label htmlFor="id" className="text-right">
                รหัสนักศึกษา
              </Label>
              {props.title=="แก้ไข" ?  <Input
                id="id"
                defaultValue={id}
                className="col-span-3"
                disabled
              /> :  <Input
                id="id"
                defaultValue={id}
                className="col-span-3"
                onChange={(e) => setId(e.target.value)}
              />
              }
             
            </div>
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
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section" className="text-right">
                section
              </Label>
              <Input
                id="section"
                defaultValue={section}
                className="col-span-3"
                onChange={(e) => setSection(e.target.value)}
              />
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
                {props.title === "เพิ่มนักเรียน" ? <Button type="button" onClick={handlesavestudentform}>เพิ่มนักเรียน</Button> : (
                    <>
                        <Button onClick={handelupdatestudent} type="button">แก้ไข</Button>
                        <Button type="button" onClick={()=>handeldeletestudent(id)}>ลบ</Button>
                    </>
                )}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
)
}