# Personalizing the portfolio

The portfolio uses a placeholder portrait saved at `public/images/profile.jpg`. To use your own photo:

1. Rename your photo file to `profile.jpg` (or `profile.png`).
2. Drop it into the `public/images/` folder, replacing the existing file.
3. If your file is a PNG, also update the `photoUrl` value in `src/data/resume.ts` from `/images/profile.jpg` to `/images/profile.png`.
4. Rebuild the project.

The hero, the on-page Resume section, and the downloadable PDF will all use the new photo automatically.
