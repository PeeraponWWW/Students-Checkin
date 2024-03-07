import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import Studentform from "./DialogStudentForm"

  export default function Showallstudent({...props}){
    return(
        <>
        <Studentform title="เพิ่มนักเรียน" des="เพิ่มนักเรียน/นักศึกษาของท่าน"/>
        <Table>
  <TableCaption>แสดงชื่อนักเรียน/นักศึกษา</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ลำดับ</TableHead>
      <TableHead>รหัสนักศึกษา</TableHead>
      <TableHead>ชื่อ</TableHead>
      <TableHead>อีเมล</TableHead>
      <TableHead className="text-right">Section</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {props.student.map((students,index) => {
    return(
    <TableRow key={index}>
      <TableCell className="font-medium">{index+1}</TableCell>
      <TableCell>{students.id}</TableCell>
      <TableCell>{students.name}</TableCell>
      <TableCell>{students.email}</TableCell>
      <TableCell className="text-right">{students.section}</TableCell>
    </TableRow>
  )})}
    
  </TableBody>
</Table>
</>
    )
  }