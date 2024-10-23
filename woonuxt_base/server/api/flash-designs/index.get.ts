import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import type { FlashDesignData } from '~~/woonuxt_base/app/types'

export default defineEventHandler(async () => {
  const jsonDir = join(process.cwd(), 'json')
  const filenames = await fs.readdir(jsonDir)
  const designs: FlashDesignData[] = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.json'))
      .map(async (filename) => {
        const filePath = join(jsonDir, filename)
        const data = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(data) as FlashDesignData
      }),
  )
  return designs
})
