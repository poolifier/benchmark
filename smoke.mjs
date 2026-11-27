import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('./', import.meta.url))

// Keep in sync with the list in hyperfine_benchmarks.sh.
const scripts = [
  'dynamic-poolifier.mjs',
  'fixed-poolifier.mjs',
  'dynamic-piscina.mjs',
  'fixed-piscina.mjs',
  'dynamic-tinypool.mjs',
  'fixed-tinypool.mjs',
  'dynamic-workerpool.mjs',
  'fixed-workerpool.mjs',
  'dynamic-worker-nodes.cjs',
  'fixed-worker-nodes.cjs',
  'dynamic-concurrent.js.mjs',
  'fixed-concurrent.js.mjs',
]

const settings = {
  NUM_ITERATIONS: process.env.NUM_ITERATIONS || '2',
  POOL_SIZE: process.env.POOL_SIZE || '2',
  TASK_SIZE: process.env.TASK_SIZE || '10',
  TASK_TYPE: process.env.TASK_TYPE || 'CPU_INTENSIVE',
}

const timeoutMs = 90000

const run = script =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script], {
      cwd: rootDir,
      env: { ...process.env, NODE_ENV: 'production', ...settings },
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: timeoutMs,
    })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', chunk => {
      stdout += chunk
    })
    child.stderr.on('data', chunk => {
      stderr += chunk
    })
    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      reject(new Error(`timeout after ${timeoutMs}ms`))
    }, timeoutMs)
    child.on('close', code => {
      clearTimeout(timer)
      if (code === 0) resolve({ script, stderr, stdout })
      else {
        reject(
          new Error(
            `exited with code ${code}${stderr ? `:\n${stderr.trim()}` : ''}`
          )
        )
      }
    })
    child.on('error', error => {
      clearTimeout(timer)
      reject(error)
    })
  })

const results = []
for (const script of scripts) {
  process.stdout.write(`running ${script} ... `)
  try {
    await run(script)
    process.stdout.write('PASS\n')
    results.push({ ok: true, script })
  } catch (error) {
    process.stdout.write('FAIL\n')
    results.push({ error, ok: false, script })
  }
}

console.log('')
for (const result of results) {
  if (result.ok) continue
  console.error(`FAILED: ${result.script}\n  ${result.error.message}\n`)
}
const failed = results.filter(result => !result.ok)
console.log(
  `smoke: ${results.length - failed.length}/${results.length} pools OK`
)

// eslint-disable-next-line n/no-process-exit
process.exit(failed.length === 0 ? 0 : 1)
