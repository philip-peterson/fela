/* @flow */
import cssbeautify from 'cssbeautify'
import objectEach from 'fast-loops/lib/objectEach'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

function addBeautifier(renderer: DOMRenderer, options: Object): DOMRenderer {
  function beautify() {
    objectEach(renderer.nodes, ({ node }) => {
      const beautifiedContent = cssbeautify(node.textContent, options)

      if (node.textContent !== beautifiedContent) {
        node.textContent = beautifiedContent
      }
    })

    setTimeout(beautify, 200)
  }

  // Warning: We can only run that on devMode
  if (renderer.devMode) {
    beautify()
  }

  return renderer
}

const defaultOptions = {
  indent: '  ',
  openbrace: 'end-of-line',
  autosemicolon: false,
}

export default function beautifier(options: Object = {}) {
  return (renderer: DOMRenderer) =>
    addBeautifier(renderer, {
      ...defaultOptions,
      ...options,
    })
}
