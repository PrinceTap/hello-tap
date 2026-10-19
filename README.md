# NFC Digital Business Card — Starter Project

A beginner-friendly, responsive digital business card using plain HTML, CSS, and JavaScript. No build step is required.

## Files

- `index.html` — page structure
- `styles.css` — colors, layout, responsive styling
- `app.js` — customer details, buttons, social links, product cards, and vCard download

## Preview locally

Open `index.html` in a web browser. Some browser security settings can affect local preview; deploying to Vercel is the best full test.

## Publish with GitHub and Vercel

1. Sign in to GitHub and create a repository named `nfc-landing-pages`.
2. For a public demo repository, do not include private customer details. The customer data in `app.js` is visible to anyone who can access the deployed site and repository.
3. Upload `index.html`, `styles.css`, `app.js`, and `README.md` to the repository root (not inside an extra nested folder).
4. Sign in to Vercel and choose **Add New → Project**.
5. Import the GitHub repository.
6. Because this is a static HTML site, no framework is required. Leave the build command empty if Vercel allows it; otherwise use the default static deployment settings. Deploy.
7. Open the Vercel URL and test the buttons and vCard download on a phone.

## Add a customer manually

In `app.js`, find `const customers = { ... }`.

1. Copy the entire `demo` customer object.
2. Paste the copy after the demo object, separated by a comma.
3. Change the key from `"demo"` to a unique lowercase slug, such as `"maria-cafe"`.
4. Change all profile details, links, colors, photos, and products.
5. Commit the change to GitHub. Vercel will automatically redeploy if GitHub integration is connected.
6. Share a link like `https://YOUR-VERCEL-URL.vercel.app/?u=maria-cafe`.
7. Program that exact URL onto the customer's NFC card.

The demo URL is `https://YOUR-VERCEL-URL.vercel.app/` or `...?u=demo`.

## Customer fields you can edit

- `name`, `title`, `company`, `bio`
- `phone`, `email`, `whatsapp` (WhatsApp number must include country code, digits only)
- `photo` — direct public image URL
- `brandColor`, `accentColor`, `backgroundColor`, `fontFamily`
- `socials` — label and full URL
- `products` — name, description, price, image URL, and inquiry link

## Important limitations and safety

- This starter is static. It does not have a login, admin dashboard, database, analytics, or payment system.
- Customer profile data in `app.js` is public. Do not store confidential or sensitive information there.
- Use customer-approved photos and links, and verify every phone number and social URL before programming the NFC card.
- If you later have many customers, use a database and authenticated admin system instead of a large public JavaScript file.
- Check the current Vercel plan terms for commercial use before selling access to hosted pages.
