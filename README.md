# 🏋️ FitLog

FitLog is a dark, no-nonsense gym companion. Browse a library of workouts, lock your lifts into today's plan, save others for later, and watch the day's work add up.

🔗 **Live Site:🔗 **Live Site:** https://fitlog-sigma-eight.vercel.app
## 🛠️ Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- lucide-react (icons)
- react-hot-toast (notifications)

## ✨ Features

1. **Workout Library:** 12 workouts fetched from an API, shown in a responsive grid.
2. **Sort Dropdown:** Sort workouts by duration, calories, or rating.
3. **Workout Details Page:** Specs table, instructions, and muscle group tags.
4. **Today's Plan and Saved:** Add workouts to a plan (max 5) or save them for later.
5. **Live Stats:** Exercises, minutes, and calories update instantly as the plan changes.
6. **Mark as Done and Remove:** Track progress with toast notifications.
7. **Persistent Data:** Plan and saved items stay after a page reload (localStorage).
8. **Fully Responsive:** Works on mobile, tablet, and desktop.
9. **Custom 404 Page and Loading States.**

## 🚀 Getting Started


```bash
git clone https://github.com/dinamonalam/fitlog.git
cd fitlog
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## 📡 API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`