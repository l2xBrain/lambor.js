"use strict";exports.__esModule=true;exports.devRunCompiler=devRunCompiler;exports.runCompiler=runCompiler;var _webpack=_interopRequireDefault(require("webpack"));var _path=_interopRequireWildcard(require("path"));var _requireFromString=_interopRequireDefault(require("require-from-string"));var _constants=require("../lib/constants");var _hotReloader=_interopRequireDefault(require("./hot-reloader"));function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap();_getRequireWildcardCache=function(){return cache;};return cache;}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function generateStats(result,stat){const{errors,warnings}=stat.toJson('errors-warnings');if(errors.length>0){result.errors.push(...errors);}if(warnings.length>0){result.warnings.push(...warnings);}return result;}async function devRunCompiler([clientConfig,serverConfig]){const clientDist=clientConfig.output.path;const serverDist=serverConfig.output.path;const multiCompiler=(0,_webpack.default)([clientConfig,serverConfig]);try{const hotReloader=new _hotReloader.default(multiCompiler);function clientCompile(){return new Promise((resolve,reject)=>{multiCompiler.compilers[0].hooks.done.tap('clientDone',()=>{try{const clientMFS=hotReloader.webpackDevMiddleware.fileSystem;const entryFiles=JSON.parse(clientMFS.readFileSync(_path.default.resolve(clientDist,_constants.ENTRY_FILES),'utf-8')).default;const clientBundles=require(_path.default.resolve(clientDist,_constants.REACT_LOADABLE_MANIFEST));resolve({entryFiles,clientBundles});}catch(error){console.error("[clientDone]",error);}});});}function serverCompile(){return new Promise((resolve,reject)=>{multiCompiler.compilers[1].hooks.done.tap('serverDone',()=>{const serverMFS=hotReloader.webpackDevMiddleware.fileSystem;const Ssr=(0,_requireFromString.default)(serverMFS.readFileSync(_path.default.resolve(serverDist,_constants.SERVEROUTPUT),'utf-8')).default;const Document=(0,_requireFromString.default)(serverMFS.readFileSync(_path.default.resolve(serverDist,_constants.DOCUMENTJS),'utf-8')).default;resolve({Document,Ssr});});});}const{entryFiles,clientBundles}=await clientCompile();const{Document,Ssr}=await serverCompile();return{clientBundles,Document,entryFiles,Ssr,mfs:hotReloader.webpackDevMiddleware.fileSystem,hotReloader};}catch(error){console.log('error',error);}}function runCompiler(config,{dev=false}){const multiCompiler=(0,_webpack.default)(config);return new Promise(async(resolve,reject)=>{multiCompiler.run((err,statsOrMultiStats)=>{if(err){return reject(err);}if('stats'in statsOrMultiStats){const result=statsOrMultiStats.stats.reduce(generateStats,{errors:[],warnings:[]});return resolve(result);}const result=generateStats({errors:[],warnings:[]},statsOrMultiStats);return resolve(result);});});}