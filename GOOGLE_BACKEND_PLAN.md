> NOTE: This is an architectural proposal only, not a deployed/connected system.

# PROFACE V7 — แผน Backend และ Google Integration (ยังไม่ติดตั้ง)

## ตัวตนและสิทธิ์
- หน้าเลือก Staff Profile ใช้แสดงตัวตนที่ลงทะเบียนไว้ แต่ต้องมี Google Sign-In / Email verification ในขั้นตอนผูกบัญชีครั้งแรก และ Session ฝั่ง Backend ที่ตรวจสอบได้
- การกดเลือกโปรไฟล์อย่างเดียวไม่ใช่ Authentication; การเชื่อมบัญชีควรตรวจอีเมลกับ Allowlist แล้วจดจำผู้ใช้ในอุปกรณ์ส่วนตัวผ่าน Session ที่ปลอดภัย
- บทบาท: Sales เห็นเฉพาะโปรเจกต์ของตน; S'Gun, Showroom, System Admin เข้าได้ทุกโปรเจกต์; ทุก API ต้องตรวจสิทธิ์จริง
- `actor_email` (ผู้แก้ไข) ต้องบันทึกแยกจาก `owner_email` (ฝ่ายขายเจ้าของงาน)

## Server
- Frontend Static (GitHub Pages ได้เพราะเก็บเพียง UI ไม่ใส่ Secrets)
- Secure API Backend (เช่น Cloud Run หรือ Cloud Functions)
- Database เชิงธุรกรรมสำหรับเลขโปรเจกต์ที่ไม่ซ้ำ / เวอร์ชันแถวข้อมูล / Session / Job Queue (เช่น Firestore)
- Google Drive + Sheets เป็นแหล่งจัดเก็บและการอ่านกลับตามความต้องการของบริษัท แต่ไม่ควรใช้ Sheets อย่างเดียวรับภาระ Concurrency ทุกเรื่อง
- ควรใช้ Workspace Registry กลางและ Project ID ที่ไม่ซ้ำทั่วระบบ (Backend ออก ID)

## การใช้ Gmail กลาง
- เจ้าของบัญชี `proface.corporation@gmail.com` ยืนยัน OAuth ผ่านหน้า Google แบบ server-side เพื่อให้ backend ได้สิทธิ์จัดการไฟล์ที่อนุญาต
- OAuth tokens เก็บใน Secret Manager หรือที่เก็บ Secrets ฝั่ง Backend; ห้ามฝัง token ใน GitHub Pages / JavaScript
- บัญชีบริษัทเป็นเจ้าของโฟลเดอร์และ Google Sheets ของทุกงานที่สร้างด้วยสิทธิ์บัญชีนี้
- ระบบต้องตรวจสถานะการอนุญาต/การเพิกถอนสิทธิ์ และแจ้งเตือน Admin เมื่อต้อง reauthorize

## โครงสร้างที่เสนอ
```
Google Drive ของบริษัท
  PROFACE WORKFLOW DATA/
    MASTER_PROJECT_REGISTRY (Google Sheet)
    S'Beam/
      PF-...-ID/
        Project_Data (Google Sheet)
        Site_Photos/
        Documents/
    S'Tong/
      PF-...-ID/
        Project_Data (Google Sheet)
        Site_Photos/
        Documents/
    ...
```

Project_Data tabs: `PROJECT_INFO`, `MEASUREMENTS`, `PRICING`, `PHOTOS`, `STATUS_LOG`, `AUDIT_LOG`

Registry columns: `project_id,customer_name,contact,location,sales_owner,sales_owner_email,created_by,created_at,status,drive_folder_id,sheet_id,updated_at,revision`

Measurement columns: `project_id,item_id,floor,room,spot,curtain_type,width_m,height_m,open,track,fabric_code,notes,photos,revision`

Pricing columns: `project_id,item_id,formula_mode,fabric_width_m,track_rate,fabric_rate,area_unit,join_wide,amount_before_round,amount_rounded,calculated_by,calculated_at,revision`

Audit columns: `timestamp,project_id,item_id,actor_email,action,before,after,revision`

## ทำให้หลายเซลล์ใช้งานพร้อมกันอย่างปลอดภัย
- ทุกคำขอบันทึกระบุ Project ID + item ID + authenticated user ID
- ตรวจสิทธิ์ทุก endpoint (ไม่เชื่อ owner email ที่ส่งจาก browser)
- optimistic locking ด้วย revision หรือ transactional database ก่อนบันทึกลง Sheets เพื่อลดข้อมูลทับกัน
- งานสร้างโปรเจกต์ใช้ idempotency key และ provision-job state, retry ได้โดยไม่สร้าง Folder/Sheets ซ้ำ
- บันทึกก่อนลง DB จากนั้นทำ Background Sync ไป Google Sheets/Drive แบบมีสถานะและ retry เพื่อรับมือ API ล้มเหลว
- รูปใหญ่เก็บใน Drive แล้วใส่ photo file ID / metadata ใน Sheets ไม่เก็บ base64 ในเซลล์
- ใช้ Account-specific Dashboard query จาก registry และสิทธิ์ฝั่ง Server

## ขั้นตอน Deploy
1. กำหนด Google Cloud project + เปิด Drive API/Sheets API + ตั้ง OAuth consent และ scopes ที่จำเป็น
2. ตั้ง Authentication/Session และ allowlist อีเมลพนักงานทั้งหมด
3. สร้าง Secure API Backend และบัญชีเก็บข้อมูลบริษัท (OAuth grant)
4. สร้าง Central registry + provisioning Drive/Sheets per project
5. เชื่อม UI จาก V7 ให้สั่งงานผ่าน Backend แล้วอ่านข้อมูลจริงกลับมา
6. QA บนอุปกรณ์มือถือของเซลล์ 2–3 คนพร้อมกัน ทดสอบสลับโปรไฟล์, สร้าง Project ID, รูปภาพ, สูตร, เอกสาร และสิทธิ์
7. จึงเปิดใช้งานจริงและจัดการ Backup/Retention/Logging
