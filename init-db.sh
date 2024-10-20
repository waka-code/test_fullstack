#!/bin/bash
set -e

# Esperar a que el servidor SQL esté disponible
echo "Esperando a que SQL Server esté disponible..."
sleep 30s

# Crear la base de datos Test
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "29051997" -d master -Q "CREATE DATABASE ProductosTest"

# Crear tablas en la base de datos Test
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "29051997" -d ProductosTest -Q "
CREATE TABLE [dbo].[Products] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [Name] NVARCHAR(20) NOT NULL,
    [Description] NVARCHAR(100) NULL,
    [Stock] NVARCHAR(20) NOT NULL,
    [Price] DECIMAL(18,2) NOT NULL,
    [CreationDate] DATETIME NOT NULL DEFAULT GETDATE(),
    [LastUpdate] DATETIME NULL
);

CREATE TABLE [dbo].[Users] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [Name] NVARCHAR(20) NOT NULL,
    [Password] NVARCHAR(100) NOT NULL,
    [Email] NVARCHAR(100) NOT NULL,
    [Role] NVARCHAR(20) NOT NULL
);
"

echo "Base de datos y tablas creadas con éxito."
