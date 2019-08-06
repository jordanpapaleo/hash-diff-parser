import React, { useState } from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Layout from "../components/layout"

const IndexPage = () => {
  const [hashInput, setHashInput] = useState('')

  function handleChange (e) {
    setHashInput(e.target.value)
  }

  function onCopy () {

  }

  let formattedOutput = ''

  try {
    const cleaned = hashInput
      .replace(/=>/g, ': ')
      .replace(/nil/g, null)

    const parsed = JSON.parse(cleaned)
    const stringified = JSON.stringify(parsed, undefined, 2)
    formattedOutput = stringified
  } catch (err) {
    console.log(err)
  }

  console.log('formattedOutput', formattedOutput)
  const style = {
    minHeight: 200,
    border: '1px solid gray',
    padding: 20,
  }
  return (
    <Layout>
      <div style={{display: 'grid', gridTemplateColumns: '1fr', gridGap: 20, padding: 20}}>
        <p>Takes output from our tests and turns it into readable json</p>
        <textarea
          placeholder="Paste Hash Diff here"
          onChange={handleChange}
          value={hashInput}
          style={{...style, maxHeight: 200}}
        />
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gridGap: 20}}>
          <p>Turn test output into json</p>
          <CopyToClipboard onCopy={onCopy} text={formattedOutput}>
            <button>Copy output to clipboard</button>
          </CopyToClipboard>
        </div>
        <pre style={{...style, minHeight: 400, maxHeight: 800, oveflow: 'scroll'}}>
          <code>
            {formattedOutput}
          </code>
        </pre>
      </div>
    </Layout>
  )
}

export default IndexPage
