DROP TABLE IF EXISTS Postlog;
CREATE TABLE IF NOT EXISTS Postlog ( InsertDate TIMESTAMP DEFAULT(DATETIME('now', 'localtime')), RayId VARCHAR(50), ClientIP VARCHAR(50), EdgeStartTimestamp VARCHAR(100) );



