import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import TeacherForm from "./DialogTeacherForm"

  export default function ShowallTeacher({...props}){
    return(
        <>
        <TeacherForm title="เพิ่มอาจารย์" des="เพิ่มอาจารย์ในห้องเรียน"/>
        <Table>
  <TableCaption>แสดงชื่ออาจารย์</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ลำดับ</TableHead>
      <TableHead>ชื่อ</TableHead>
      <TableHead>อีเมล</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {props.teacher.map((teachers,index) => {
    return(
    <TableRow key={index}>
      <TableCell className="font-medium">{index+1}</TableCell>
      <TableCell>{teachers.name}</TableCell>
      <TableCell>{teachers.email}</TableCell>
    </TableRow>
  )})}
    
  </TableBody>
</Table>
</>
    )
  }