"use client"

import { useState } from 'react'

export function useCodeExecution() {
  const [result, setResult] = useState<string>('')
  const [isExecuting, setIsExecuting] = useState(false)

  const execute = async (code: string, framework: string, language: string) => {
    setIsExecuting(true)
    try {
      // Create a sandbox iframe to run the code
      const sandbox = document.createElement('iframe')
      sandbox.style.display = 'none'
      document.body.appendChild(sandbox)

      // Create HTML content based on the framework
      const html = createHTML(code, framework, language)

      // Write the HTML to the iframe
      const doc = sandbox.contentDocument
      if (doc) {
        doc.open()
        doc.write(html)
        doc.close()
      }

      // Get the rendered content
      const content = sandbox.contentDocument?.body.innerHTML || ''
      setResult(content)
    } catch (error) {
      console.error('Error executing code:', error)
      setResult('<div class="text-red-500">Error executing code</div>')
    } finally {
      setIsExecuting(false)
    }
  }

  return { execute, result, isExecuting }
}

function createHTML(code: string, framework: string, language: string): string {
  switch (framework) {
    case 'react':
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              ${code}
              ReactDOM.render(
                React.createElement(Counter),
                document.getElementById('root')
              );
            </script>
          </body>
        </html>
      `
    case 'vue':
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://unpkg.com/vue@3"></script>
          </head>
          <body>
            <div id="app"></div>
            <script>
              ${code}
              Vue.createApp({
                template: \`<div id="app"></div>\`
              }).mount('#app')
            </script>
          </body>
        </html>
      `
    case 'angular':
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://unpkg.com/@angular/core@12"></script>
          </head>
          <body>
            <app-root></app-root>
            <script>
              ${code}
            </script>
          </body>
        </html>
      `
    default:
      return ''
  }
}