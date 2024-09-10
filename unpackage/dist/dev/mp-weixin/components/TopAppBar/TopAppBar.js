"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "TopAppBar",
  data() {
    return {
      statusBarHeight: 40
    };
  },
  mounted() {
    this.statusBarHeight = common_vendor.index.getWindowInfo().statusBarHeight;
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "65cfd361": _ctx.statusBarHeight + 50 + "px",
    "0d146aae": _ctx.statusBarHeight + "px"
  }));
};
const __setup__ = _sfc_main.setup;
_sfc_main.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s(_ctx.__cssVars()),
    b: common_vendor.s(_ctx.__cssVars())
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
