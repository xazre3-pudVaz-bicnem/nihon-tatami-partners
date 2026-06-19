import React from "react";

// 簡易Markdownレンダラー（##, ###, ---, リスト, **太字**, 段落に対応）
// TODO: 本格運用時はremark等に置き換え
export default function SimpleMarkdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const renderInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith("**") && p.endsWith("**") ? (
        <strong key={i} className="text-sumi font-medium">
          {p.slice(2, -2)}
        </strong>
      ) : (
        <React.Fragment key={i}>{p}</React.Fragment>
      )
    );
  };

  const flushList = () => {
    if (listItems.length) {
      blocks.push(
        <ul key={`ul-${key++}`} className="list-disc pl-5 space-y-1.5 my-4 text-sm text-sumi/80 leading-relaxed">
          {listItems.map((li, i) => (
            <li key={i}>{renderInline(li)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      blocks.push(
        <h3 key={`h3-${key++}`} className="text-base text-sumi mt-6 mb-2 font-medium" style={{ fontFamily: "var(--font-serif)" }}>
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2 key={`h2-${key++}`} className="text-lg md:text-xl text-sumi mt-8 mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      flushList();
      blocks.push(
        <h2 key={`h1-${key++}`} className="text-xl text-sumi mt-8 mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          {renderInline(line.slice(2))}
        </h2>
      );
    } else if (line.trim() === "---") {
      flushList();
      blocks.push(<hr key={`hr-${key++}`} className="my-6 border-border" />);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      listItems.push(line.slice(2));
    } else {
      flushList();
      blocks.push(
        <p key={`p-${key++}`} className="text-sm text-sumi/80 leading-relaxed my-3">
          {renderInline(line)}
        </p>
      );
    }
  }
  flushList();

  return <div>{blocks}</div>;
}
