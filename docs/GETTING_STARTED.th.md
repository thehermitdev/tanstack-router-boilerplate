# แนวทางนำ Template ไปใช้กับโปรเจ็กต์จริง

เอกสารนี้อธิบายขั้นตอนตั้งแต่สร้าง Repository ใหม่จาก Template ไปจนถึงเริ่มพัฒนา Feature แรก โดยสมมติว่าแอปเป็น React SPA ที่เชื่อมต่อ HTTP API

## 1. สร้าง Repository จาก Template

กด **Use this template** บน GitHub แล้วเลือก **Create a new repository** การสร้างจาก Template จะได้ประวัติ Git ใหม่ ไม่ผูกกับ commit history ของ Boilerplate

จากนั้น Clone และสร้าง Branch เริ่มต้น:

```bash
git clone https://github.com/<account>/<application>.git
cd <application>
git switch -c chore/initialize-project
```

## 2. เปลี่ยนข้อมูลเฉพาะโปรเจ็กต์

แก้ `package.json` อย่างน้อยสามค่า:

- `name` ให้เป็นชื่อ package แบบ lowercase และคั่นด้วย `-`
- `version` เริ่มที่ `0.1.0` หรือมาตรฐานขององค์กร
- `description` เพิ่มได้ตามบริบทของระบบ

แก้ชื่อแอปและ API endpoint:

```bash
cp .env.example .env
```

```dotenv
VITE_APP_NAME=My Application
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT_MS=15000
```

ตัวแปร `VITE_*` ถูกฝังใน JavaScript ฝั่ง Browser จึงห้ามใส่ secret, private key หรือ privileged token

## 3. ติดตั้ง Dependency และสร้าง Lockfile

```bash
bun install
```

Template ไม่เก็บ `bun.lock` ไว้โดยตั้งใจ เพื่อให้ Repository ที่สร้างใหม่เป็นเจ้าของ dependency graph ของตัวเอง หลังติดตั้งครั้งแรกให้ตรวจสอบและ commit `bun.lock`:

```bash
git add bun.lock package.json
git commit -m "chore: initialize project dependencies"
```

จากนั้น CI ของโปรเจ็กต์จริงควรเปลี่ยนคำสั่งติดตั้งเป็น:

```bash
bun install --frozen-lockfile
```

## 4. ตรวจสอบระบบก่อนเริ่มพัฒนา

```bash
bun run routes:generate
bun run check
bun run test:e2e
bun run dev
```

เปิด `http://localhost:3000` และตรวจหน้า Overview กับ Users example

## 5. ทำความเข้าใจขอบเขต Directory

```text
src/app      ประกอบ Application และ Infrastructure ระดับแอป
src/routes   เป็นเจ้าของ URL และ orchestration
src/features เป็นเจ้าของ Business Capability
src/shared   Infrastructure และ UI ที่ใช้ซ้ำ โดยไม่รู้จัก Feature
```

ทิศทาง Dependency คือ `app → routes → features → shared` ห้าม `shared` import กลับไปหา Feature

## 6. เปลี่ยน API ตัวอย่างเป็น API จริง

แก้ `VITE_API_BASE_URL` ก่อน จากนั้นสร้าง Feature ใหม่โดยใช้โครงสร้างนี้:

```text
src/features/orders/
├── api/
│   ├── contracts.ts
│   ├── client.ts
│   ├── queries.ts
│   └── mutations.ts
├── components/
├── pages/
├── model/
└── index.ts
```

ลำดับการทำงานที่แนะนำ:

1. เขียน Zod schema ใน `api/contracts.ts` ให้ตรงกับ response จริง
2. เขียน transport function ใน `api/client.ts` โดยใช้ `httpClient`
3. สร้าง query key และ `queryOptions` ใน `api/queries.ts`
4. สร้าง Page และ Components ภายใน Feature
5. Export เฉพาะ Public API ผ่าน `index.ts`
6. เพิ่มไฟล์ Route ที่ `src/routes`
7. ให้ Route loader เรียก `queryClient.ensureQueryData`
8. เพิ่ม MSW handler, integration test และ E2E เฉพาะ workflow สำคัญ

## 7. ตัวอย่าง Route มาตรฐาน

```tsx
export const Route = createFileRoute('/orders')({
  validateSearch: (search) => ordersSearchSchema.parse(search),
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) =>
    context.queryClient.ensureQueryData(ordersListQueryOptions(deps)),
  component: OrdersRoute,
})
```

Route ไม่ควร import Axios, parse response หรือมี business calculation

## 8. Authentication

Boilerplate ไม่ล็อกผู้ให้บริการ Authentication เพื่อป้องกัน Vendor Coupling แนวทางที่ควรใช้คือ:

1. สร้าง `AuthSession` interface ใน `src/shared/auth`
2. สร้าง Adapter ของ Clerk, Auth0 หรือระบบองค์กรใน `src/app/providers`
3. ใส่ session capability ลง Router Context
4. ตรวจ authentication หรือ permission ใน `beforeLoad`
5. Feature เรียก interface กลาง แทนการ import SDK โดยตรง

Token แบบ user session อาจเพิ่มผ่าน Axios request interceptor แต่ต้องมี lifecycle สำหรับ refresh, logout และ request cancellation ที่ชัดเจน

## 9. การใช้ shadcn/ui

`components.json` ตั้ง alias ไปที่ `src/shared/ui` เมื่อเพิ่ม Component ให้ตรวจ source code ที่ CLI สร้างทุกครั้ง เพราะ Component จะกลายเป็น source code ของ Repository

Primitive เช่น Button, Dialog และ Input ห้ามมี business logic ส่วน Component เช่น `OrderStatusBadge` หรือ `PatientSearchCombobox` ให้อยู่ภายใน Feature

## 10. Environment แยกตามระบบ

แนะนำให้มีค่าจาก Deployment Platform แทนการ commit `.env.production`:

- Local: `.env` ซึ่งถูก ignore
- CI: Repository/Environment variables
- Staging: Platform environment variables
- Production: Platform environment variables

เมื่อเพิ่มตัวแปรใหม่ ต้องเพิ่มทั้ง `.env.example` และ Zod schema ที่ `src/shared/config/env.ts`

## 11. Deploy SPA

หลังรัน `bun run build` จะได้ไฟล์ใน `dist/` ต้องตั้ง Hosting ให้ rewrite URL ที่หาไฟล์ไม่พบกลับไป `/index.html` เพื่อรองรับ direct navigation เช่น `/users?page=2`

ตั้งค่า API CORS, CSP, cache headers และ source-map policy ตาม environment ขององค์กร อย่าเก็บ secret ใน Frontend build

## 12. ปรับ CI หลังสร้าง Lockfile

แก้ `.github/workflows/ci.yml` จาก:

```yaml
- run: bun install
```

เป็น:

```yaml
- run: bun install --frozen-lockfile
```

เพิ่มขั้นตอน deployment เฉพาะเมื่อ quality และ E2E jobs ผ่านแล้ว และใช้ GitHub Environment สำหรับ staging/production approvals

## 13. ลบหรือคง Users Reference Feature

แนะนำให้คง Feature นี้ไว้จน Feature จริงตัวแรกทำงานครบ เพื่อใช้เป็นมาตรฐานอ้างอิง เมื่อไม่ต้องการแล้วให้ลบ:

```text
src/features/users/
src/routes/users.tsx
src/features/users/api/client.test.ts
src/features/users/components/users-table.test.tsx
```

จากนั้นลบ MSW handler และแก้ navigation ใน `AppShell`

## 14. TanStack DB

อย่าเพิ่ม TanStack DB เพียงเพราะเป็นส่วนหนึ่งของ TanStack ใช้เมื่อระบบต้องการ normalized collection, live query, optimistic local writes, offline-first หรือ synchronization engine จริง สำหรับ CRUD REST ทั่วไป TanStack Query มีขอบเขตที่ง่ายและดูแลได้ดีกว่า

## 15. Definition of Done สำหรับ Feature

Feature พร้อม merge เมื่อ:

- URL/search parameters ถูก validate
- API response ถูก validate
- Query key มี factory กลาง
- Loading, error, empty และ success states ครบ
- Request รองรับ AbortSignal
- ไม่มี Axios import ใน Component หรือ Route
- มี test ในระดับที่เหมาะสม
- `bun run check` และ `bun run test:e2e` ผ่าน
- เอกสารได้รับการอัปเดตเมื่อเพิ่ม convention ใหม่
