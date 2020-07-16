"use strict";var React=_interopRequireWildcard(require("react"));var Loadable=_interopRequireWildcard(require("react-loadable"));var _dva=_interopRequireDefault(require("dva"));var _reactDom=require("react-dom");var _createBrowserHistory=_interopRequireDefault(require("history/createBrowserHistory"));var _router=_interopRequireDefault(require("../router"));var _routes=require("../lib/routes");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap();_getRequireWildcardCache=function(){return cache;};return cache;}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}const app=(0,_dva.default)({history:(0,_createBrowserHistory.default)()});const routesList=(0,_routes.generateRoutes)(app);app.router(_router.default);Loadable.preloadReady().then(()=>{if(module.hot){module.hot.accept();}const DApp=app.start();(0,_reactDom.hydrate)(/*#__PURE__*/React.createElement(DApp,{context:{routesList}}),document.getElementById('__ha'));});