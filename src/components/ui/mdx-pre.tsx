'use client';

import { useState, useRef } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MDXPre({ children, className, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const onCopy = async () => {
    if (preRef.current) {
      const text = preRef.current.textContent || '';
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-block relative group my-8 overflow-hidden rounded-xl bg-[#0d1117] shadow-sm">
      <div className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <button
          onClick={onCopy}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md"
          aria-label="Copy code"
          title="Copy to clipboard"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        {/* Strip `backgroundColor` from provided inline style to force transparent single container */}
        <pre
          ref={preRef}
          {...props}
          className={cn("text-[13px] font-mono leading-relaxed bg-transparent m-0 px-4 py-4 text-white/90", className)}
          style={{ ...props.style, backgroundColor: 'transparent' }}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
