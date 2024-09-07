import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown

const OutputSection = ({ instructions }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">
        Testing Instructions
      </h2>
      <ReactMarkdown
        children={instructions}
        remarkPlugins={[remarkGfm]}
        className="prose dark:prose-dark"
      />
    </div>
  );
};

export default OutputSection;
