"use client";

import { useRef, useEffect, useCallback } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "Write your content here..." }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const initialSyncIconDone = useRef(false);

  // Set content once after mount, using latest value
  useEffect(() => {
    if (!initialSyncIconDone.current && editorRef.current) {
      editorRef.current.innerHTML = value || "";
      initialSyncIconDone.current = true;
    }
  }, []); // Only run once, but use latest captured value via closure

  // Separate effect to handle value updates after initial SyncIcon
  useEffect(() => {
    if (initialSyncIconDone.current && editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const exec = useCallback((command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg ?? undefined);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const insertLink = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.toString().trim() === "") {
      alert("Select some text first, then click Link.");
      return;
    }
    const url = prompt("Enter URL (e.g. /services/Printer-rental or https://...):", "https://");
    if (url && url !== "https://") exec("createLink", url);
  }, [exec]);

  const handleInput = useCallback(() => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      exec("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  }, [exec]);

  const tb = "px-2.5 py-1.5 rounded text-sm text-slate-700 hover:bg-slate-200 transition-colors select-none cursor-pointer";
  const sep = <span className="w-px h-5 bg-slate-300 mx-0.5 inline-block" />;

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="bg-slate-100 border-b border-slate-200 px-2 py-1.5 flex flex-wrap items-center gap-0.5">
        <button type="button" onClick={() => exec("formatBlock", "h2")} className={`${tb} font-bold text-base`} title="Heading 2">H2</button>
        <button type="button" onClick={() => exec("formatBlock", "h3")} className={`${tb} font-bold`} title="Heading 3">H3</button>
        <button type="button" onClick={() => exec("formatBlock", "h4")} className={tb} title="Heading 4">H4</button>
        <button type="button" onClick={() => exec("formatBlock", "p")} className={tb} title="Normal paragraph">P</button>
        {sep}
        <button type="button" onClick={() => exec("bold")} className={`${tb} font-bold`} title="Bold (Ctrl+B)"><strong>B</strong></button>
        <button type="button" onClick={() => exec("italic")} className={`${tb} italic`} title="Italic (Ctrl+I)"><em>I</em></button>
        <button type="button" onClick={() => exec("underline")} className={`${tb} underline`} title="Underline (Ctrl+U)">U</button>
        <button type="button" onClick={() => exec("strikeThrough")} className={`${tb} line-through`} title="Strikethrough">S</button>
        {sep}
        <button type="button" onClick={() => exec("insertOrderedList")} className={tb} title="Numbered List">1. List</button>
        <button type="button" onClick={() => exec("insertUnorderedList")} className={tb} title="Bullet List">• List</button>
        {sep}
        <button type="button" onClick={insertLink} className={`${tb} text-blue-600`} title="Insert Link">🔗 Link</button>
        <button type="button" onClick={() => exec("unlink")} className={`${tb} text-slate-500`} title="Remove Link">✂ Unlink</button>
        {sep}
        <button type="button" onClick={() => exec("removeFormat")} className={`${tb} text-slate-500`} title="Clear formatting">✕ Clear Format</button>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        suppressHydrationWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="min-h-[500px] p-5 bg-white text-slate-900 focus:outline-none leading-relaxed"
        data-placeholder={placeholder}
      />

      <style jsx global>{`
        [data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          display: block;
        }
        [contenteditable] h2 { font-size: 1.5rem; font-weight: 700; margin: 1.25rem 0 0.5rem; line-height: 1.3; color: #111827; }
        [contenteditable] h3 { font-size: 1.2rem; font-weight: 600; margin: 1rem 0 0.4rem; line-height: 1.4; color: #111827; }
        [contenteditable] h4 { font-size: 1.05rem; font-weight: 600; margin: 0.8rem 0 0.35rem; color: #111827; }
        [contenteditable] p  { margin: 0.6rem 0; color: #1f2937; }
        [contenteditable] ul { list-style: disc; padding-left: 1.75rem; margin: 0.6rem 0; }
        [contenteditable] ol { list-style: decimal; padding-left: 1.75rem; margin: 0.6rem 0; }
        [contenteditable] li { margin: 0.25rem 0; color: #1f2937; }
        [contenteditable] a  { color: #2563eb; text-decoration: underline; }
        [contenteditable] a:hover { color: #1d4ed8; }
        [contenteditable] strong, [contenteditable] b { font-weight: 700; }
        [contenteditable] em, [contenteditable] i { font-style: italic; }
        [contenteditable] u  { text-decoration: underline; }
        [contenteditable] strike, [contenteditable] s { text-decoration: line-through; }
        [contenteditable] blockquote { border-left: 3px solid #d1d5db; padding-left: 1rem; color: #6b7280; margin: 0.75rem 0; font-style: italic; }
      `}</style>
    </div>
  );
}
