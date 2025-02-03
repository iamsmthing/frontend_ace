export function CodeEditor({iframe}:any) {
  
  return (
    <div className="h-full w-full">
      <iframe src={iframe}
     style={{
      width: "100%",
      height: "100%",
      border: 0,
    }}
    title="zealous-platform"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
  
    </div>
  );
}
