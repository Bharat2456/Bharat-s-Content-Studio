# Bharat's Content Studio
Open-source, subscription-free AI creative studio. Static site: no build step, no backend, no auth.

## Deploy
1. Push this folder to a GitHub repo.
2. In Vercel: Add New > Project > import the repo > Deploy (framework preset: Other, no build command).
3. Share the Vercel URL. Visitors land on the platform page; "Dashboard" opens the studio.

## Models
- Free, no key: Flux/Turbo images, studio voices, marketing tools and agents (via Pollinations).
- With a fal.ai key (pasted in Settings, kept in the browser): Flux Pro, Recraft, Ideogram, Kontext, Kling, Veo 3, Hailuo, Stable Audio, Lyria, ElevenLabs, Sync Lipsync, LatentSync, face swap.
- AI clipping runs locally in the browser.
Model IDs live in the `T` array in `studio.js`; edit them if a provider renames a model.

MIT License.
