import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { db, auth } from "../../../firebase";
import { onSnapshot, setDoc, doc} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
  } from "firebase/firestore";
  import { postToFirebase } from "../../../helper";

function SubmitButton({user, commentValue, roomId, func}){
    const [qdata,setData] = useState()
    useEffect(() => {
        onSnapshot(
            query(
              collection(db, "checkin"),
              where("id", "==", roomId)
            ),
            (querySnapshot) => {
              let temp = [];
              querySnapshot.forEach((doc) => {
                temp.push(doc.data());
              });
              setData(temp)
            }
        );
    },[]);
    const insertComment = async () => {
        let q = query(collection(db, "checkin"), where("id", "==", roomId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.exists()) {
              let room = doc.data();
              let std = qdata;
              let comments = room.comments ? room.comments : [];
              let data = postToFirebase({
                content:commentValue,
                name:user.displayName,
              });
              comments.push(data);
              updateDoc(doc.ref, { comments })
                .then(() => {
                  console.log("Document successfully updated!");
                  func()
                })
                .catch((error) => {
                  console.error("Error updating document: ", error);
                  func()
                });
            }
          });
    }

    return (
        <Button onClick={insertComment} className="w-[100px]">ส่ง</Button>
    )
}

function TextInput({value , onChange}){
    return (
        <Input 
            value= { value }
            onChange= { (event) => {
                    var result = event.target.value;
                    onChange(result)
                    // console.log(result);
                }
            }
            type="text"
            placeholder="ป้อนคำถาม-คำตอบของคุณ"
        />
    )
}

export default function Qusetion_Answer({roomId}){
    const [user, setUser] = useState(null);
    const [comment, setComment] = useState("");

//  Responed form firebase
    const handleUser = (user) => { //Set user object
        setUser(user);
       
    };

    const handleComment = () => {
        setComment("")
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            handleUser(user)
          } else {
            console.log("User is signed out")
          }
        });
    }, [])

    const handleCommentValueChange = (newCommnet) => {
        setComment(newCommnet);
    };

    return (
        <>
            <div className="w-full mt-4">
                <div className="flex gap-2">
                    <TextInput value={comment} onChange={handleCommentValueChange}/>
                    <SubmitButton user={user} commentValue={comment} roomId={roomId} func={handleComment}/>
                </div>
            </div>
        </>
    )
}