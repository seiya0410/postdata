CREATE TABLE http_requests_edge (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    InsertDate TIMESTAMP DEFAULT(DATETIME('now', 'localtime')),
    EdgeCFConnectingO2O BOOLEAN,
    EdgeColoCode TEXT,
    EdgeColoID INTEGER,
    EdgeEndTimestamp TEXT,
    EdgePathingOp TEXT,
    EdgePathingSrc TEXT,
    EdgePathingStatus TEXT,
    EdgeRequestHost TEXT,
    EdgeResponseBodyBytes INTEGER,
    EdgeResponseBytes INTEGER,
    EdgeResponseCompressionRatio REAL,
    EdgeResponseContentType TEXT,
    EdgeResponseStatus INTEGER,
    EdgeServerIP TEXT,
    EdgeStartTimestamp TEXT,
    EdgeTimeToFirstByteMs INTEGER
);

CREATE TABLE http_requests_general (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    InsertDate TIMESTAMP DEFAULT(DATETIME('now', 'localtime')),
    ContentScanObjResults TEXT,
    ContentScanObjTypes TEXT,
    Cookies TEXT,
    LeakedCredentialCheckResult TEXT,
    ParentRayID TEXT,
    RayID TEXT,
    RequestHeaders TEXT,
    ResponseHeaders TEXT,
    SecurityAction TEXT,
    SecurityActions TEXT,
    SecurityRuleDescription TEXT,
    SecurityRuleID TEXT,
    SecurityRuleIDs TEXT,
    SecuritySources TEXT,
    SmartRouteColoID INTEGER,
    UpperTierColoID INTEGER,
    ZoneName TEXT
);

CREATE TABLE http_requests_worker (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    InsertDate TIMESTAMP DEFAULT(DATETIME('now', 'localtime')),
    WorkerCPUTime INTEGER,
    WorkerStatus TEXT,
    WorkerSubrequest BOOLEAN,
    WorkerSubrequestCount INTEGER,
    WorkerWallTimeUs INTEGER
);

CREATE TABLE http_requests_waf (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    InsertDate TIMESTAMP DEFAULT(DATETIME('now', 'localtime')),
    WAFAttackScore INTEGER,
    WAFFlags TEXT,
    WAFMatchedVar TEXT,
    WAFRCEAttackScore INTEGER,
    WAFSQLiAttackScore INTEGER,
    WAFXSSAttackScore INTEGER
);

CREATE TABLE http_requests_origin (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    InsertDate TIMESTAMP DEFAULT(DATETIME('now', 'localtime')),
    OriginDNSResponseTimeMs INTEGER,
    OriginIP TEXT,
    OriginRequestHeaderSendDurationMs INTEGER,
    OriginResponseBytes INTEGER,
    OriginResponseDurationMs INTEGER,
    OriginResponseHTTPExpires TEXT,
    OriginResponseHTTPLastModified TEXT,
    OriginResponseHeaderReceiveDurationMs INTEGER,
    OriginResponseStatus INTEGER,
    OriginResponseTime INTEGER,
    OriginSSLProtocol TEXT,
    OriginTCPHandshakeDurationMs INTEGER,
    OriginTLSHandshakeDurationMs INTEGER
);

CREATE TABLE http_requests_client (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    InsertDate TIMESTAMP DEFAULT(DATETIME('now', 'localtime')),
    ClientASN INTEGER,
    ClientCountry TEXT,
    ClientDeviceType TEXT,
    ClientIP TEXT,
    ClientIPClass TEXT,
    ClientMTLSAuthCertFingerprint TEXT,
    ClientMTLSAuthStatus TEXT,
    ClientRegionCode TEXT,
    ClientRequestBytes INTEGER,
    ClientRequestHost TEXT,
    ClientRequestMethod TEXT,
    ClientRequestPath TEXT,
    ClientRequestProtocol TEXT,
    ClientRequestReferer TEXT,
    ClientRequestScheme TEXT,
    ClientRequestSource TEXT,
    ClientRequestURI TEXT,
    ClientRequestUserAgent TEXT,
    ClientSSLCipher TEXT,
    ClientSSLProtocol TEXT,
    ClientSrcPort INTEGER,
    ClientTCPRTTMs INTEGER,
    ClientXRequestedWith TEXT
);

CREATE TABLE http_requests_cache (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    InsertDate TIMESTAMP DEFAULT(DATETIME('now', 'localtime')),
    CacheCacheStatus TEXT,
    CacheReserveUsed BOOLEAN,
    CacheResponseBytes INTEGER,
    CacheResponseStatus INTEGER,
    CacheTieredFill BOOLEAN
);