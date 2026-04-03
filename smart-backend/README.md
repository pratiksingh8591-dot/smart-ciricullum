# Smart Curriculum Backend

Express backend with in-memory data for the Smart Curriculum frontend.

## Run

1. Open terminal in this folder.
2. Install dependencies:

```bash
npm install
```

3. Start server:

```bash
npm run dev
```

Server starts at `http://localhost:5173/`.

## Main APIs

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/subjects`
- `POST /api/subjects`
- `DELETE /api/subjects/:id`
- `GET /api/students`
- `GET /api/attendance`
- `POST /api/attendance/mark`
- `GET /api/assignments`
- `POST /api/assignments`
- `POST /api/assignments/:id/submit`
- `GET /api/assignments/:id/submissions`
- `POST /api/assignments/:id/grade`
- `GET /api/materials`
- `POST /api/materials`
- `DELETE /api/materials/:id`
- `GET /api/marks`
- `POST /api/marks`
- `DELETE /api/marks/:id`

## Notes

- Data is in memory and resets when server restarts.
- Set `FRONTEND_ORIGIN` in env if frontend runs on a different origin.
