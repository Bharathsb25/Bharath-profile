# How to Update Your Website & CV

Everything on your site is designed to be edited easily — no deep coding needed.
Below is exactly what to change, and where.

---

## 1. Change any text (name, tagline, skills, experience, etc.)

**All of your content lives in ONE file:**

```
src/data/profile.ts
```

Open it in any text editor (Notepad, VS Code) and edit the text between the
quotation marks. For example, to change your tagline, find:

```
tagline: "I help SaaS and enterprise teams turn complex CRM rollouts ...",
```

…and just change the words inside the quotes. The same file holds your:

- Name, title, tagline, email, phone, LinkedIn
- Highlights strip (`4+ yrs`, `Multi-region`, etc.)
- Skills groups & tools
- Experience (roles, companies, dates, bullet points)
- Education, certifications, training
- Awards, languages, publications

> Tip: keep the quotes `"` and commas `,` exactly where they are — only change
> the words inside the quotes.

---

## 2. Replace your photo

Put your new photo in the `public` folder and name it exactly:

```
public/profile.jpg
```

(Replace the existing file with the same name.) Square photos (e.g. 1000×1000)
look best.

---

## 3. Replace your CV / resume (the "Download CV" button)

Put your new PDF in the `public` folder and name it exactly:

```
public/Bharath-Sathiskumar-CV.pdf
```

(Replace the existing file with the same name — the download button will then
serve the new version automatically.)

---

## 4. Change the browser tab logo ("B")

Edit this file:

```
src/app/icon.svg
```

You can change the letter, colors, or shape. To change the letter, find the
`B` near the end and replace it.

---

## 5. See your changes

**On your computer (preview before publishing):**

```
npm run dev
```

Then open http://localhost:3000 in your browser. Edits appear instantly when
you save a file. (Do a hard refresh with Ctrl+Shift+R if you don't see a change.)

**Once the site is deployed online (e.g. Vercel):**
Save your changes, then push them to GitHub — the live site rebuilds and
updates automatically within a minute or two. (Full deploy steps can be added
here once we deploy.)

---

Need a bigger change (new section, different colors, layout tweak)? That's a
code change — just ask and it can be added.
