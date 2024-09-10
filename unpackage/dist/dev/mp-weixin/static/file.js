"use strict";
const common_vendor = require("../common/vendor.js");
async function chooseFile() {
  return new Promise((resolve, reject) => {
    common_vendor.index.chooseMessageFile({
      count: 1,
      success(res) {
        const file = res.tempFiles[0];
        resolve({
          name: file.name,
          type: file.type,
          path: file.path,
          ext: file.name.substring(file.name.lastIndexOf(".") + 1)
        });
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
function encodeUrlParams(file) {
  return `file=${encodeURIComponent(JSON.stringify(file))}`;
}
function decodeUrlParams(obj) {
  const json = JSON.parse(decodeURIComponent(obj.file));
  return {
    name: json.name,
    type: json.type,
    path: json.path,
    ext: json.ext
  };
}
const map = {
  "html": "html",
  "htm": "html",
  "xml": "xml",
  "svg": "xml",
  "mml": "xml",
  "ssml": "xml",
  "atom": "xml",
  "rss": "xml",
  "css": "css",
  "js": "javascript",
  "bat": "batch",
  "cmd": "batch",
  "c": "c",
  "cpp": "cpp",
  "cs": "csharp",
  "cmake": "cmake",
  "dart": "dart",
  "go": "go",
  "gradle": "groovy",
  "groovy": "groovy",
  "ignore": "ignore",
  "gitignore": "ignore",
  "hgignore": "ignore",
  "npmignore": "ignore",
  "java": "java",
  "json": "json",
  "json5": "json5",
  "jsonp": "javascript",
  "kt": "kt",
  "kts": "kt",
  "less": "less",
  "mk": "makefile",
  "Makefile": "makefile",
  "md": "markdown",
  "m": "matlab",
  "mm": "objectivec",
  // 或者 m
  "php": "php",
  "ps": "powershell",
  "py": "python",
  "R": "r",
  "r": "r",
  "jsx": "jsx",
  "tsx": "tsx",
  "rb": "ruby",
  "rs": "rust",
  "sass": "sass",
  "scss": "scss",
  "sql": "sql",
  "swift": "swift",
  "toml": "toml",
  "ts": "typescript",
  "uc": "unrealscript",
  "vim": "vim",
  "vimrc": "vim",
  "wasm": "webassembly"
};
function read(file) {
  const data = common_vendor.index.getFileSystemManager().readFileSync(file.path);
  const uint8Array = new Uint8Array(data);
  return new common_vendor.textEncoding.TextDecoder(common_vendor.chardet.detect(uint8Array)).decode(data);
}
function supportHighlight(file) {
  return map[file.ext] != null;
}
function code(text, ext) {
  return `<pre style='white-space: pre-wrap; word-wrap: break-word;'><code class="language-${map[ext] ?? ""}">${text}</code></pre>`;
}
exports.chooseFile = chooseFile;
exports.code = code;
exports.decodeUrlParams = decodeUrlParams;
exports.encodeUrlParams = encodeUrlParams;
exports.read = read;
exports.supportHighlight = supportHighlight;
