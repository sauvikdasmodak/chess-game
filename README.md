# chess-game

A simple two-player chess game for Android, built with Expo (React Native + TypeScript).
Move legality (including check/checkmate/stalemate detection) is handled by
[chess.js](https://github.com/jhlywa/chess.js); the UI is a tap-to-select, tap-to-move
8x8 board.

## Download

Grab the latest APK from the [Releases page](https://github.com/sauvikdasmodak/chess-game/releases/latest)
and sideload it onto an Android device (enable "install from unknown sources" if prompted).
It's a release build (JS bundle embedded, no Metro needed) signed with the debug key, intended for testing/personal use, not a Play Store release.

## Features

- Full legal move generation (castling, en passant, promotion — auto-promotes to queen)
- Turn indicator and check/checkmate/stalemate/draw status
- Tap a piece to see its legal destination squares highlighted
- "New Game" button to reset the board

## Development

```bash
npm install
npm run android   # or: npm start, then press 'a'
```

### Building an APK locally

```bash
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
```

The APK is produced at `android/app/build/outputs/apk/release/app-release.apk`.

Use a **release** build for APKs you install on a device. A debug build (`assembleDebug`) does not
contain the JS bundle and fails with "Unable to load script ... index.android.bundle" unless Metro
is running and reachable (`npm start`, plus `adb reverse tcp:8081 tcp:8081` over USB).

## Tech stack

- Expo SDK 57 / React Native 0.86 / TypeScript
- [chess.js](https://github.com/jhlywa/chess.js) for game rules and move validation
