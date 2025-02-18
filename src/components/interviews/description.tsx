import { Badge } from "@/components/ui/badge"

export function Description({ challenge }: { challenge: any }) {
  return (
    <div className="prose prose-invert max-w-none prose-pre:bg-white/5 prose-pre:backdrop-blur-xl">
      <h1 className="text-2xl font-bold  mb-2">{challenge.title}</h1>
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge className=" ">JavaScript</Badge>
            <Badge className="  mb-4">{challenge.difficulty}</Badge>
          </div>
          <p className=" mb-6">{challenge.description}</p>
          <div className="flex items-center gap-2 text-sm ">
            <span>15 mins</span>
            <span>•</span>
            <span>8k completed</span>
          </div>
        </div>
        {/* <p className="text-purple-200">
          Implement a function to limit how many times a function can be executed by delaying the execution of the
          function until after a specified time after its last execution attempt.
        </p> */}
      </div>

      <h2 className="text-xl font-semibold ">Theory</h2>
      <p className="">
        Debouncing is a technique used to control how many times we allow a function to be executed over time. When a
        JavaScript function is debounced with a wait time of X milliseconds, it must wait until after X milliseconds
        have elapsed since the debounced function was last called.
      </p>
      <p className="">
        You almost certainly have encountered debouncing in your daily lives before — when entering an elevator. Only
        after X duration of not pressing the "Door open" button (the debounced function not being called) will the
        elevator door actually close (the callback function is executed).
      </p>

      <h2 className="text-xl font-semibold ">Examples</h2>
      <pre className="rounded-xl">
        <code className="language-javascript">{`
const debounced = debounce(() => console.log('hello'), 1000);

// Call the debounced function
debounced();
debounced();
debounced();

// 'hello' will only be logged once, approximately 1000ms later
        `}</code>
      </pre>

      <h2 className="text-xl font-semibold ">Notes</h2>
      <ul className="list-disc space-y-2 ">
        <li>The function should return a new debounced function.</li>
        <li>The debounced function should execute the callback after the specified delay.</li>
        <li>If the debounced function is called again before the delay has elapsed, the timer should reset.</li>
      </ul>
    </div>
  )
}

