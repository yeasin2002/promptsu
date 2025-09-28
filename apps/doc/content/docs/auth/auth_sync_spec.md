---
title: Authentication Synchronization Project Specification
description: This project aims to design and implement a robust authentication synchronization mechanism between a Next.js web application and a  browser extension built with wxt.dev, both powered by a backend using Hono and tRPC within a TurboRepo monorepo.   The system currently relies on session-based authentication (similar to Auth.js). The goal is to ensure seamless synchronization of authentication state and user-specific attributes (e.g., `isProSubscriber`) across both platforms.
---



## Requirements

1. **Cross-platform synchronization**

   - User login/logout status must be reflected in both the web app and extension instantly.
   - User attributes (e.g., subscription tier) should be updated in real-time across both environments.

2. **Security**

   - Prevent leakage of tokens/sessions across contexts.
   - Ensure communication between extension and backend is secure and follows best practices.

3. **Maintainability & Scalability**
   - Spec-driven development with clear architectural guidelines.
   - Easy to extend as features evolve.

---

## 1. Authentication Strategy

### Options

#### A. Session-Based Authentication

- **Pros**
  - Simpler integration with Next.js and Hono.
  - Works well with server-side rendering.
  - Familiar ecosystem support (Auth.js).
- **Cons**
  - Browser extensions cannot directly access `HttpOnly` cookies.
  - Harder to synchronize across multiple environments.

#### B. Token-Based Authentication (JWT / PASETO)

- **Pros**
  - Easier for browser extension to manage (`localStorage`, `chrome.storage`).
  - Can be passed explicitly via API requests.
  - Better for cross-platform scenarios (mobile, extension, web).
- **Cons**
  - More complex rotation/refresh logic.
  - Token leakage risk if stored insecurely.

### Recommendation

- **Hybrid approach**:
  - Keep **sessions with cookies** for the web app (SSR-friendly).
  - Use **short-lived JWTs** for the browser extension.
  - Add a **refresh token endpoint** accessible by both web and extension.

---

## 2. Synchronization Mechanism

### Core Flow

1. **Login (Web)**

   - User logs in → Session cookie created.
   - Server generates a **short-lived JWT** (containing `isProSubscriber`) and stores in backend DB/cache.
   - Browser extension fetches the JWT via secure API call.

2. **Login (Extension)**

   - User logs in from extension UI.
   - Extension gets JWT + refresh token.
   - Web app can detect login via backend state.

3. **State Updates (Pro Subscription, Logout, etc.)**
   - Backend emits **user state events** (via WebSocket/SSE or polling).
   - Extension subscribes to updates (e.g., `isProSubscriber` change).
   - Web app revalidates session on navigation/API calls.

### Secure Sharing

- Use **extension messaging APIs**:
  - `chrome.runtime.sendMessage` for communication between background and content scripts.
  - `chrome.storage.local` for persisting JWT securely (not `localStorage`).
- All requests from extension → backend must attach JWT in headers.

---

## 3. Implementation Details

### Integration Points

- **Next.js**
  - Use Auth.js (or better-auth) for sessions.
  - Add API route `/api/token` for JWT retrieval/refresh.
- **wxt.dev Extension**
  - Store JWT in `chrome.storage.local`.
  - Background script manages authentication lifecycle.
  - Use `fetch` with Authorization headers for API calls.
- **Hono + tRPC**
  - Implement endpoints for:
    - `/auth/token` (get short-lived JWT).
    - `/auth/refresh` (refresh JWT).
    - `/auth/logout` (invalidate tokens).
- **TurboRepo**
  - Share types (e.g., `User`, `AuthPayload`) across apps and extension.
  - Centralize auth utilities in a shared package.

### Browser Extension APIs to Use

- **`chrome.storage.local`**: Store JWT and metadata.
- **`chrome.runtime.sendMessage`**: Sync auth state across extension scripts.
- **`chrome.identity` (optional)**: For OAuth flows, if expanded later.

---

## 4. Task Breakdown

### Phase 1: Design

- [ ] Define types (`User`, `AuthPayload`, `ProStatus`) in shared package.
- [ ] Write OpenAPI/trpc spec for `/auth/token`, `/auth/refresh`, `/auth/logout`.
- [ ] Document JWT claims structure (`sub`, `exp`, `isProSubscriber`).

### Phase 2: Web (Next.js)

- [ ] Integrate Auth.js for session-based login.
- [ ] Add `/api/token` endpoint to exchange session → JWT.
- [ ] Add `/api/refresh` endpoint for token renewal.

### Phase 3: Extension (wxt.dev)

- [ ] Build background script for auth lifecycle.
- [ ] Store/retrieve JWT from `chrome.storage.local`.
- [ ] Implement login/logout UI.
- [ ] Sync state with backend via WebSocket or polling.

### Phase 4: Backend (Hono + tRPC)

- [ ] Implement `getToken`, `refreshToken`, and `logout` handlers.
- [ ] Add middleware to validate JWT on API requests.
- [ ] Push `isProSubscriber` updates via WebSocket/SSE.

### Phase 5: Synchronization

- [ ] Ensure extension listens to backend events.
- [ ] Ensure web app revalidates session on changes.
- [ ] Add unit/integration tests for state consistency.

---

## 5. Security Considerations

- Use `HttpOnly` cookies for web sessions (cannot be accessed by JS).
- Store JWT in `chrome.storage.local`, not `localStorage` or `sessionStorage`.
- Set short expiry (e.g., 15 min) for JWT, with refresh logic.
- Implement token revocation on logout.

---

## 6. Future Extensions

- Add support for mobile app clients using the same JWT mechanism.
- Extend synchronization to support multi-device presence.
- Move towards a unified event bus (e.g., Redis pub/sub or WebSocket gateway).

---
