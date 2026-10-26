# Friends Connect — Multi-Platform Ecosystem

A full-stack social discovery, celebrity interaction, and location-based event ticketing platform built across **4 native codebases**:
1. **Backend (`backend/`)**: NestJS + TypeScript + PostgreSQL/PostGIS + Redis + Socket.io + LiveKit WebRTC
2. **Web Application (`web/`)**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
3. **Android Native (`android/`)**: Kotlin + Jetpack Compose + Android Telecom `ConnectionService`
4. **iOS Native (`ios/`)**: Swift + SwiftUI + Apple `CallKit`

---

## Call & Communication Matrix

| Caller $\rightarrow$ Receiver | Audio Call | Video Call | Live Chat | Billing / Access |
| :--- | :---: | :---: | :---: | :--- |
| **Normal User $\leftrightarrow$ Normal User (Random Match)** | ✅ Yes | ✅ Yes | ❌ No | Free 1-Tap Matchmaking |
| **Normal User $\rightarrow$ Celebrity User** | ✅ Yes | ✅ Yes | ❌ No | **Premium / Wallet Coins** (Per-minute rate) |
| **Normal User $\leftrightarrow$ Customer Care Support** | ✅ Yes | ❌ **No** | ✅ Yes | Free Support (Strict Audio-Only + Chat) |
| **Celebrity User $\leftrightarrow$ Customer Care Support** | ✅ Yes | ❌ **No** | ✅ Yes | Free VIP Support (Strict Audio-Only + Chat) |

---

## Quick Start Guide

### 1. Start Infrastructure (PostgreSQL/PostGIS, Redis, LiveKit)
```bash
docker compose up -d
```

### 2. Run Backend API & Real-Time Signaling Server (`http://localhost:4000`)
```bash
cd backend
npm install
npm run start:dev
```

### 3. Run Unified Multi-Role Web Application (`http://localhost:3000`)
```bash
cd web
npm install
npm run dev
```

### 4. Native Mobile Apps
- **Android Native (`android/`)**: Open `android/` in Android Studio Ladybug+ and run the `app` configuration on an emulator or physical device.
- **iOS Native (`ios/`)**: Open `ios/Package.swift` in Xcode 16+ and run on an iOS 17+ Simulator or device.
