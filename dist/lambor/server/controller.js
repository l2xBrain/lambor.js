"use strict";exports.__esModule=true;exports.default=void 0;var _loadable=_interopRequireDefault(require("lambor-utils/loadable"));var _path=require("path");var _fs=_interopRequireDefault(require("fs"));var _querystring=require("querystring");var _url=require("url");var _config=_interopRequireDefault(require("./config"));var _constants=require("../lib/constants");var _build=_interopRequireDefault(require("../build"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}class Controller{constructor(){this.preload=async()=>{await _loadable.default.preloadAll();};this.handleRequest=async(req,res,parsedUrl)=>{try{if(!parsedUrl||typeof parsedUrl!=='object'){parsedUrl=(0,_url.parse)(req.url,true);}if(this.dev){await this.hotReloader.run(req,res,parsedUrl);}// 检测是否为数据请求
if(this.lamborCon.apiReg.test(parsedUrl.pathname)){console.log('api接口',parsedUrl.pathname);res.end();return;}// 是否为静态文件
if(parsedUrl.pathname.startsWith('/dist')){if(this.dev){res.write(this.mfs.readFileSync(parsedUrl.pathname,'utf8'));}else{res.write(_fs.default.readFileSync((0,_path.join)(this.distDir,parsedUrl.pathname.slice('/dist/'.length)),'utf8'));}return res.end();}if(parsedUrl.pathname==='/favicon.ico'){res.end();return;}// Parse the querystring ourselves if the user doesn't handle querystring parsing
if(typeof parsedUrl.query==='string'){parsedUrl.query=(0,_querystring.parse)(parsedUrl.query);}return await this.ssr.run(req,res,parsedUrl);}catch(err){console.error(err);res.statusCode=500;res.end('Internal Server Error');}};}async init({dir='.',dev=false}){this.dev=dev;const rootDir=(0,_path.resolve)(dir);this.lamborCon=(0,_config.default)(rootDir);this.distDir=(0,_path.join)(rootDir,this.lamborCon.distDir);if(dev){try{const{Document,entryFiles,Ssr,clientBundles,mfs,hotReloader}=await(0,_build.default)(rootDir,{dev});this.clientBundles=clientBundles;this.Document=Document;this.entryFiles=entryFiles;this.Ssr=Ssr;this.mfs=mfs;this.hotReloader=hotReloader;}catch(error){console.log('error',error);}}else{this.clientBundles=require((0,_path.join)(this.distDir,_constants.REACT_LOADABLE_MANIFEST));this.Document=require((0,_path.join)(this.distDir,_constants.SERVER_DIRECTORY,_constants.DOCUMENTJS)).default;this.entryFiles=require((0,_path.join)(this.distDir,_constants.ENTRY_FILES)).default;this.Ssr=require((0,_path.join)(this.distDir,_constants.SERVER_DIRECTORY,_constants.SERVEROUTPUT)).default;}this.ssr=new this.Ssr({rootDir,distDir:this.distDir,Document:this.Document,entryFiles:this.entryFiles,clientBundles:this.clientBundles});}}exports.default=Controller;