"use strict";
const common_vendor = require("../../common/vendor.js");
const static_file = require("../../static/file.js");
if (!Array) {
  const _easycom_TopAppBar2 = common_vendor.resolveComponent("TopAppBar");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_easycom_TopAppBar2 + _easycom_mp_html2)();
}
const _easycom_TopAppBar = () => "../../components/TopAppBar/TopAppBar.js";
const _easycom_mp_html = () => "../../components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_TopAppBar + _easycom_mp_html)();
}
const _sfc_main = {
  __name: "read",
  setup(__props) {
    let file = common_vendor.ref(null);
    let content = common_vendor.ref(null);
    let script = common_vendor.ref(null);
    let markdown = common_vendor.ref(false);
    let highlight = common_vendor.ref(false);
    common_vendor.onLoad((option) => {
      file.value = static_file.decodeUrlParams(option);
      if (file.value.type == "file") {
        content.value = static_file.read(file.value);
        script.value = static_file.code(content.value, file.value.ext);
        if (file.value.ext == "md") {
          changeMarkdown();
        } else if (static_file.supportHighlight(file.value)) {
          changeHighlight();
        }
      }
    });
    function changeMarkdown() {
      markdown.value = !markdown.value;
      highlight.value = false;
      common_vendor.index.showToast({
        title: "Markdown 解析已" + (markdown.value ? "开启" : "关闭"),
        icon: "none"
      });
    }
    function changeHighlight() {
      highlight.value = !highlight.value;
      markdown.value = false;
      common_vendor.index.showToast({
        title: "高亮已" + (highlight.value ? "开启" : "关闭"),
        icon: "none"
      });
    }
    function previewImage() {
      common_vendor.index.previewImage({
        urls: [file.value.path]
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(file) && common_vendor.unref(file).ext == "md"
      }, common_vendor.unref(file) && common_vendor.unref(file).ext == "md" ? {
        b: common_vendor.o(changeMarkdown),
        c: common_vendor.n(`elevated outlined center ${common_vendor.unref(markdown) ? "radioOn" : "radio"}`)
      } : {}, {
        d: common_vendor.unref(file) && common_vendor.unref(file).type == "file"
      }, common_vendor.unref(file) && common_vendor.unref(file).type == "file" ? {
        e: common_vendor.o(changeHighlight),
        f: common_vendor.n(`elevated outlined center ${common_vendor.unref(highlight) ? "radioOn" : "radio"}`)
      } : {}, {
        g: common_vendor.unref(file)
      }, common_vendor.unref(file) ? common_vendor.e({
        h: common_vendor.t(common_vendor.unref(file).name),
        i: common_vendor.unref(file).type == "file" && common_vendor.unref(markdown)
      }, common_vendor.unref(file).type == "file" && common_vendor.unref(markdown) ? {
        j: common_vendor.p({
          content: common_vendor.unref(highlight) ? common_vendor.unref(script) : common_vendor.unref(content),
          ["container-style"]: "word-wrap: break-word; line-height: 30px;",
          ["use-anchor"]: true,
          selectable: true,
          markdown: true
        })
      } : common_vendor.unref(file).type == "file" && !common_vendor.unref(markdown) ? {
        l: common_vendor.p({
          content: common_vendor.unref(highlight) ? common_vendor.unref(script) : common_vendor.unref(content),
          ["container-style"]: "white-space: pre-wrap; word-wrap: break-word;; line-height: 30px;",
          ["use-anchor"]: true,
          selectable: true
        })
      } : common_vendor.unref(file).type == "image" ? {
        n: common_vendor.o(previewImage),
        o: common_vendor.unref(file).path
      } : common_vendor.unref(file).type == "video" ? {
        q: common_vendor.unref(file).path
      } : {}, {
        k: common_vendor.unref(file).type == "file" && !common_vendor.unref(markdown),
        m: common_vendor.unref(file).type == "image",
        p: common_vendor.unref(file).type == "video"
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
