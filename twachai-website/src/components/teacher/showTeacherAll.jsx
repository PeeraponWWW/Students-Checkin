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
        <h1 className="text-xl font-bold">รายชื่อครู/อาจารย์</h1>
        <TeacherForm title="เพิ่มอาจารย์" des="เพิ่มอาจารย์ในห้องเรียน"/>
        <Table>
  <TableCaption>แสดงชื่ออาจารย์</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ลำดับ</TableHead>
      <TableHead>ชื่อ</TableHead>
      <TableHead>อีเมล</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {props.teacher.map((teachers,index) => {
    return(
    <TableRow key={index}>
      <TableCell className="font-medium">{index+1}</TableCell>
      <TableCell>{teachers.name}</TableCell>
      <TableCell>{teachers.email}</TableCell>
      <TableCell className="text-right">
        <TeacherForm title="แก้ไข" des="แก้ไขอาจารย์" name={teachers.name} email={teachers.email} />
      </TableCell>
    </TableRow>
  )})}
    
  </TableBody>
</Table>
</>
    )
  }