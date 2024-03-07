import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { db} from "../../../firebase";
import { useState } from "react";
import { collection , onSnapshot, where, query  } from "firebase/firestore";
import Qusetion_Answer from "./Qusetion_Answer";


export default function DrawerComment({roomId}){
    const [lCommnet, setlCommnet] = useState([]);
    const handelQuereyListCommnet = () => {
        onSnapshot(
            query(
              collection(db, "checkin"),
              where("id", "==", roomId)
            ),
            (querySnapshot) => {
              let temp = [];
              querySnapshot.forEach((doc) => {
                temp.push(doc.data().comments);
              });
              setlCommnet(temp)
            }
        );
    };
    return (
        <Drawer>
            <DrawerTrigger asChild ><Button className="inline-block" onClick={handelQuereyListCommnet}>ถาม-ตอบ</Button></DrawerTrigger>
            <DrawerContent>
                <div className="h-[95dvh] py-2 px-5">
                    <div className="w-100">
                        <DrawerHeader>
                            <DrawerTitle><p className="text-[24px] mb-2">ถาม-ตอบ</p></DrawerTitle>
                            <DrawerDescription><span className="border-b-2 pb-2 block text-[16px]">คอมเมนต์</span></DrawerDescription>
                        </DrawerHeader>
                    </div>
                    <div className="w-100 px-4">
                        {
                            lCommnet.length < 1 || lCommnet[0] == undefined || lCommnet == undefined || lCommnet == null  ? (
                                <div>
                                    <h4>ไม่มีคอมเมนต์</h4>
                                </div>
                            ) : (
                                <div className="h-[60dvh] overflow-y-auto">
                                    {
                                        lCommnet[0].map((cm, index) =>
                                            <div key={index} className="bg-slate-100 p-2 mb-4 rounded-sm">
                                                <h4 className="text-[16px] font-semibold">{cm.name}</h4>
                                                <p className="text-[14px] font-normal">{cm.content}</p>
                                            </div>

                                        )
                                    }
                                </div>
                            )
                        }
                        <Qusetion_Answer roomId={roomId}/>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">ปิด</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </div>
            </DrawerContent>
            

        </Drawer>
    )
}