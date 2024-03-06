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
import QRCode from "react-qr-code";
import { hostname } from "../../../config";

export function ShowQR({...props}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>แสดง QR</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>QRCode และรหัสห้องสำหรับเช็คชื่อ</DialogTitle>
                </DialogHeader>
                <DialogDescription asChild>
                    <>
                        โปรดเข้าแอปกล้องหรือแอปสแกน QR Code และสแกน QR Code ด้านล่างเพื่อเช็คชื่อ
                        <p className="text-4xl text-black text-center">รหัสห้อง: <span className="font-bold">{props.code}</span></p>
                        <QRCode className="w-full" value={hostname + "/?checkin=" + props.code} />
                    </>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}