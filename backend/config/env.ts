import * as fs from 'node:fs'
import * as path from 'node:path'
import { parse } from 'dotenv'
import { expand } from 'dotenv-expand'

export function getEnvFilesForMode (mode: string): string[] {
  return [
    /** default file */ `.env`,
    /** local file */ `.env.local`,
    /** mode file */ `.env.${mode}`,
    /** mode local file */ `.env.${mode}.local`,
  ]
}

function tryStatSync (file: string): fs.Stats | undefined {
  try {
    // The "throwIfNoEntry" is a performance optimization for cases where the file does not exist
    return fs.statSync(file, { throwIfNoEntry: false })
  } catch {
    // Ignore errors
  }
}

export function loadEnv (
  mode: string = process.env.NODE_ENV || 'dev',
  envDir: string = path.resolve(__dirname, '../'),
  prefix: string = 'BACKEND_',
): Record<string, string> {
  if (mode === 'local') {
    throw new Error(
      `"local" cannot be used as a mode name because it conflicts with ` +
      `the .local postfix for .env files.`,
    )
  }
  const env: Record<string, string> = {}
  const envFiles = getEnvFilesForMode(mode)

  const parsed = Object.fromEntries(
    envFiles.flatMap((file) => {
      const filePath = path.join(envDir, file)
      if (!tryStatSync(filePath)?.isFile()) {
        return []
      }
      return Object.entries(parse(fs.readFileSync(filePath)))
    }),
  )

  // test NODE_ENV override before expand as otherwise process.env.NODE_ENV would override this
  if (parsed.NODE_ENV && process.env.BACKEND_USER_NODE_ENV === undefined) {
    process.env.BACKEND_USER_NODE_ENV = parsed.NODE_ENV
  }
  // support BROWSER and BROWSER_ARGS env variables
  if (parsed.BROWSER && process.env.BROWSER === undefined) {
    process.env.BROWSER = parsed.BROWSER
  }
  if (parsed.BROWSER_ARGS && process.env.BROWSER_ARGS === undefined) {
    process.env.BROWSER_ARGS = parsed.BROWSER_ARGS
  }

  // let environment variables use each other
  // `expand` patched in patches/dotenv-expand@9.0.0.patch
  expand({ parsed })

  // only keys that start with prefix are exposed to client
  for (const [key, value] of Object.entries(parsed)) {
    if (key.startsWith(prefix)) {
      env[key] = value
    }
  }

  // check if there are actual env variables starting with BACKEND_*
  // these are typically provided inline and should be prioritized
  for (const key in process.env) {
    if (key.startsWith(prefix)) {
      env[key] = process.env[key] as string
    }
  }

  return env
}
