CREATE TABLE new_http_requests_cache (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    InsertDate TIMESTAMP DEFAULT(DATETIME('now', 'localtime')),
    CacheCacheStatus TEXT,
    CacheReserveUsed BOOLEAN,
    CacheResponseBytes INTEGER,
    CacheResponseStatus INTEGER,
    CacheTieredFill BOOLEAN
);

