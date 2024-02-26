# react-ts-test

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## My Notes (Geri)

### File Structure

#### Renderer

- React files and components are here, I don't have a folder structure for this yet.
- Tailwind imported, the main css file is in the _src/assets_ folder (_index.css_).
- HMR and Hot reload works here perfectly.

#### Main

- Electron's entrypont is in the _intex.ts_. We define the database in this file, and the window itself, which is shown on the desktop.
- Because there might be a lot of API endpoint, I moved all the handlers into an other folder, here we can implement the sql querries (for me it is like a model logic in django). **Very important to import them in the _index.ts_ file!**

#### Preload

- API endpoints are here.
- I took the CRUD operations into a different file, based on we might have a lot of different endpoints, and that would be too much lines in one file, they are in the _apis_ folder. Of course for type safety I made some interfaces, they are in the _interfaces_ folder.
- If a new endpoint is being made, whe have to implement them in the _index.ts_ file, into the try-catch block, examples are there. The other important phase is to update the _index.d.ts_ file, because of type errors. **After the modification we have to restart the development server!**

### Todo

- Eslint or prettier does not modifies the code in the _.tsx_ files, only in the _.ts_ files
- Test building and deploying for production
