"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(user)/care/layout",{

/***/ "(app-pages-browser)/./lib/session.ts":
/*!************************!*\
  !*** ./lib/session.ts ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authenticate: function() { return /* binding */ authenticate; },
/* harmony export */   clearSession: function() { return /* binding */ clearSession; },
/* harmony export */   getClientFromSession: function() { return /* binding */ getClientFromSession; },
/* harmony export */   getProfessionalFromSession: function() { return /* binding */ getProfessionalFromSession; },
/* harmony export */   getSession: function() { return /* binding */ getSession; },
/* harmony export */   getToken: function() { return /* binding */ getToken; },
/* harmony export */   getUserFromSession: function() { return /* binding */ getUserFromSession; },
/* harmony export */   requireProfessional: function() { return /* binding */ requireProfessional; }
/* harmony export */ });
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/client/app-call-server */ "(app-pages-browser)/./node_modules/next/dist/client/app-call-server.js");
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! private-next-rsc-action-client-wrapper */ "(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js");



function __build_action__(action, args) {
  return (0,next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__.callServer)(action.$$id, args)
}

/* __next_internal_action_entry_do_not_use__ {"098267a7fc54f379220263093d013b583947a8ad":"$$ACTION_4","09f2f96f5603c737927fe4ba4a19e0acb951421a":"$$ACTION_3","3cb3f5c3b154bcb6148b09fe89cc9bcf529d1a08":"$$ACTION_2","44650a473616487de7d4ccd6383ca216023cd5f3":"getClientFromSession","7eecd8cb6ca4d2cc7f56c7325e2c6c5adc5b4794":"getProfessionalFromSession","83daaeeb38eec411d1581fd98b75f85884553f16":"getSession","8437c015657f981dfc9300d78859bf3db129f645":"getUserFromSession","8cc7dc72e646e54aaf67bb553851e963d9aa61cb":"$$ACTION_1","953300b309e54df5e2b33f13a34af50186f8838c":"$$ACTION_0","b6cab5aedef4ada7435b8ae571fb9988729c516b":"requireProfessional","d4155ff69ce135fcd97e99fa3ed9b80c5e508e9b":"$$ACTION_7","d4f26adf5dfc04b413a4f3ba16ec39ceed42bf88":"authenticate","d80448d7e39d52bfd4afbe50e317a94b04b6fb58":"$$ACTION_6","e586563c17e54cb43e0095eab65dcf63ab09e28c":"getToken","e6ef75afe37cb525a020eada1f0ad937d9a262ea":"$$ACTION_5","f9f8b3a8195e2252a8a0cdde2aef289ee6d513cd":"clearSession"} */ var requireProfessional = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("b6cab5aedef4ada7435b8ae571fb9988729c516b");

var getToken = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("e586563c17e54cb43e0095eab65dcf63ab09e28c");
var getSession = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("83daaeeb38eec411d1581fd98b75f85884553f16");
var authenticate = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("d4f26adf5dfc04b413a4f3ba16ec39ceed42bf88");
var clearSession = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("f9f8b3a8195e2252a8a0cdde2aef289ee6d513cd");
var getUserFromSession = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("8437c015657f981dfc9300d78859bf3db129f645");
var getClientFromSession = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("44650a473616487de7d4ccd6383ca216023cd5f3");
var getProfessionalFromSession = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("7eecd8cb6ca4d2cc7f56c7325e2c6c5adc5b4794");



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});