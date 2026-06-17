# Rural Routes Explorer PWA v35D Feature-Parity Build

This is a Vite/React PWA scaffold created from the Rural Routes iOS v35D handoff. It is designed to be close to the iOS app feature set while remaining web-deployable on Vercel.

## What is included

- Quest-first Explore screen
- Turtle Trail, Mural Quest, Historic Caldwell, and Local Rewards quests
- Per-quest maps with quest-specific targets
- User location blue-dot style layer using browser geolocation
- Heading cone fallback using DeviceOrientation where available
- Orange target-direction arrow after Direction Hint / Reveal Exact Location
- Heartbeat-style haptic pattern using `navigator.vibrate` where supported
- QR payload redemption demo
- My Cards binder
- Achievement showcase
- Business rewards and printable QR sign preview
- PWA manifest and service worker
- Local demo seed data plus optional Supabase connection
- Flattened assets from the iOS project under `/public/assets`

## Running locally

```bash
npm install
npm run dev
```

Open the local URL in Chrome/Safari. Geolocation works best on HTTPS or localhost.

## Deploying to Vercel

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables only when Supabase is ready:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Supabase integration points

The app currently reads local demo seed data first. If Supabase environment variables are present, it attempts to read:

- `towns`
- `cards`
- `locations`
- `achievements`

Next production step: replace local `src/data/seed.js` quest targets with Supabase-backed queries for `routes`, `route_stops`, `locations`, `cards`, `businesses`, `promotions`, and user progress tables.

## Important web limitations

- iOS Safari/PWA generally does **not** support vibration haptics. The app includes visual signal strength fallback. Android Chrome supports `navigator.vibrate`.
- Device heading varies by browser and permissions. The map uses a best-effort DeviceOrientation fallback.
- QR camera scanning requires adding a scanner package such as `@zxing/browser`, `html5-qrcode`, or `jsQR`. This build includes text payload redemption for testing.

## Recommended next steps

1. Connect PWA to Supabase Shared Data v1.
2. Move user progress from localStorage to Supabase Auth + `user_cards`, `discoveries`, and `user_achievements`.
3. Add a production QR scanner.
4. Add admin screens for businesses, promotions, and event quests.
5. Replace demo mural/historic coordinates with verified locations.
