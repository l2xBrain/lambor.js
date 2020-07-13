"use strict";exports.__esModule=true;exports.default=void 0;var React=_interopRequireWildcard(require("react"));var _path=require("path");var _fs=_interopRequireDefault(require("fs"));var _querystring=require("querystring");var _url=require("url");var _config=_interopRequireDefault(require("./config"));var _constants=require("../lib/constants");var _build=_interopRequireDefault(require("../build"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap();_getRequireWildcardCache=function(){return cache;};return cache;}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}class Controller{constructor(){this.preload=async()=>{await this.ssr.Loadable.preloadAll();};this.handleRequest=async(req,res,parsedUrl)=>{// Parse url if parsedUrl not provided
if(!parsedUrl||typeof parsedUrl!=='object'){parsedUrl=(0,_url.parse)(req.url,true);}// 检测是否为数据请求
if(this.haCon.apiReg.test(parsedUrl.pathname)){console.log('api接口',parsedUrl.pathname);res.end();return;}// 是否为静态文件
if(parsedUrl.pathname.startsWith('/dist')){if(this.dev){res.write(this.mfs.readFileSync((0,_path.join)(this.distDir,parsedUrl.pathname.slice('/dist/'.length)),'utf8'));}else{res.write(_fs.default.readFileSync((0,_path.join)(this.distDir,parsedUrl.pathname.slice('/dist/'.length)),'utf8'));}return res.end();}if(parsedUrl.pathname==='/favicon.ico'){res.end();return;}// Parse the querystring ourselves if the user doesn't handle querystring parsing
if(typeof parsedUrl.query==='string'){parsedUrl.query=(0,_querystring.parse)(parsedUrl.query);}try{return await this.ssr.run(req,res,parsedUrl);}catch(err){console.error(err);res.statusCode=500;res.end('Internal Server Error');}};}async init({dir='.',conf=null,dev=false}){const rootDir=(0,_path.resolve)(dir);this.dev=dev;this.haCon=(0,_config.default)(rootDir,conf);this.distDir=(0,_path.join)(rootDir,this.haCon.distDir);if(dev){const{Document,entryFiles,Ssr,clientBundles,mfs}=await(0,_build.default)(rootDir,{dev});this.clientBundles=clientBundles;this.Document=Document;this.entryFiles=entryFiles;this.Ssr=Ssr;this.mfs=mfs;}else{this.clientBundles=require((0,_path.join)(this.distDir,_constants.REACT_LOADABLE_MANIFEST));this.Document=require((0,_path.join)(this.distDir,_constants.SERVER_DIRECTORY,_constants.DOCUMENTJS)).default;this.entryFiles=require((0,_path.join)(this.distDir,_constants.ENTRY_FILES)).default;this.Ssr=require((0,_path.join)(this.distDir,_constants.SERVER_DIRECTORY,_constants.SERVEROUTPUT)).default;}this.ssr=new this.Ssr({rootDir,distDir:this.distDir,Document:this.Document,entryFiles:this.entryFiles,clientBundles:this.clientBundles});}}exports.default=Controller;