# Q&A Application

A modern Vue 3 application for asking and managing questions, with a YAML backend and ChatGPT integration for generating fun questions.

## Features

- Submit questions with topic, recipient, and question text
- Generate fun questions using ChatGPT
- View all questions in a dedicated page
- Admin dashboard for managing questions and users
- Modern UI with Tailwind CSS
- YAML backend for data storage

## Prerequisites

- Node.js 16.x or later
- OpenAI API key (for question generation feature)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Development

Run the development server:
```bash
npm run dev
```

## Deployment to Vercel

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add the following environment variable in Vercel:
   - `OPENAI_API_KEY`: Your OpenAI API key
4. Deploy!

## Customization

- Update the list of users in `src/data/questions.yaml`
- Modify the color scheme in `tailwind.config.js`
- Replace the logo by adding your own `logo.png` in the `public` directory

## License

MIT
