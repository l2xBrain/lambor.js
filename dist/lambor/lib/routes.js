"use strict";exports.__esModule=true;exports.generateRoutes=void 0;var _routes=_interopRequireDefault(require("@/routes"));var _constants=require("./constants");var _utils=require("../lib/utils");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}// 构建Loadable 路由系统
// 在服务端和浏览器端都要读取routes.json文件，所以执行此文件要在服务端执行完成
const res=[];const generateRoutes=app=>{if(res.length){return res;}for(const key in _routes.default){if(_constants.BLOCKED_PAGES_REG.test(key))continue;// const pageCom = join('/', routes[key], '/')
res.push({path:key,exact:true,component:_routes.default[key]({registerModels:_utils.registerModels,app})});}return res;};exports.generateRoutes=generateRoutes;if(__IS_SERVER__){generateRoutes();}