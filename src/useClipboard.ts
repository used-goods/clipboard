import { useRef, useCallback, useEffect, useState } from "react";

export const useClipboard = (initialContents = "", copiedDuration = 1500) => {
  const contents = useRef(initialContents);
  const [copied, setCopied] = useState(false);

  // if copy was called this will set copied flag that can be used
  // to change text on a button, icon, or create any other visual feedback
  // to something being copied to the clipboard
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), copiedDuration);
      return () => window.clearTimeout(timer);
    }
  }, [copied, copiedDuration]);

  // allows to set content programmatically so that it could be copied with
  // copy without a value later on
  const setContents = useCallback((newContents?: string) => {
    contents.current = newContents || "";
  }, []);

  // calling copy without value will copy current contents value if present
  // or accepts a string of text to be copied
  const copy = useCallback((newContents?: string) => {
    if (typeof newContents === "string") {
      contents.current = newContents;
    }
    // to have access to `clipboard-write` permission document
    // has to be active and have focus
    navigator.clipboard.writeText(contents.current);
    setCopied(true);
  }, []);

  return { copy, copied, contents, setContents };
};
