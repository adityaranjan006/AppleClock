# Publishing Guide

## Before Publishing

1. **Update package.json**:
   - Change `"Aditya Ranjan"` to your name
   - Update `"https://github.com/adityaranjan006/AppleClock"` URL to your GitHub repo
   - Ensure version is correct (use semantic versioning)

2. **Test the package locally**:
   ```bash
   npm run build
   npm pack
   ```

3. **Test in another project**:
   ```bash
   npm install /path/to/your/react-native-apple-ui-clock-1.0.0.tgz
   ```

## Publishing to npm

1. **Create npm account** (if you don't have one):
   ```bash
   npm adduser
   ```

2. **Login to npm**:
   ```bash
   npm login
   ```

3. **Publish the package**:
   ```bash
   npm publish
   ```

## Updating the Package

1. **Update version** in package.json following semantic versioning:
   - Patch: `1.0.1` (bug fixes)
   - Minor: `1.1.0` (new features, backwards compatible)
   - Major: `2.0.0` (breaking changes)

2. **Build and publish**:
   ```bash
   npm run build
   npm publish
   ```

## Available Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm run prepublishOnly` - Automatically runs build before publishing
- `npm start` - Start development server (for testing)

## Package Structure

```
react-native-apple-ui-clock/
├── src/                 # Source TypeScript files
│   ├── appleAlarmComponent/
│   ├── utils/
│   └── index.ts        # Main export file
├── lib/                # Compiled JavaScript (generated)
├── package.json
├── README.md
└── .npmignore
```

## Tips

- Always run `npm run build` before publishing
- Test the package in a real project before publishing
- Use `npm version patch|minor|major` to automatically update version
- Check your package on npmjs.com after publishing 