USE [master]
GO
/****** Object:  Database [JKR]    Script Date: 9/12/2023 10:01:35 PM ******/
CREATE DATABASE [JKR]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'JKR', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\JKR.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'JKR_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\JKR_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [JKR] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [JKR].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [JKR] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [JKR] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [JKR] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [JKR] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [JKR] SET ARITHABORT OFF 
GO
ALTER DATABASE [JKR] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [JKR] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [JKR] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [JKR] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [JKR] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [JKR] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [JKR] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [JKR] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [JKR] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [JKR] SET  ENABLE_BROKER 
GO
ALTER DATABASE [JKR] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [JKR] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [JKR] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [JKR] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [JKR] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [JKR] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [JKR] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [JKR] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [JKR] SET  MULTI_USER 
GO
ALTER DATABASE [JKR] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [JKR] SET DB_CHAINING OFF 
GO
ALTER DATABASE [JKR] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [JKR] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [JKR] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [JKR] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [JKR] SET QUERY_STORE = ON
GO
ALTER DATABASE [JKR] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [JKR]
GO
/****** Object:  Table [dbo].[categorias]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categorias](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[categoria] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comentarios]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comentarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[comentarios] [text] NULL,
	[comentarios_id] [int] NOT NULL,
	[productos_id] [int] NOT NULL,
	[usuarios_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[departamentos]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[departamentos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[descuento_estado]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[descuento_estado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[descuentos]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[descuentos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
	[fecha_inicio] [datetime] NULL,
	[fecha_final] [datetime] NULL,
	[precio_porcentual] [varchar](45) NULL,
	[descuentos_estado_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[detalle_factura]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detalle_factura](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[cantidad] [varchar](45) NULL,
	[productos_id] [int] NOT NULL,
	[factura_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[detalle_producto]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detalle_producto](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
	[valor] [varchar](45) NULL,
	[productos_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[empresas]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[empresas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[envio_estado]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[envio_estado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[envios]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[envios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[cod_ratreo] [varchar](45) NULL,
	[direccion] [varchar](45) NULL,
	[fecha_envio] [datetime] NULL,
	[fecha entrega] [datetime] NULL,
	[envios_estado_id] [int] NOT NULL,
	[empresa_id] [int] NOT NULL,
	[deparamento_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[factura_estado]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[factura_estado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[facturas]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[facturas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetime] NULL,
	[valor_compra] [float] NULL,
	[usuarios_id] [int] NOT NULL,
	[factura_estado_id] [int] NOT NULL,
	[envios_id] [int] NOT NULL,
	[numeroDocumento] [varchar](40) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[generos]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[generos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[genero] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[imagen_estado]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[imagen_estado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[imagenes]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[imagenes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[imagenes] [text] NULL,
	[imagenes_estado_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[marcas]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[marcas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[marca] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Menu]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Menu](
	[idMenu] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[icono] [varchar](50) NULL,
	[url] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[idMenu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MenuRol]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MenuRol](
	[idMenuRol] [int] IDENTITY(1,1) NOT NULL,
	[idMenu] [int] NULL,
	[idRol] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[idMenuRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NumeroDocumento]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NumeroDocumento](
	[idNumeroDocumento] [int] IDENTITY(1,1) NOT NULL,
	[ultimo_Numero] [int] NOT NULL,
	[fechaRegistro] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[idNumeroDocumento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[producto_estado]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[producto_estado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[productos]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[productos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
	[caracteristicas] [varchar](450) NULL,
	[precio] [float] NULL,
	[cantidad] [varchar](45) NULL,
	[marca_idmarca] [int] NOT NULL,
	[proveedor_id] [int] NOT NULL,
	[categorias_id] [int] NOT NULL,
	[productos_estado_id] [int] NOT NULL,
	[imagenes_id] [int] NOT NULL,
	[tipo_producto_id] [int] NOT NULL,
	[descuentos_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[proveedor_estado]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[proveedor_estado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[proveedores]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[proveedores](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[proveedor] [varchar](45) NULL,
	[proveedor_estado_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[rol] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipo_documento]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipo_documento](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tipo_documento] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipo_producto]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipo_producto](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuario_estado]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuario_estado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 9/12/2023 10:01:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](45) NULL,
	[apellidos] [varchar](45) NULL,
	[documento] [varchar](45) NULL,
	[correo] [varchar](125) NULL,
	[contrasena] [varchar](120) NULL,
	[numero_contacto] [int] NULL,
	[edad] [varchar](45) NULL,
	[direccion] [varchar](45) NULL,
	[usuario_estado_id] [int] NOT NULL,
	[genero_id] [int] NOT NULL,
	[tipo_documento_id] [int] NOT NULL,
	[rol_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[NumeroDocumento] ADD  DEFAULT (getdate()) FOR [fechaRegistro]
GO
ALTER TABLE [dbo].[comentarios]  WITH CHECK ADD  CONSTRAINT [fk_comentarios_comentarios] FOREIGN KEY([comentarios_id])
REFERENCES [dbo].[comentarios] ([id])
GO
ALTER TABLE [dbo].[comentarios] CHECK CONSTRAINT [fk_comentarios_comentarios]
GO
ALTER TABLE [dbo].[comentarios]  WITH CHECK ADD  CONSTRAINT [fk_comentarios_productos] FOREIGN KEY([productos_id])
REFERENCES [dbo].[productos] ([id])
GO
ALTER TABLE [dbo].[comentarios] CHECK CONSTRAINT [fk_comentarios_productos]
GO
ALTER TABLE [dbo].[comentarios]  WITH CHECK ADD  CONSTRAINT [fk_comentarios_usuarios] FOREIGN KEY([usuarios_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[comentarios] CHECK CONSTRAINT [fk_comentarios_usuarios]
GO
ALTER TABLE [dbo].[descuentos]  WITH CHECK ADD  CONSTRAINT [fk_descuentos_descuentos_estado] FOREIGN KEY([descuentos_estado_id])
REFERENCES [dbo].[descuento_estado] ([id])
GO
ALTER TABLE [dbo].[descuentos] CHECK CONSTRAINT [fk_descuentos_descuentos_estado]
GO
ALTER TABLE [dbo].[detalle_factura]  WITH CHECK ADD  CONSTRAINT [fk_detalle_factura] FOREIGN KEY([factura_id])
REFERENCES [dbo].[facturas] ([id])
GO
ALTER TABLE [dbo].[detalle_factura] CHECK CONSTRAINT [fk_detalle_factura]
GO
ALTER TABLE [dbo].[detalle_factura]  WITH CHECK ADD  CONSTRAINT [fk_detalle_productos] FOREIGN KEY([productos_id])
REFERENCES [dbo].[productos] ([id])
GO
ALTER TABLE [dbo].[detalle_factura] CHECK CONSTRAINT [fk_detalle_productos]
GO
ALTER TABLE [dbo].[detalle_producto]  WITH CHECK ADD  CONSTRAINT [fk_detalle_producto_productos] FOREIGN KEY([productos_id])
REFERENCES [dbo].[productos] ([id])
GO
ALTER TABLE [dbo].[detalle_producto] CHECK CONSTRAINT [fk_detalle_producto_productos]
GO
ALTER TABLE [dbo].[envios]  WITH CHECK ADD  CONSTRAINT [fk_envios_deparamento] FOREIGN KEY([deparamento_id])
REFERENCES [dbo].[departamentos] ([id])
GO
ALTER TABLE [dbo].[envios] CHECK CONSTRAINT [fk_envios_deparamento]
GO
ALTER TABLE [dbo].[envios]  WITH CHECK ADD  CONSTRAINT [fk_envios_empresa] FOREIGN KEY([empresa_id])
REFERENCES [dbo].[empresas] ([id])
GO
ALTER TABLE [dbo].[envios] CHECK CONSTRAINT [fk_envios_empresa]
GO
ALTER TABLE [dbo].[envios]  WITH CHECK ADD  CONSTRAINT [fk_envios_envios_estado] FOREIGN KEY([envios_estado_id])
REFERENCES [dbo].[envio_estado] ([id])
GO
ALTER TABLE [dbo].[envios] CHECK CONSTRAINT [fk_envios_envios_estado]
GO
ALTER TABLE [dbo].[facturas]  WITH CHECK ADD  CONSTRAINT [fk_factura_envios] FOREIGN KEY([envios_id])
REFERENCES [dbo].[envios] ([id])
GO
ALTER TABLE [dbo].[facturas] CHECK CONSTRAINT [fk_factura_envios]
GO
ALTER TABLE [dbo].[facturas]  WITH CHECK ADD  CONSTRAINT [fk_factura_factura_estado] FOREIGN KEY([factura_estado_id])
REFERENCES [dbo].[factura_estado] ([id])
GO
ALTER TABLE [dbo].[facturas] CHECK CONSTRAINT [fk_factura_factura_estado]
GO
ALTER TABLE [dbo].[facturas]  WITH CHECK ADD  CONSTRAINT [fk_factura_usuarios] FOREIGN KEY([usuarios_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[facturas] CHECK CONSTRAINT [fk_factura_usuarios]
GO
ALTER TABLE [dbo].[imagenes]  WITH CHECK ADD  CONSTRAINT [fk_imagenes_imagenes_estado] FOREIGN KEY([imagenes_estado_id])
REFERENCES [dbo].[imagen_estado] ([id])
GO
ALTER TABLE [dbo].[imagenes] CHECK CONSTRAINT [fk_imagenes_imagenes_estado]
GO
ALTER TABLE [dbo].[MenuRol]  WITH CHECK ADD FOREIGN KEY([idMenu])
REFERENCES [dbo].[Menu] ([idMenu])
GO
ALTER TABLE [dbo].[MenuRol]  WITH CHECK ADD FOREIGN KEY([idRol])
REFERENCES [dbo].[roles] ([id])
GO
ALTER TABLE [dbo].[productos]  WITH CHECK ADD  CONSTRAINT [fk_productos_categorias] FOREIGN KEY([categorias_id])
REFERENCES [dbo].[categorias] ([id])
GO
ALTER TABLE [dbo].[productos] CHECK CONSTRAINT [fk_productos_categorias]
GO
ALTER TABLE [dbo].[productos]  WITH CHECK ADD  CONSTRAINT [fk_productos_descuentos] FOREIGN KEY([descuentos_id])
REFERENCES [dbo].[descuentos] ([id])
GO
ALTER TABLE [dbo].[productos] CHECK CONSTRAINT [fk_productos_descuentos]
GO
ALTER TABLE [dbo].[productos]  WITH CHECK ADD  CONSTRAINT [fk_productos_imagenes] FOREIGN KEY([imagenes_id])
REFERENCES [dbo].[imagenes] ([id])
GO
ALTER TABLE [dbo].[productos] CHECK CONSTRAINT [fk_productos_imagenes]
GO
ALTER TABLE [dbo].[productos]  WITH CHECK ADD  CONSTRAINT [fk_productos_marca] FOREIGN KEY([marca_idmarca])
REFERENCES [dbo].[marcas] ([id])
GO
ALTER TABLE [dbo].[productos] CHECK CONSTRAINT [fk_productos_marca]
GO
ALTER TABLE [dbo].[productos]  WITH CHECK ADD  CONSTRAINT [fk_productos_productos_estado] FOREIGN KEY([productos_estado_id])
REFERENCES [dbo].[producto_estado] ([id])
GO
ALTER TABLE [dbo].[productos] CHECK CONSTRAINT [fk_productos_productos_estado]
GO
ALTER TABLE [dbo].[productos]  WITH CHECK ADD  CONSTRAINT [fk_productos_proveedor] FOREIGN KEY([proveedor_id])
REFERENCES [dbo].[proveedores] ([id])
GO
ALTER TABLE [dbo].[productos] CHECK CONSTRAINT [fk_productos_proveedor]
GO
ALTER TABLE [dbo].[productos]  WITH CHECK ADD  CONSTRAINT [fk_productos_tipo_producto] FOREIGN KEY([tipo_producto_id])
REFERENCES [dbo].[tipo_producto] ([id])
GO
ALTER TABLE [dbo].[productos] CHECK CONSTRAINT [fk_productos_tipo_producto]
GO
ALTER TABLE [dbo].[proveedores]  WITH CHECK ADD  CONSTRAINT [fk_proveedor_proveedor_estado] FOREIGN KEY([proveedor_estado_id])
REFERENCES [dbo].[proveedor_estado] ([id])
GO
ALTER TABLE [dbo].[proveedores] CHECK CONSTRAINT [fk_proveedor_proveedor_estado]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD  CONSTRAINT [fk_usuario_estado] FOREIGN KEY([usuario_estado_id])
REFERENCES [dbo].[usuario_estado] ([id])
GO
ALTER TABLE [dbo].[usuarios] CHECK CONSTRAINT [fk_usuario_estado]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD  CONSTRAINT [fk_usuarios_genero] FOREIGN KEY([genero_id])
REFERENCES [dbo].[generos] ([id])
GO
ALTER TABLE [dbo].[usuarios] CHECK CONSTRAINT [fk_usuarios_genero]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD  CONSTRAINT [fk_usuarios_rol] FOREIGN KEY([rol_id])
REFERENCES [dbo].[roles] ([id])
GO
ALTER TABLE [dbo].[usuarios] CHECK CONSTRAINT [fk_usuarios_rol]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD  CONSTRAINT [fk_usuarios_tipo_documento] FOREIGN KEY([tipo_documento_id])
REFERENCES [dbo].[tipo_documento] ([id])
GO
ALTER TABLE [dbo].[usuarios] CHECK CONSTRAINT [fk_usuarios_tipo_documento]
GO
USE [master]
GO
ALTER DATABASE [JKR] SET  READ_WRITE 
GO
