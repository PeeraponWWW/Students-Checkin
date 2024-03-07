import { useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogForm } from "./DialogForm";
import { ShowQR } from "./ShowQR";
import DrawerComment from "./DrawerComment";

export const ShowDetail = ({ data }) => {
  return (
      <Drawer>
        <DrawerTrigger asChild><Button>การเข้าเรียน</Button></DrawerTrigger>
        <DrawerContent className="max-h-[100dvh]">
          <DrawerHeader>
            <DrawerTitle>การเข้าเรียนวิชา: {data.subject}</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ลำดับ</TableHead>
                <TableHead>รหัสนักศึกษา</TableHead>
                <TableHead>ชื่อ</TableHead>
                <TableHead>เวลาเช็คชื่อ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.checked.map((detail, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{detail.std_id ? detail.std_id : ""}</TableCell>
                    <TableCell>{detail.name ? detail.name : ""}</TableCell>
                    <TableCell>
                      {detail.checked_date
                        ? new Date(detail.checked_date).toLocaleTimeString()
                        : ""}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">ปิด</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  );
};

export default function CheckinList({ ...props }) {
  const [stdChecked, setStdChecked] = useState({});

  return (
    <div>
      <h1 className="text-xl font-bold">รายการเช็คชื่อ</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ลำดับ</TableHead>
            <TableHead>วิชา</TableHead>
            <TableHead>ห้องเรียน</TableHead>
            <TableHead>กลุ่มเรียน</TableHead>
            <TableHead>วันที่</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.checkin.map((checkin, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{checkin.subject}</TableCell>
                <TableCell>{checkin.room}</TableCell>
                <TableCell>{checkin.section}</TableCell>
                <TableCell>
                  {checkin.class_date.toDate().toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {checkin.checked && (
                    // <Button >
                    //   การเข้าเรียน
                    // </Button>
                    <ShowDetail
                      onClick={() => {
                        setStdChecked({
                          checked: checkin.checked,
                          subject: checkin.subject,
                        });
                      }}
                      data={{
                        checked: checkin.checked,
                        subject: checkin.subject,
                      }}
                    />
                  )}
                  {/* <Button>ถาม-ตอบ</Button> */}
                  <DrawerComment roomId={checkin.id} />
                  <ShowQR code={checkin.id} />
                  <DialogForm
                    title="แก้ไข"
                    des="แก้ไขรายการเช็คชื่อ"
                    subject={checkin.subject}
                    room={checkin.room}
                    code={checkin.id}
                    date={checkin.class_date.toDate()}
                    section={checkin.section}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {stdChecked.checked && <ShowDetail data={stdChecked} />}
    </div>
  );
}
