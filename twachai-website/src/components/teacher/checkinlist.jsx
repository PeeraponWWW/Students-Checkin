import { useState } from "react";
import { Button } from "../ui/button";
import { DialogForm } from "./DialogForm";
import { db } from "../../../firebase"
import { collection ,query, where, getDocs, deleteDoc } from "firebase/firestore";

export const ShowDetail = ({data}) => {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ลำดับ</th>
                    <th>รหัสนักศึกษา</th>
                    <th>ชื่อ</th>
                    <th>เวลาเข้า</th>
                </tr>
                </thead>
                <tbody>
                {data.map((detail, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{detail.std_id? detail.std_id : ""}</td>
                            <td>{detail.name? detail.name : ""}</td>
                            <td>{detail.checked_date? new Date(detail.checked_date).toLocaleTimeString(): ""}</td>
                        </tr>
                    )
                }
                )}
                </tbody>
            </table>
        </div>
    )
}

export default function CheckinList({...props}) {
    const [stdChecked, setStdChecked] = useState([])

    return (
        <div>
            <h1>CheckinList</h1>
            <table>
                <thead>
                <tr>
                    <th>ลำดับ</th>
                    <th>วิชา</th>
                    <th>ห้อง</th>
                    <th>รหัสห้อง</th>
                    <th>วันที่</th>
                </tr>
                </thead>
                <tbody>
                {props.checkin.map((checkin, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{checkin.subject}</td>
                            <td>{checkin.room}</td>
                            <td>{checkin.id}</td>
                            <td>{checkin.class_date.toDate().toLocaleDateString()}</td>
                            <td>
                                {checkin.checked && <Button onClick={() => setStdChecked(checkin.checked)}>การเข้าเรียน</Button>}
                            </td>
                            <td><Button>ถาม-ตอบ</Button></td>
                            <td><DialogForm
                                title="แก้ไข"
                                des="แก้ไขรายการเช็คชื่อ"
                                subject={checkin.subject}
                                room={checkin.room}
                                code={checkin.id}
                                date={checkin.class_date.toDate()}
                            />
                            </td>
                        </tr>
                    )
                }
                )
            }
                </tbody>
            </table>
            {stdChecked.length > 0 && <ShowDetail data={stdChecked}/> }
        </div>
    );
}