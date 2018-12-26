const path = require("path")
const { patternGroupToMetaMap } = require("@dmail/project-structure")
const eslintConfig = require("@dmail/project-eslint-config").config
const prettierConfig = require("@dmail/project-prettier-config")
const structureConfig = require("./structure.config.js")

const localRoot = path.resolve(__dirname, "../")

const metaMap = patternGroupToMetaMap(structureConfig)

module.exports = {
  localRoot,
  prettier: prettierConfig,
  eslint: eslintConfig,
  metaMap,
}
