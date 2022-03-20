import Editor from "./Editor";
import { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [html, setHTML] = useLocalStorage("html","")
  const [css, setCss] = useLocalStorage("css","")
  const [js, setJs] = useLocalStorage("js","")
  const [srcDoc, setSrcDoc] = useState("")
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
      `)
    },250)
    return () => clearTimeout(timeout)
  }, [html, css, js])
  return (
    <>
      <div className="pane top-pane">
        <Editor language="xml"
          displayName="HTML"
          value={html}
          onChange={setHTML} />
        <Editor language="css"
          displayName="Css"
          value={css}
          onChange={setCss} />
        <Editor language="javascript"
          displayName="Java Script"
          value={js}
          onChange={setJs} />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          hieght="100%"
        />
      </div>
    </>
  );
}
export default App;
