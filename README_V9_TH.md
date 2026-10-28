# PROFACE Workflow V9 — Cloud Connected Pilot

## สรุปสถานะ ณ 28 ตุลาคม 2026

- ตรวจพบผู้ใช้ตั้งค่าและทดสอบ Cloudflare Worker `proface-workflow-v8-api` และ D1 `proface-workflow-db` แล้วจากภาพหน้าจอ; `/api/health` ตอบ `{ok:true, driveConnected:false}`.
- V9 นี้เป็น **เว็บชุดใหม่ที่ตั้งค่าให้เรียก Worker URL จริง**; ยังไม่ได้ Deploy ไฟล์ V9 ไป GitHub และยังไม่ผ่านการทดสอบสร้าง/แก้ไขโปรเจกต์แบบ live กับ D1.
- Backend ที่ Deploy อยู่ยังคงชื่อ V8 และใช้งาน API ชุดเดิมได้; **ไม่ต้องสร้าง Worker หรือ D1 ใหม่**.
- Google Drive/Sheets ยังไม่ถูกอนุญาต (`driveConnected:false`) ต้องให้ System Admin กดเชื่อม Gmail กลางหลัง V9 ขึ้นเว็บ และตรวจ Scope ก่อนอนุญาต.
- ราคาและสูตรเดิมใน V8 ยังเป็นการทดลอง ต้องให้ Admin ตรวจสอบกับไฟล์ Excel บริษัทก่อนออกใบเสนอราคาจริง.

## ไฟล์สำหรับ GitHub Pages
อัปโหลดไฟล์ที่อยู่ในโฟลเดอร์นี้ไปที่ ROOT ของ repository `112Me-p/demo-proface`:

- `index.html`, `styles.css`, `quote.css`, `app.js`, `config.js`
- `about.html`, `privacy.html` (หน้าอธิบายระบบและนโยบายสาธารณะ)

**แนะนำให้สำรอง V8 หรือสร้าง branch `v9-cloud-pilot` ก่อนเปลี่ยนสาขาที่เผยแพร่** และทดสอบบน URL ปัจจุบัน: https://112me-p.github.io/demo-proface/

## ค่าที่ตั้งไว้ใน config.js

- `mode: 'firebase'`
- `cloudRequired: true` (ไม่ออกเลขงานแบบสุ่มหรือใช้โหมด Local แทน)
- `apiBase: 'https://proface-workflow-v8-api.proface-corporation.workers.dev'` (ไม่ใส่ `/api` ท้าย URL)
- Firebase project: `proface-workflow-v8`

ห้ามใส่ `GOOGLE_OAUTH_CLIENT_SECRET`, `OAUTH_ENCRYPTION_KEY`, refresh token ลงใน GitHub.

## ทดสอบจริงตามลำดับ

1. หลังเผยแพร่ เปิดหน้าเว็บไซต์, Hard Refresh, Login ด้วย `phonphotnuramrum@gmail.com`.
2. เลือก System Admin. ด้านบนต้องขึ้น `PROFACE V9 Cloud` และไม่ขึ้นข้อความ “Cloudflare ยังไม่เชื่อม”. ถ้าเข้าไม่ได้ตรวจ Console Network `/api/me`.
3. สร้างงาน **ทดลองด้วยชื่อ TEST V9** ก่อน: เลือก S'Beam → ระบบต้องคืนเลข `PF-2026-NNNN` จาก D1 (หากมีงานก่อนหน้า เลขไม่จำเป็นต้องเริ่ม `0001`).
4. วัดจุดทดลองหนึ่งชุด → ตรวจสถานะ D1 และโหลดใหม่ → เลือกงานเดิม ตรวจว่าข้อมูลคงอยู่.
5. ทดสอบเปิดอีกบัญชี `natthinan.proface@gmail.com` บนอุปกรณ์อื่น เห็นเฉพาะงานของ S'Beam และไม่สามารถแก้ราคาที่จำกัด Admin.
6. ไปหน้า Dashboard ตรวจการค้นหารหัสงาน การตรวจงานแบบตาราง/การ์ด และภาพหน้างาน (ภาพจะขึ้น Google Drive ได้เมื่อ OAuth เชื่อมและซิงก์แล้ว).
7. เมื่ออนุญาต Drive สำเร็จ ให้กด `ลองซิงก์ Drive/Sheets` สำหรับโปรเจกต์ที่สร้างก่อนหน้า, แล้วตรวจใน `งานขายปี 2026 / 10 - ตุลาคม / S'Beam / PF-2026-NNNN`.
8. ตรวจ Google Sheet `PROJECT_INFO`, `MEASUREMENTS`, `PRICING`, `STATUS_LOG` และทดสอบแก้ไข 2 เครื่องพร้อมกัน ไม่ควรทับข้อมูลเงียบ ๆ.
9. เช็กหน้า `about.html` และ `privacy.html` จาก URL จริง ก่อนดำเนิน OAuth verification.

## หมายเหตุความปลอดภัยและการใช้งาน

- `/api/health` `ok:true` ยืนยันเพียง Worker ตอบสนอง และอ่านตารางสถานะ OAuth ได้ ไม่ใช่หลักฐานว่า CRUD ครบวงจรผ่านแล้ว.
- Frontend แคชงานในเบราว์เซอร์ชั่วคราว แต่ Backend D1 เป็นข้อมูลหลัก; หากการบันทึกติดขัดจะเตือนก่อนสลับงานหรือรีเฟรชในแอป. ไม่ควรล้าง Cache หากมีข้อมูลรอซิงก์.
- OAuth ของ Worker V8 ใช้ scope `https://www.googleapis.com/auth/drive` ที่เข้าถึงได้กว้างมาก; ก่อนอนุญาตบัญชี Gmail กลาง โปรดพิจารณาวิธีจำกัดขอบเขต (เช่น Drive Picker + `drive.file` พร้อมปรับ Backend ให้รองรับไฟล์หลักที่ผู้ใช้เลือก) และข้อกำหนดการตรวจสอบของ Google.
- **ไม่ควรใช้ข้อมูลลูกค้าจริง** จนทดสอบ end-to-end และทบทวน OAuth Scope/Privacy ผ่านแล้ว.
- Cloudflare Worker ที่ Deploy อยู่มี allowlist แค่ S'Beam กับ System Admin จึงยังไม่พร้อมเปิดให้เซลล์ทั้งห้าคนพร้อมกัน.

## เมื่อทดสอบแล้วและต้องการ Rollout ให้ทีมทั้งหมด

แก้ backend allowlist/roles, ทดสอบสิทธิ์ใน Worker, สร้างโฟลเดอร์และอนุญาตบัญชีบริษัท และตรวจโหลดซ้ำหลายเครื่อง; **อย่า** เพิ่มอีเมลใน frontend อย่างเดียวเพราะ Worker ยังคงปฏิเสธ.
