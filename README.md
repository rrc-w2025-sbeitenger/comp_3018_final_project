# Marathon API

## Project Overview

The Marathon API is a REST API for storing and retrieving game reference data for shells, weapons, factions, and map images. It provides public read endpoints for browsing game data, plus protected admin endpoints for creating, updating, deleting, uploading maps, and assigning Firebase custom claims.

## Installation Instructions

### Prerequisites

- Node.js 20 or newer
- npm
- A Firebase project with Firestore enabled
- A Firebase Admin SDK service account JSON file
- A Firebase ID token for protected routes

### Setup

1. Clone the repository:

```bash
git clone https://github.com/rrc-w2025-sbeitenger/comp_3018_final_project.git
cd comp_3018_final_project
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` as needed:

```bash
NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID=Your_Project_Id
SWAGGER_SERVER_URL=http://localhost:3000/api/v1
ALLOWED_ORIGINS=http://localhost:3000
```

4. Add your Firebase Admin SDK service account file:

Place your Firebase service account JSON file at:

```text
src/config/marathonApiServiceKey.json
```

The API imports this file in `src/config/firebaseConfig.ts` to connect to Firebase Admin, Firestore, and Firebase Auth.

5. Start the server:

```bash
npm start
```

The API should now be running at:

```text
http://localhost:3000/api/v1
```

Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```

## API Request Examples

### Health Check

**Request:**

```bash
curl -X GET http://localhost:3000/api/v1/health
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "status": 200,
    "uptime": 1234.56,
    "timestamp": "2026-04-11T17:30:00.000Z",
    "version": "1.0.0"
  }
}
```

### Get All Weapons

**Request:**

```bash
curl -X GET http://localhost:3000/api/v1/weapons
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": [
    {
      "weapon_name": "bully_smg",
      "damage": 15,
      "precision_multiplier": 1.5,
      "rate_of_fire": "540 RPM",
      "ads_speed": "0.35s",
      "equip_speed": "0.9s",
      "reload_speed": "2.76s",
      "recoil": "82%",
      "aim_assist": 2.59
    }
  ]
}
```

### Create a Shell

This endpoint requires a Firebase bearer token for a user with the `admin` role.

**Request:**

```bash
curl -X POST http://localhost:3000/api/v1/shells \
  -H "Authorization: Bearer your-firebase-id-token" \
  -H "Content-Type: application/json" \
  -d '{
    "shell_name": "assassin",
    "prime": "Smoke Screen: Throw a smoke disc that emits a line of smoke fields in front of you, disrupting the optics of those who step inside.",
    "tactical": "Active Camo: Activate your shell's camouflage systems, pulling a shroud of invisibility over yourself. Performing offensive actions, taking damage, and using abilities or consumables briefly disrupts your invisibility.",
    "trait_1": "Shadow Dive: Activate while airborne to slam a smoke disc into the ground, deploying a smoke field.",
    "trait_2": "Shroud: Your shell automatically activates camouflage systems when entering any smoke field, making you invisible. Invisibility persists for a short time after leaving the smoke field.",
    "heat_capacity": 10,
    "agility": 20,
    "loot_speed": 15,
    "melee_damage": 10,
    "prime_recovery": 10,
    "tactical_recovery": 5,
    "self_repair_speed": 10,
    "finisher_siphon": 10,
    "revive_speed": 15,
    "hardware": 10,
    "firewall": 20,
    "fall_resistance": 10,
    "ping_duration": 10
  }'
```

**Response (201 Created):**

```json
{
  "status": "success",
  "data": {
    "prime": "Smoke Screen: Throw a smoke disc that emits a line of smoke fields in front of you, disrupting the optics of those who step inside.",
    "tactical": "Active Camo: Activate your shell's camouflage systems, pulling a shroud of invisibility over yourself. Performing offensive actions, taking damage, and using abilities or consumables briefly disrupts your invisibility.",
    "trait_1": "Shadow Dive: Activate while airborne to slam a smoke disc into the ground, deploying a smoke field.",
    "trait_2": "Shroud: Your shell automatically activates camouflage systems when entering any smoke field, making you invisible. Invisibility persists for a short time after leaving the smoke field.",
    "heat_capacity": 10,
    "agility": 20,
    "loot_speed": 15,
    "melee_damage": 10,
    "prime_recovery": 10,
    "tactical_recovery": 5,
    "self_repair_speed": 10,
    "finisher_siphon": 10,
    "revive_speed": 15,
    "hardware": 10,
    "firewall": 20,
    "fall_resistance": 10,
    "ping_duration": 10
  }
}
```

### Set Custom Claims

This endpoint requires a Firebase bearer token for a user with the `admin` role. After claims are updated, the target user must refresh their Firebase ID token before the new role is available.

**Request:**

```bash
curl -X POST http://localhost:3000/api/v1/admin/setClaims \
  -H "Authorization: Bearer your-firebase-id-token" \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "FirebaseUid",
    "claims": {
      "role": "admin"
    }
  }'
```

**Response (200 OK):**

```json
"Custom claims set for user: FirebaseUid. User must obtain a new token for changes to take effect."
```

