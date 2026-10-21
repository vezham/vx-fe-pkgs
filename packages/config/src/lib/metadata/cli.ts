#!/usr/bin/env node
import { generateMetadata, watchMetadata } from './index'

const [, , command = 'generate', projectRoot = process.cwd(), output] =
  process.argv

if (command === 'generate') {
  const files = generateMetadata({ projectRoot })

  console.log(
    output === '--json'
      ? JSON.stringify(files)
      : `Generated ${files.length} metadata files for ${projectRoot}`
  )
} else if (command === 'watch') {
  watchMetadata({ projectRoot })
} else {
  console.error(
    `Unknown public command "${command}". Use "generate" or "watch".`
  )
  process.exitCode = 1
}
