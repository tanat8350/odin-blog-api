const removeHtmlTag = (str) => {
  return str.replace(/&lt;.*&gt;(.*)&lt;&#x2F;.*&gt;/g, "$1");
};

export default removeHtmlTag;
