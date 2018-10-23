USE RevolvingFourDB
GO

IF OBJECT_ID ('dbo.uspGetAllGames', 'P') IS NOT NULL
	DROP PROCEDURE dbo.uspGetAllGames;
GO

CREATE PROCEDURE dbo.uspGetAllGames
AS
	SET NOCOUNT ON;
	SELECT *
	FROM dbo.RevolvingFourGames
	ORDER BY Last_Move_Date
	OFFSET 15 ROWS
	FETCH NEXT 10 ROWS ONLY;
GO

IF OBJECT_ID ('dbo.uspCountAllGames', 'P') IS NOT NULL
	DROP PROCEDURE dbo.uspCountAllGames;
GO

CREATE PROCEDURE dbo.uspCountAllGames (@retval int output)				
AS
	SET NOCOUNT ON;
	SELECT @retval = Count(*)
	FROM dbo.RevolvingFourGames;
GO