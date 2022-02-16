"use strict";exports.__esModule=true;exports.default=_default;var React=_interopRequireWildcard(require("react"));var _reactRouterDom=require("react-router-dom");function _getRequireWildcardCache(nodeInterop){if(typeof WeakMap!=="function")return null;var cacheBabelInterop=new WeakMap();var cacheNodeInterop=new WeakMap();return(_getRequireWildcardCache=function(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule){return obj;}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(key!=="default"&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}function _default({history,context}){const{routesList}=context;return/*#__PURE__*/React.createElement(_reactRouterDom.Router,{location:history.location},/*#__PURE__*/React.createElement(_reactRouterDom.Routes,null,(routesList||[]).map(({path,component:C})=>{return/*#__PURE__*/React.createElement(_reactRouterDom.Route,{key:path,path:path,element:/*#__PURE__*/React.createElement(C,null)});})));}