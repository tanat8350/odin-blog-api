const removeHtmlTag = (str) => {
  return (
    str
      // FIX: lines containing color disappeared
      // tags
      .replace(/&lt;.*&gt;(.*)&lt;&#x2F;.*&gt;/g, "$1")
      // bullets
      .replace(/&lt;.*&gt;/g, "")
      // empty lines
      .replace(/&amp;nbsp;/g, "")
  );
};

export default removeHtmlTag;
