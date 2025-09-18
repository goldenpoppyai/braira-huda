# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/65421c3e-49b8-4b00-a2da-2ab7e43bcfba

## Local demo & notes

1. Copy the hero image so demo `index.html` can reference it:
   mkdir -p public
   cp src/assets/braira-hero.jpg public/braira-hero.jpg

2. Disabled Next API:
   The project contains a Next.js-style API at `src/pages/api/ai.ts`. For Vite demo preview this file has been renamed to `src/pages/api/ai.disabled.ts`. If you deploy with Next/Vercel, restore it to its original path.

3. Mock AI for demo:
   The demo-friendly helper `src/lib/mockAi.ts` returns deterministic responses for UI testing without server-side keys.

4. Run dev:
   npm install
   npm run dev

5. Build and preview:
   npm run build
   npm run preview


## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/65421c3e-49b8-4b00-a2da-2ab7e43bcfba) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/65421c3e-49b8-4b00-a2da-2ab7e43bcfba) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
