
import { decompressSync } from 'fflate';

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
  }

  const httpRequest = {
	'CacheCacheStatus': 'string',
	'CacheReserveUsed': 'bool',
	'CacheResponseBytes': 'int',
	'CacheResponseStatus': 'int',
	'CacheTieredFill': 'bool',
	'ClientASN': 'int',
	'ClientCountry': 'string',
	'ClientDeviceType': 'string',
	'ClientIP': 'string',
	'ClientIPClass': 'string',
	'ClientMTLSAuthCertFingerprint': 'string',
	'ClientMTLSAuthStatus': 'string',
	'ClientRegionCode': 'string',
	'ClientRequestBytes': 'int',
	'ClientRequestHost': 'string',
	'ClientRequestMethod': 'string',
	'ClientRequestPath': 'string',
	'ClientRequestProtocol': 'string',
	'ClientRequestReferer': 'string',
	'ClientRequestScheme': 'string',
	'ClientRequestSource': 'string',
	'ClientRequestURI': 'string',
	'ClientRequestUserAgent': 'string',
	'ClientSSLCipher': 'string',
	'ClientSSLProtocol': 'string',
	'ClientSrcPort': 'int',
	'ClientTCPRTTMs': 'int',
	'ClientXRequestedWith': 'string',
	'ContentScanObjResults': 'array[string]',
	'ContentScanObjTypes': 'array[string]',
	'Cookies': 'object',
	'EdgeCFConnectingO2O': 'bool',
	'EdgeColoCode': 'string',
	'EdgeColoID': 'int',
	'EdgeEndTimestamp': 'int or string',
	'EdgePathingOp': 'string',
	'EdgePathingSrc': 'string',
	'EdgePathingStatus': 'string',
	'EdgeRequestHost': 'string',
	'EdgeResponseBodyBytes': 'int',
	'EdgeResponseBytes': 'int',
	'EdgeResponseCompressionRatio': 'float',
	'EdgeResponseContentType': 'string',
	'EdgeResponseStatus': 'int',
	'EdgeServerIP': 'string',
	'EdgeStartTimestamp': 'int or string',
	'EdgeTimeToFirstByteMs': 'int',
	'LeakedCredentialCheckResult': 'string',
	'OriginDNSResponseTimeMs': 'int',
	'OriginIP': 'string',
	'OriginRequestHeaderSendDurationMs': 'int',
	'OriginResponseBytes': 'int',
	'OriginResponseDurationMs': 'int',
	'OriginResponseHTTPExpires': 'string',
	'OriginResponseHTTPLastModified': 'string',
	'OriginResponseHeaderReceiveDurationMs': 'int',
	'OriginResponseStatus': 'int',
	'OriginResponseTime': 'int',
	'OriginSSLProtocol': 'string',
	'OriginTCPHandshakeDurationMs': 'int',
	'OriginTLSHandshakeDurationMs': 'int',
	'ParentRayID': 'string',
	'RayID': 'string',
	'RequestHeaders': 'object',
	'ResponseHeaders': 'object',
	'SecurityAction': 'string',
	'SecurityActions': 'array[string]',
	'SecurityRuleDescription': 'string',
	'SecurityRuleID': 'string',
	'SecurityRuleIDs': 'array[string]',
	'SecuritySources': 'array[string]',
	'SmartRouteColoID': 'int',
	'UpperTierColoID': 'int',
	'WAFAttackScore': 'int',
	'WAFFlags': 'string',
	'WAFMatchedVar': 'string',
	'WAFRCEAttackScore': 'int',
	'WAFSQLiAttackScore': 'int',
	'WAFXSSAttackScore': 'int',
	'WorkerCPUTime': 'int',
	'WorkerStatus': 'string',
	'WorkerSubrequest': 'bool',
	'WorkerSubrequestCount': 'int',
	'WorkerWallTimeUs': 'int',
	'ZoneName': 'string'
  };
  


  export default {
	async fetch(request: Request, env: Env) {

			//console.log(httpRequest['ZoneName']);
		   if (request.method === 'POST') {
			//get the post data that is ziped
	       const buf = await request.arrayBuffer();
		   const compressed = new Uint8Array(buf);
		   const enc = new TextDecoder("utf-8");
		   const decompressed = decompressSync(compressed);
		   const logdata = enc.decode(decompressed);
		  // console.log(logdata);

		   // get the name of colum to check if the table has colum.
		   //comment out on 01/06. create a table for all data, no need to check the difference.
		/*  const  DbColumn  = await env.DB.prepare("PRAGMA table_info('Postlog')");
		   const { results } = await DbColumn.all()
		   const  tableNames = results.map(item => item.name);
		   console.log(tableNames);
		   console.log(tableNames[0]);
		   console.log(`array value ${tableNames}`); // get the value of table name

		   

           //get the property name of the log sent by CF
		   const logColumn = logdata.trim().split('\n').map(JSON.parse);
		   //console.log(`this is colum 0: ${logColumn[0]}`);
		   const propertyNames = Object.keys(logColumn[0]);
		   console.log(`this is property: ${propertyNames}`);
		   console.log(`0: ${propertyNames[0]}, 1: ${propertyNames[1]}`)

		   //compare the property of the log with the name of DB table to add a column

		   // need to add if when there is no difference

		   if (tableNames.length - 1 !== propertyNames.length){
		    const diffValue = tableNames.length - 1 < propertyNames.length ? 
			propertyNames.filter(itemInProp => !tableNames.some(itemInTable => itemInProp.toLowerCase() === itemInTable.toLowerCase())) :
			tableNames.filter(itemInTable => !propertyNames.some(iitemInProp => itemInTable.toLowerCase() === iitemInProp.toLocaleLowerCase() ));

			console.log(`this is the diff ${diffValue}`);

		 //Altertable based on the value
		 // if  difvluae is already in the table, delete the table -> before to doing it, it should be backe uped.

		 //add column CacheCacheStatus,CacheReserveUsed,CacheTieredFill

		 

         //due to no such table: Postlog",

		 /* let matchedValues = {};

		 for (let key of diffValue) {
			if (key in httpRequest) {
			  matchedValues[key] = httpRequest[key];
			}
		  }
		  
		  console.log(Object.values(matchedValues)) // type of the field
		  let logtype = Object.values(matchedValues)
		  console.log(`logtype ${logtype[0]}`)  */


	  /*
		for (let i = 0; i < diffValue.length; i++ ) {
		let test = `ALTER TABLE Postlog ADD COLUMN ${diffValue[i]} TEXT`; // need to get the field for tyep
		//console.log(test)
		const info = await env.DB.prepare(test).run();
		console.log(diffValue[i]);
		   // let a = diffValue[i];
			//const info = await env.DB.prepare('ALTER TABLE Postlog ADD COLUMN ?1 ?2').bind(a, "TEXT").run();  //string = varchar and int etc need to thi
			console.log(info);
		  }  */

		  /* need to write SQl to drope the the coulm when the number is lawer than the actual tabke but not sure if  we need, 
		  or from scrtach we shuold have the table that has all coulmn
         */

	//	};

		const logObjects = logdata.trim().split('\n').map(JSON.parse); // no need to parse?
		  let i = 0;
		  let responses = [];
		   for (const obj of logObjects) {
			 
			 i ++;
			 console.log(`${i}回目`)
	         console.log(`That's ${JSON.stringify(obj)}`)
			 //  const { RayID, ClientIP, EdgeStartTimestamp } = obj;
			/* const processedObj = Object.fromEntries(
				Object.entries(obj).map(([key, value]) => [key, value !== undefined ? value : null])
			  ); */

			//console.log(JSON.stringify(processedObj));
			  
			 let {
				CacheCacheStatus,
				CacheReserveUsed,
				CacheResponseBytes,
				CacheResponseStatus,
				CacheTieredFill,
				ClientASN,
				ClientCountry,
				ClientDeviceType,
				ClientIP,
				ClientIPClass,
				ClientMTLSAuthCertFingerprint,
				ClientMTLSAuthStatus,
				ClientRegionCode,
				ClientRequestBytes,
				ClientRequestHost,
				ClientRequestMethod,
				ClientRequestPath,
				ClientRequestProtocol,
				ClientRequestReferer,
				ClientRequestScheme,
				ClientRequestSource,
				ClientRequestURI,
				ClientRequestUserAgent,
				ClientSSLCipher,
				ClientSSLProtocol,
				ClientSrcPort,
				ClientTCPRTTMs,
				ClientXRequestedWith,
				ContentScanObjResults,
				ContentScanObjTypes,
				Cookies,
				EdgeCFConnectingO2O,
				EdgeColoCode,
				EdgeColoID,
				EdgeEndTimestamp,
				EdgePathingOp,
				EdgePathingSrc,
				EdgePathingStatus,
				EdgeRequestHost,
				EdgeResponseBodyBytes,
				EdgeResponseBytes,
				EdgeResponseCompressionRatio,
				EdgeResponseContentType,
				EdgeResponseStatus,
				EdgeServerIP,
				EdgeStartTimestamp,
				EdgeTimeToFirstByteMs,
				LeakedCredentialCheckResult,
				OriginDNSResponseTimeMs,
				OriginIP,
				OriginRequestHeaderSendDurationMs,
				OriginResponseBytes,
				OriginResponseDurationMs,
				OriginResponseHTTPExpires,
				OriginResponseHTTPLastModified,
				OriginResponseHeaderReceiveDurationMs,
				OriginResponseStatus,
				OriginResponseTime,
				OriginSSLProtocol,
				OriginTCPHandshakeDurationMs,
				OriginTLSHandshakeDurationMs,
				ParentRayID,
				RayID,
				RequestHeaders,
				ResponseHeaders,
				SecurityAction,
				SecurityActions,
				SecurityRuleDescription,
				SecurityRuleID,
				SecurityRuleIDs,
				SecuritySources,
				SmartRouteColoID,
				UpperTierColoID,
				WAFAttackScore,
				WAFFlags,
				WAFMatchedVar,
				WAFRCEAttackScore,
				WAFSQLiAttackScore,
				WAFXSSAttackScore,
				WorkerCPUTime,
				WorkerStatus,
				WorkerSubrequest,
				WorkerSubrequestCount,
				WorkerWallTimeUs,
				ZoneName
			  } = obj;

			  [CacheCacheStatus, CacheResponseBytes, CacheResponseStatus, ClientASN, ClientCountry, ClientDeviceType, ClientIP, ClientIPClass, ClientMTLSAuthCertFingerprint, ClientMTLSAuthStatus, ClientRegionCode, ClientRequestBytes, ClientRequestHost, ClientRequestMethod, ClientRequestPath, ClientRequestProtocol, ClientRequestReferer, ClientRequestScheme, ClientRequestSource, ClientRequestURI, ClientRequestUserAgent, ClientSSLCipher, ClientSSLProtocol, ClientSrcPort, ClientTCPRTTMs, ClientXRequestedWith, ContentScanObjResults, ContentScanObjTypes, Cookies, EdgeColoCode, EdgeColoID, EdgeEndTimestamp, EdgePathingOp, EdgePathingSrc, EdgePathingStatus, EdgeRequestHost, EdgeResponseBodyBytes, EdgeResponseBytes, EdgeResponseCompressionRatio, EdgeResponseContentType, EdgeResponseStatus, EdgeServerIP, EdgeStartTimestamp, EdgeTimeToFirstByteMs, LeakedCredentialCheckResult, OriginDNSResponseTimeMs, OriginIP, OriginRequestHeaderSendDurationMs, OriginResponseBytes, OriginResponseDurationMs, OriginResponseHTTPExpires, OriginResponseHTTPLastModified, OriginResponseHeaderReceiveDurationMs, OriginResponseStatus, OriginResponseTime, OriginSSLProtocol, OriginTCPHandshakeDurationMs, OriginTLSHandshakeDurationMs, ParentRayID, RayID, RequestHeaders, ResponseHeaders, SecurityAction, SecurityActions, SecurityRuleDescription, SecurityRuleID, SecurityRuleIDs, SecuritySources, SmartRouteColoID, UpperTierColoID, WAFAttackScore, WAFFlags, WAFMatchedVar, WAFRCEAttackScore, WAFSQLiAttackScore, WAFXSSAttackScore, WorkerCPUTime, WorkerStatus, WorkerSubrequestCount, WorkerWallTimeUs, ZoneName] = 
			  [CacheCacheStatus, CacheResponseBytes, CacheResponseStatus, ClientASN, ClientCountry, ClientDeviceType, ClientIP, ClientIPClass, ClientMTLSAuthCertFingerprint, ClientMTLSAuthStatus, ClientRegionCode, ClientRequestBytes, ClientRequestHost, ClientRequestMethod, ClientRequestPath, ClientRequestProtocol, ClientRequestReferer, ClientRequestScheme, ClientRequestSource, ClientRequestURI, ClientRequestUserAgent, ClientSSLCipher, ClientSSLProtocol, ClientSrcPort, ClientTCPRTTMs, ClientXRequestedWith, ContentScanObjResults, ContentScanObjTypes, Cookies, EdgeColoCode, EdgeColoID, EdgeEndTimestamp, EdgePathingOp, EdgePathingSrc, EdgePathingStatus, EdgeRequestHost, EdgeResponseBodyBytes, EdgeResponseBytes, EdgeResponseCompressionRatio, EdgeResponseContentType, EdgeResponseStatus, EdgeServerIP, EdgeStartTimestamp, EdgeTimeToFirstByteMs, LeakedCredentialCheckResult, OriginDNSResponseTimeMs, OriginIP, OriginRequestHeaderSendDurationMs, OriginResponseBytes, OriginResponseDurationMs, OriginResponseHTTPExpires, OriginResponseHTTPLastModified, OriginResponseHeaderReceiveDurationMs, OriginResponseStatus, OriginResponseTime, OriginSSLProtocol, OriginTCPHandshakeDurationMs, OriginTLSHandshakeDurationMs, ParentRayID, RayID, RequestHeaders, ResponseHeaders, SecurityAction, SecurityActions, SecurityRuleDescription, SecurityRuleID, SecurityRuleIDs, SecuritySources, SmartRouteColoID, UpperTierColoID, WAFAttackScore, WAFFlags, WAFMatchedVar, WAFRCEAttackScore, WAFSQLiAttackScore, WAFXSSAttackScore, WorkerCPUTime, WorkerStatus, WorkerSubrequestCount, WorkerWallTimeUs, ZoneName].map(v => v === undefined ? null : v);

			   console.log(`RayId: ${RayID}, ClientIP: ${ClientIP}, time: ${EdgeStartTimestamp},  cache ${CacheReserveUsed} ,WorkerCPUTime ${WorkerCPUTime}`)

			   const convertedCacheReserveUsed = CacheReserveUsed === "true" ? 1 : 0; 
			   console.log(convertedCacheReserveUsed)
			   const convertedCacheTieredFill = CacheTieredFill === "true" ? 1 : 0;
			   console.log(convertedCacheTieredFill)
			   const convertedEdgeCFConnectingO2O = EdgeCFConnectingO2O === "true" ? 1 : 0;
			   console.log(convertedEdgeCFConnectingO2O)
			   const convertedWorkerSubrequest = WorkerSubrequest === "true" ? 1 : 0;
			   console.log(convertedWorkerSubrequest)
			  
			   
			  // let insetValue = 'INSERT INTO http_requests (CacheCacheStatus,CacheReserveUsed,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN,ClientCountry,ClientDeviceType,ClientIP,ClientIPClass,ClientMTLSAuthCertFingerprint,ClientMTLSAuthStatus,ClientRegionCode,ClientRequestBytes,ClientRequestHost,ClientRequestMethod,ClientRequestPath,ClientRequestProtocol,ClientRequestReferer,ClientRequestScheme,ClientRequestSource,ClientRequestURI,ClientRequestUserAgent,ClientSSLCipher,ClientSSLProtocol,ClientSrcPort,ClientTCPRTTMs,ClientXRequestedWith,ContentScanObjResults,ContentScanObjTypes,Cookies,EdgeCFConnectingO2O,EdgeColoCode,EdgeColoID,EdgeEndTimestamp,EdgePathingOp,EdgePathingSrc,EdgePathingStatus,EdgeRequestHost,EdgeResponseBodyBytes,EdgeResponseBytes,EdgeResponseCompressionRatio,EdgeResponseContentType,EdgeResponseStatus,EdgeServerIP,EdgeStartTimestamp,EdgeTimeToFirstByteMs,LeakedCredentialCheckResult,OriginDNSResponseTimeMs,OriginIP,OriginRequestHeaderSendDurationMs,OriginResponseBytes,OriginResponseDurationMs,OriginResponseHTTPExpires,OriginResponseHTTPLastModified,OriginResponseHeaderReceiveDurationMs,OriginResponseStatus,OriginResponseTime,OriginSSLProtocol,OriginTCPHandshakeDurationMs,OriginTLSHandshakeDurationMs,ParentRayID,RayID,RequestHeaders,ResponseHeaders,SecurityAction,SecurityActions,SecurityRuleDescription,SecurityRuleID,SecurityRuleIDs,SecuritySources,SmartRouteColoID,UpperTierColoID,WAFAttackScore,WAFFlags,WAFMatchedVar,WAFRCEAttackScore,WAFSQLiAttackScore,WAFXSSAttackScore,WorkerCPUTime,WorkerStatus,WorkerSubrequest,WorkerSubrequestCount,WorkerWallTimeUs,ZoneName) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
			  // const { success } = await env.DB.prepare(insetValue).bind(CacheCacheStatus,CacheReserveUsed,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN,ClientCountry,ClientDeviceType,ClientIP,ClientIPClass,ClientMTLSAuthCertFingerprint,ClientMTLSAuthStatus,ClientRegionCode,ClientRequestBytes,ClientRequestHost,ClientRequestMethod,ClientRequestPath,ClientRequestProtocol,ClientRequestReferer,ClientRequestScheme,ClientRequestSource,ClientRequestURI,ClientRequestUserAgent,ClientSSLCipher,ClientSSLProtocol,ClientSrcPort,ClientTCPRTTMs,ClientXRequestedWith,ContentScanObjResults,ContentScanObjTypes,Cookies,EdgeCFConnectingO2O,EdgeColoCode,EdgeColoID,EdgeEndTimestamp,EdgePathingOp,EdgePathingSrc,EdgePathingStatus,EdgeRequestHost,EdgeResponseBodyBytes,EdgeResponseBytes,EdgeResponseCompressionRatio,EdgeResponseContentType,EdgeResponseStatus,EdgeServerIP,EdgeStartTimestamp,EdgeTimeToFirstByteMs,LeakedCredentialCheckResult,OriginDNSResponseTimeMs,OriginIP,OriginRequestHeaderSendDurationMs,OriginResponseBytes,OriginResponseDurationMs,OriginResponseHTTPExpires,OriginResponseHTTPLastModified,OriginResponseHeaderReceiveDurationMs,OriginResponseStatus,OriginResponseTime,OriginSSLProtocol,OriginTCPHandshakeDurationMs,OriginTLSHandshakeDurationMs,ParentRayID,RayID,RequestHeaders,ResponseHeaders,SecurityAction,SecurityActions,SecurityRuleDescription,SecurityRuleID,SecurityRuleIDs,SecuritySources,SmartRouteColoID,UpperTierColoID,WAFAttackScore,WAFFlags,WAFMatchedVar,WAFRCEAttackScore,WAFSQLiAttackScore,WAFXSSAttackScore,WorkerCPUTime,WorkerStatus,WorkerSubrequest,WorkerSubrequestCount,WorkerWallTimeUs,ZoneName).run()
			  
			  /*let insertCache = 'INSERT INTO http_requests_cache (CacheCacheStatus, CacheReserveUsed, CacheResponseBytes, CacheResponseStatus, CacheTieredFill) VALUES (?, ?, ?, ?, ?);'
			  let insertCleint = 'INSERT INTO http_requests_client (ClientASN, ClientCountry, ClientDeviceType, ClientIP, ClientIPClass, ClientMTLSAuthCertFingerprint, ClientMTLSAuthStatus, ClientRegionCode, ClientRequestBytes, ClientRequestHost, ClientRequestMethod, ClientRequestPath, ClientRequestProtocol, ClientRequestReferer, ClientRequestScheme, ClientRequestSource, ClientRequestURI, ClientRequestUserAgent, ClientSSLCipher, ClientSSLProtocol, ClientSrcPort, ClientTCPRTTMs, ClientXRequestedWith) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
			  let insertEdge = 'INSERT INTO http_requests_edge (EdgeCFConnectingO2O, EdgeColoCode, EdgeColoID, EdgeEndTimestamp, EdgePathingOp, EdgePathingSrc, EdgePathingStatus, EdgeRequestHost, EdgeResponseBodyBytes, EdgeResponseBytes, EdgeResponseCompressionRatio, EdgeResponseContentType, EdgeResponseStatus, EdgeServerIP, EdgeStartTimestamp, EdgeTimeToFirstByteMs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
			  let insertOrigin = 'INSERT INTO http_requests_origin (OriginDNSResponseTimeMs, OriginIP, OriginRequestHeaderSendDurationMs, OriginResponseBytes, OriginResponseDurationMs, OriginResponseHTTPExpires, OriginResponseHTTPLastModified, OriginResponseHeaderReceiveDurationMs, OriginResponseStatus, OriginResponseTime, OriginSSLProtocol, OriginTCPHandshakeDurationMs, OriginTLSHandshakeDurationMs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
			  let insertWaf = 'INSERT INTO http_requests_waf (WAFAttackScore, WAFFlags, WAFMatchedVar, WAFRCEAttackScore, WAFSQLiAttackScore, WAFXSSAttackScore) VALUES (?, ?, ?, ?, ?, ?);'
			  let insertWorer = 'INSERT INTO http_requests_worker (WorkerCPUTime, WorkerStatus, WorkerSubrequest, WorkerSubrequestCount, WorkerWallTimeUs) VALUES (?, ?, ?, ?, ?);'
			  let insertgeneral = 'INSERT INTO http_requests_general (ContentScanObjResults, ContentScanObjTypes, Cookies, LeakedCredentialCheckResult, ParentRayID, RayID, RequestHeaders, ResponseHeaders, SecurityAction, SecurityActions, SecurityRuleDescription, SecurityRuleID, SecurityRuleIDs, SecuritySources, SmartRouteColoID, UpperTierColoID, ZoneName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
			  */

			  let insertCache = 'INSERT INTO http_requests_cache (CacheCacheStatus, CacheReserveUsed, CacheResponseBytes, CacheResponseStatus, CacheTieredFill, EdgeStartTimestamp) VALUES (?, ?, ?, ?, ?, ?);'
			  let insertCleint = 'INSERT INTO http_requests_client (ClientASN, ClientCountry, ClientDeviceType, ClientIP, ClientIPClass, ClientMTLSAuthCertFingerprint, ClientMTLSAuthStatus, ClientRegionCode, ClientRequestBytes, ClientRequestHost, ClientRequestMethod, ClientRequestPath, ClientRequestProtocol, ClientRequestReferer, ClientRequestScheme, ClientRequestSource, ClientRequestURI, ClientRequestUserAgent, ClientSSLCipher, ClientSSLProtocol, ClientSrcPort, ClientTCPRTTMs, ClientXRequestedWith, EdgeStartTimestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
			  let insertEdge = 'INSERT INTO http_requests_edge (EdgeCFConnectingO2O, EdgeColoCode, EdgeColoID, EdgeEndTimestamp, EdgePathingOp, EdgePathingSrc, EdgePathingStatus, EdgeRequestHost, EdgeResponseBodyBytes, EdgeResponseBytes, EdgeResponseCompressionRatio, EdgeResponseContentType, EdgeResponseStatus, EdgeServerIP, EdgeStartTimestamp, EdgeTimeToFirstByteMs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
			  let insertOrigin = 'INSERT INTO http_requests_origin (OriginDNSResponseTimeMs, OriginIP, OriginRequestHeaderSendDurationMs, OriginResponseBytes, OriginResponseDurationMs, OriginResponseHTTPExpires, OriginResponseHTTPLastModified, OriginResponseHeaderReceiveDurationMs, OriginResponseStatus, OriginResponseTime, OriginSSLProtocol, OriginTCPHandshakeDurationMs, OriginTLSHandshakeDurationMs, EdgeStartTimestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
			  let insertWaf = 'INSERT INTO http_requests_waf (WAFAttackScore, WAFFlags, WAFMatchedVar, WAFRCEAttackScore, WAFSQLiAttackScore, WAFXSSAttackScore, EdgeStartTimestamp) VALUES (?, ?, ?, ?, ?, ?, ?);'
			  let insertWorer = 'INSERT INTO http_requests_worker (WorkerCPUTime, WorkerStatus, WorkerSubrequest, WorkerSubrequestCount, WorkerWallTimeUs, EdgeStartTimestamp) VALUES (?, ?, ?, ?, ?, ?);'
			  let insertgeneral = 'INSERT INTO http_requests_general (ContentScanObjResults, ContentScanObjTypes, Cookies, LeakedCredentialCheckResult, ParentRayID, RayID, RequestHeaders, ResponseHeaders, SecurityAction, SecurityActions, SecurityRuleDescription, SecurityRuleID, SecurityRuleIDs, SecuritySources, SmartRouteColoID, UpperTierColoID, EdgeStartTimestamp, ZoneName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
			 
			 
			 // const { success } = await env.DB.prepare(insetValue).bind(CacheCacheStatus,convertedCacheReserveUsed,CacheResponseBytes,CacheResponseStatus,convertedCacheTieredFill,ClientASN,ClientCountry,ClientDeviceType,ClientIP,ClientIPClass,ClientMTLSAuthCertFingerprint,ClientMTLSAuthStatus,ClientRegionCode,ClientRequestBytes,ClientRequestHost,ClientRequestMethod,ClientRequestPath,ClientRequestProtocol,ClientRequestReferer,ClientRequestScheme,ClientRequestSource,ClientRequestURI,ClientRequestUserAgent,ClientSSLCipher,ClientSSLProtocol,ClientSrcPort,ClientTCPRTTMs,ClientXRequestedWith,ContentScanObjResults,ContentScanObjTypes,Cookies,convertedEdgeCFConnectingO2O,EdgeColoCode,EdgeColoID,EdgeEndTimestamp,EdgePathingOp,EdgePathingSrc,EdgePathingStatus,EdgeRequestHost,EdgeResponseBodyBytes,EdgeResponseBytes,EdgeResponseCompressionRatio,EdgeResponseContentType,EdgeResponseStatus,EdgeServerIP,EdgeStartTimestamp,EdgeTimeToFirstByteMs,LeakedCredentialCheckResult,OriginDNSResponseTimeMs,OriginIP,OriginRequestHeaderSendDurationMs,OriginResponseBytes,OriginResponseDurationMs,OriginResponseHTTPExpires,OriginResponseHTTPLastModified,OriginResponseHeaderReceiveDurationMs,OriginResponseStatus,OriginResponseTime,OriginSSLProtocol,OriginTCPHandshakeDurationMs,OriginTLSHandshakeDurationMs,ParentRayID,RayID,RequestHeaders,ResponseHeaders,SecurityAction,SecurityActions,SecurityRuleDescription,SecurityRuleID,SecurityRuleIDs,SecuritySources,SmartRouteColoID,UpperTierColoID,WAFAttackScore,WAFFlags,WAFMatchedVar,WAFRCEAttackScore,WAFSQLiAttackScore,WAFXSSAttackScore,WorkerCPUTime,WorkerStatus,convertedWorkerSubrequest,WorkerSubrequestCount,WorkerWallTimeUs,ZoneName).run()
			//const { success } = await env.DB.prepare(insetValue).bind(RayID, ClientIP, EdgeStartTimestamp).run()

			const { success } = await env.DB.batch([
				env.DB.prepare(insertCache).bind( CacheCacheStatus, convertedCacheReserveUsed, CacheResponseBytes, CacheResponseStatus, convertedCacheTieredFill, EdgeStartTimestamp ),
				env.DB.prepare(insertCleint).bind( ClientASN, ClientCountry, ClientDeviceType, ClientIP, ClientIPClass, ClientMTLSAuthCertFingerprint, ClientMTLSAuthStatus, ClientRegionCode, ClientRequestBytes, ClientRequestHost, ClientRequestMethod, ClientRequestPath, ClientRequestProtocol, ClientRequestReferer, ClientRequestScheme, ClientRequestSource, ClientRequestURI, ClientRequestUserAgent, ClientSSLCipher, ClientSSLProtocol, ClientSrcPort, ClientTCPRTTMs, ClientXRequestedWith,EdgeStartTimestamp ),
				env.DB.prepare(insertEdge).bind( convertedEdgeCFConnectingO2O, EdgeColoCode, EdgeColoID, EdgeEndTimestamp, EdgePathingOp, EdgePathingSrc, EdgePathingStatus, EdgeRequestHost, EdgeResponseBodyBytes, EdgeResponseBytes, EdgeResponseCompressionRatio, EdgeResponseContentType, EdgeResponseStatus, EdgeServerIP, EdgeStartTimestamp, EdgeTimeToFirstByteMs),
				env.DB.prepare(insertOrigin).bind( OriginDNSResponseTimeMs, OriginIP, OriginRequestHeaderSendDurationMs, OriginResponseBytes, OriginResponseDurationMs, OriginResponseHTTPExpires, OriginResponseHTTPLastModified, OriginResponseHeaderReceiveDurationMs, OriginResponseStatus, OriginResponseTime, OriginSSLProtocol, OriginTCPHandshakeDurationMs, OriginTLSHandshakeDurationMs, EdgeStartTimestamp ),
				env.DB.prepare(insertWaf).bind( WAFAttackScore, WAFFlags, WAFMatchedVar, WAFRCEAttackScore, WAFSQLiAttackScore, WAFXSSAttackScore, EdgeStartTimestamp  ),
				env.DB.prepare(insertWorer).bind( WorkerCPUTime, WorkerStatus, convertedWorkerSubrequest, WorkerSubrequestCount, WorkerWallTimeUs, EdgeStartTimestamp ),
				env.DB.prepare(insertgeneral).bind( ContentScanObjResults, ContentScanObjTypes, Cookies, LeakedCredentialCheckResult, ParentRayID, RayID, RequestHeaders, ResponseHeaders, SecurityAction, SecurityActions, SecurityRuleDescription, SecurityRuleID, SecurityRuleIDs, SecuritySources, SmartRouteColoID, UpperTierColoID, EdgeStartTimestamp, ZoneName ),
			]);



			   if (success) {
				   console.log('success')
			   	const myOptions = { status: 200, statusText: "SuperSmashingGreat!" };
    			responses.push(new Response(myOptions));
			  //  return flag = 1
				   
				 } else {
				   console.log('false')
				const myOptions = { status: 500, statusText: "No" };
				responses.push(new Response(myOptions));
				 }
		   }

		   const allSuccess = responses.every(response => response.status === 200);

		   if (allSuccess) {
			 return responses[0]; // or return new Response("All successful");
		   } else {
			 return responses[responses.length - 1]; // or return new Response("At least one failed");
		   }
	
		   } else if (request.method === "GET") {
			   return new Response("The request was a GET")
		   }
	}
}



/* const handler: ExportedHandler = {
	async fetch(request: Request) {
		function rawHtmlResponse(html) {
			return new Response(html, {
				headers: {
					"content-type": "text/html;charset=UTF-8",
				},
			});
		}
*/

/*		async function readRequestbody(request: Request) {
			const contentType = request.headers.get("content-type");
			if (contentType.includes("application/json")) {
				return request.text();
			} else if (contentType.includes("text/html")) {
				return request.text();
			} else if (contentType.includes("form")) {
				const formData = await request.formData();
				const body = {};
				for (const entry of formData.entries()) {
					body[entry[0]] = entry[1];
				}
				return JSON.stringify(body);
			} else {
				return "a file"
			}
		}

	*/
/*		const { url } = request;
		if (url.includes("form")) {
			return rawHtmlResponse(someForm);
		}
		if (request.method === "POST") {
			//const reqBody = await readRequestbody(request);
			const buf = await request.arrayBuffer();

			const compressed = new Uint8Array(buf);
		    const enc = new TextDecoder("utf-8");

			const decompressed = decompressSync(compressed);
			const logdata = enc.decode(decompressed)
			//const retBody = `The request body sent in was ${enc.decode(decompressed)}`;
		    const logObjects = logdata.trim().split('\n').map(JSON.parse);


			
		


			//console.log(logdata);
			//return new Response(retBody);
		} else if (request.method === "GET") {
			return new Response("The request was a GET")
		}
	},
};

export default handler; */
