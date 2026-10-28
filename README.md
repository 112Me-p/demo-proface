# PROFACE Workflow Studio V8 — Google Authentication Pilot

เว็บไซต์เมื่ออัปโหลด GitHub Pages: https://112me-p.github.io/demo-proface/

## ทำงานจริงในรุ่นนี้
- Firebase Google Sign-In / Sign-Out และจำ Session บนอุปกรณ์
- อนุญาตเฉพาะ S'Beam (natthinan.proface@gmail.com) และ System Admin (phonphotnuramrum@gmail.com)
- เมื่อเข้าสู่ระบบ เลือกได้เฉพาะโปรไฟล์ที่ตรงอีเมลตัวเอง
- คงระบบวัดหน้างาน ทำราคา ตรวจสอบ ใบสั่งงาน และใบเสนอราคาจาก V7 Revision 02

## ยังไม่ใช้งานจริง
- ข้อมูลลูกค้า โครงการ และรูปภาพยังอยู่ใน localStorage ของเบราว์เซอร์ **ไม่ซิงก์ข้ามเครื่อง**
- Google Drive/Sheets ยังไม่ได้เชื่อม ไม่สร้างโฟลเดอร์จริง
- เลขรหัสโปรเจกต์แบบ PF-2026-0001 ต้องรอ backend transaction
- การจำกัดบัญชีใน JavaScript เป็น UI gate สำหรับ Pilot **ไม่ใช่การบังคับสิทธิ์ปลอดภัยบนเซิร์ฟเวอร์**
- อย่าใส่ข้อมูลลูกค้าลับจริงจนเชื่อม backend และตรวจ token/สิทธิ์ทุกคำขอ

## ติดตั้ง
1. ดาวน์โหลด ZIP และแตกไฟล์
2. อัปโหลดไฟล์ทั้งหมดใน ZIP ไปยัง root ของ repository `112Me-p/demo-proface` แทนไฟล์เดิม
3. ตรวจ Settings > Pages ว่าเผยแพร่ `main` / root แล้ว
4. เปิด https://112me-p.github.io/demo-proface/ แล้ว Refresh (หากใช้แคชเดิมให้ Hard refresh)
5. กด Google Sign-In ด้วย S'Beam หรือ System Admin; ทดสอบ Logout และการปฏิเสธอีเมลอื่น
6. หากเบราว์เซอร์มือถือบล็อก Pop-up ให้เปิดผ่าน Safari/Chrome โดยตรง

ดู `AUTH_ACTIVATION.md` และ `GOOGLE_BACKEND_PLAN.md` สำหรับขั้นต่อไป
