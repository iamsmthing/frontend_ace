export function CodeEditor() {
  return (
    <div className="h-full w-full">
      {/* <iframe
        src="https://codesandbox.io/embed/y2ptx2?view=editor"
        style={{
          width: '100%',
          height: '100%',
          border: 0,
        }}
        title="Code Editor"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      /> */}
      {/* <iframe src="https://codesandbox.io/p/devbox/boring-water-wsnxfl?embed=1&file=%2Findex.html&showConsole=true"
     style={{width:'100%',height: '100%', border:0, borderRadius: '4px', overflow:'hidden'}}
     title="boring-water-wsnxfl"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe> */}
   <iframe src="https://codesandbox.io/embed/q45hs4?view=editor+%2B+preview&module=%2Fsrc%2FApp.js&expanddevtools=1"
     style={{
      width: '100%',
      height: '100%',
      border: 0,
    }}
     title="winter-bush"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
    </div>
  )
}