import chardet from 'chardet'
import { TextDecoder } from 'text-encoding'


// 选取消息中的文件
export async function chooseFile() : Promise<File> {
	return new Promise((resolve, reject) => {
		uni.chooseMessageFile({
			count: 1,
			success(res) {
				const file = res.tempFiles[0]
				resolve({
					name: file.name,
					type: file.type,
					path: file.path,
					ext: file.name.substring(file.name.lastIndexOf(".") + 1)
				})
			},
			fail(err) {
				reject(err)
			}
		})
	})
}


// 将 file 对象编码
export function encodeUrlParams(file : File) : string {
	return `file=${encodeURIComponent(JSON.stringify(file))}`
}


// 将编码解码为 File 对象
export function decodeUrlParams(obj : Record<string, any>) : File {
	const json = JSON.parse(decodeURIComponent(obj.file))
	return {
		name: json.name,
		type: json.type,
		path: json.path,
		ext: json.ext
	}
}


// 支持的文件类型
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
	"mm": "objectivec",  // 或者 m
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
}


// 读取文件
export function read(file : File) : string {
	const data = uni.getFileSystemManager().readFileSync(file.path) as ArrayBuffer
	const uint8Array = new Uint8Array(data)

	return new TextDecoder(chardet.detect(uint8Array)).decode(data)
}


// 判断文件是否支持高亮
export function supportHighlight(file: File): boolean {
	return map[file.ext] != null
}


// 将 text 用 code 标签标识，并根据 ext 标记语言
export function code(text : string, ext : string) : string {
	return `<pre style='white-space: pre-wrap; word-wrap: break-word;'><code class="language-${map[ext] ?? ''}">${text}</code></pre>`
}


// 使用微信打开文档
export function openDoc(file : File) {
	uni.openDocument({
		filePath: file.path,
	})
}


interface File {
	name : string,
	type : string,
	path : string,
	ext : string
}