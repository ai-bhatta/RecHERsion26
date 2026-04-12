# Hosting + Registration Storage (Vercel + Google Sheets)

This setup uses:

- Frontend on Vercel (free)
- A Vercel Serverless API (`/api/register`)
- Google Service Account + Google Sheets API

Visitors can submit registrations, but only people you share the Google Sheet with can view/edit data.

## 1) Create a Google Sheet

1. Create a new Google Sheet.
2. Name the first tab `Sheet1` (or use another tab name and set `GOOGLE_SHEET_NAME`).
3. Add header row in this order:

- `submitted_at`
- `name`
- `email`
- `institute`
- `degree`
- `year`
- `dob`
- `phone`
- `im_profile`
- `hacker_rank`

Copy the Sheet ID from URL:

`https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`

## 2) Create Service Account (Google Cloud)

1. Go to Google Cloud Console.
2. Create/select a project.
3. Enable **Google Sheets API**.
4. Create a **Service Account**.
5. Generate a JSON key for that service account.

From JSON key, note:

- `client_email`
- `private_key`

## 3) Share Sheet with Service Account

In your Google Sheet, click **Share** and add:

`<service-account-email>@<project>.iam.gserviceaccount.com`

Give it **Editor** access.

## 4) Configure Vercel Environment Variables

In Vercel Project Settings -> Environment Variables, add:

- `GOOGLE_CLIENT_EMAIL` = service account `client_email`
- `GOOGLE_PRIVATE_KEY` = service account `private_key`
- `GOOGLE_SHEET_ID` = your Sheet ID
- `GOOGLE_SHEET_NAME` = `Sheet1` (optional if using Sheet1)

Important:

- Paste `GOOGLE_PRIVATE_KEY` exactly as given (including `-----BEGIN PRIVATE KEY-----`).
- Newlines are handled in code.

## 5) Deploy

1. Push this repo to GitHub.
2. Import to Vercel.
3. Deploy.

Form submissions from `index.html` now call `/api/register`, and that API appends rows to your Google Sheet.

## 6) Who can see data?

- Public users: can submit form only.
- Only Google accounts you explicitly share the Sheet with: can view/edit responses.

## 7) Recommended hardening (optional)

- Add CAPTCHA (Cloudflare Turnstile/reCAPTCHA) to reduce spam.
- Add basic rate limiting in API route.
- Keep service account key only in Vercel env vars (never in frontend code).
