import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Choose a theme

const MarkdownRenderer = ({ content }:any) => {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeHighlight]}
        components={{
          p({ children }:any) {
            // Prevents wrapping <pre> inside <p> which causes hydration issues
            if (children.length === 1 && children[0].type === "element" && children[0].props.node.tagName === "pre") {
              return children;
            }
            return <p>{children}</p>;
          },
          code({ node, inline, className, children, ...props }:any) {
            return inline ? (
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                {children}
              </code>
            ) : (
              <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-wrap">
                <code {...props} className={className}>
                  {children}
                </code>
              </pre>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
