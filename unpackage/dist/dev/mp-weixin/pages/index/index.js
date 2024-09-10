"use strict";
const common_vendor = require("../../common/vendor.js");
const static_file = require("../../static/file.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    async function openFile() {
      const file = await static_file.chooseFile();
      if (["doc", "docx", "xsl", "xslx", "ppt", "pptx", "pdf"].includes(file.ext)) {
        common_vendor.index.openDocument({
          filePath: file.path
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/read/read?${static_file.encodeUrlParams(file)}`
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(openFile)
      };
    };
  }
};
wx.createPage(_sfc_main);
