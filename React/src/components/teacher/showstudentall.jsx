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
        <h1 className="text-xl font-bold">รายชื่อนักเรียน/นักศึกษา</h1>
        <Studentform title="เพิ่มนักเรียน" des="เพิ่มนักเรียน/นักศึกษาของท่าน"/>
        <Table>
  <TableCaption>แสดงชื่อนักเรียน/นักศึกษา</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ลำดับ</TableHead>
      <TableHead>รหัสนักศึกษา</TableHead>
      <TableHead>ชื่อ</TableHead>
      <TableHead>อีเมล</TableHead>
      <TableHead className="text-right">Action</TableHead>
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
      <TableCell className="text-right">
      <Studentform title="แก้ไข" des="แก้ไขข้อมูล" id={students.id} name={students.name} email={students.email} section={students.section} />
      </TableCell>
    </TableRow>
  )})}
    
  </TableBody>
</Table>
</>
    )
  }