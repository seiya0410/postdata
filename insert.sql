INSERT INTO new_http_requests_cache (ID, InsertDate, CacheCacheStatus, CacheReserveUsed, CacheResponseBytes, CacheResponseStatus, CacheTieredFill)
SELECT ID, InsertDate, CacheCacheStatus, CacheReserveUsed, CacheResponseBytes, CacheResponseStatus, CacheTieredFill FROM http_requests_cache;

