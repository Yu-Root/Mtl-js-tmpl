const { PurgeCSS } = require('purgecss')

async function runPurgeCSS() {
  const purgeCSSResults = await new PurgeCSS().purge({
    content: ['src/pages/*.js'],
    css: ['src/pages/**/*.style'],
    whitelist: ['html', 'body', 'root'],
    whitelistPatterns: [/html$|body$|root$|btn|loading/],
    whitelistPatternsChildren: [/html$|body$|root$|loading/],
    keyframes: true,
    rejected: true,
  })
  console.log('===== Start =====')

  purgeCSSResults.map((p, index) => {
    console.log(`unuse class path: ${p.file}`)
    console.log(`unuse class: ${p.rejected !== '' ? p.rejected : 'None'}`)
    if (index !== purgeCSSResults.length - 1) {
      console.log('===== Next ======')
    }
  })

  console.log('===== End ======')
}

runPurgeCSS()
