# smiley-to-image

## project overview

This project is for converting smiley (see emoji and emoticon) to images. It can convert single emojis or multiple to grid layout.

Short project name: `sti` (stands for `smiley-to-image`)

Current deployment on: NONE

## development

### initial setup

#### project setup

1. execute a `git pull`
2. open project in VSCode
3. If you work with VSCode via remote software:
   - `{Ctrl}+{Shift}+{P}` -> `>Preferences: Open Settings (UI)` -> search for `keyboard.dispatch` and set it to `keyCode`
   - Restart or reload VSCode.
4. Install recommended extensions/ plugins:
   - Open Extensions menu in VSCode (`{Ctrl}+{Shift}+{X}`)
   - type in the search `@recommended`
   - install the plugins
   - configure some of the extensions:
     - `github.*`:
       - log in
5. Set up extension `Vue.vscode-typescript-vue-plugin` manually:  
   See: [Use take over mode instead of VSCode built-in TS plugin.](https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode)
   - `{Ctrl}+{Shift}+{P}`
   - Type and select `>Extensions: Show Built-in Extensions`
   - Type `typescript` in the extension search box (do not remove `@builtin` prefix).
   - Click the little gear icon of `TypeScript and JavaScript Language Features`, and select `Disable (Workspace)`.
   - Reload the workspace. Takeover mode will be enabled when you open a Vue or TS file.
6. Rename `.env.example` to `.env` and set the environment variables.
7. Install dependencies: `pnpm i`

### JSON Sorting

- Most JSON files will be sorted automatically on save due to the `/.vscode/settings.json` settings
- All JSON files inside `/.vscode/*` will not be sorted automatically. For them, use `{Ctrl}+{Shift}+{P}` -> `Sort JSON`
- For `package.json` use the console command `npx sort-package-json`

## Attribution

Head of project:

- [Thorsten Seyschab](https://todde.tv)

Honorable mentions to people and projects that helped this project:

- [antfu/vscode-file-nesting-config](https://github.com/antfu/vscode-file-nesting-config) (file nesting patterns for VSCode)

## License

This project is under the **CC-BY-NC-SA-4.0** license. See [LICENSE](LICENSE) file for more information.

Copyright (c) 2023-present, [Thorsten Seyschab](https://todde.tv)
