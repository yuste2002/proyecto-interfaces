-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema vsr
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema vsr
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `vsr` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `vsr` ;

-- -----------------------------------------------------
-- Table `vsr`.`almacens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vsr`.`almacens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `createdAt` DATE NULL DEFAULT NULL,
  `updatedAt` DATE NULL DEFAULT NULL,
  `propietario` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 36
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vsr`.`invitados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vsr`.`invitados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(45) NULL DEFAULT NULL,
  `almacen` VARCHAR(45) NULL DEFAULT NULL,
  `createdAt` DATE NULL DEFAULT NULL,
  `updatedAt` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vsr`.`objetos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vsr`.`objetos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `descripcion` VARCHAR(45) NULL DEFAULT NULL,
  `ubicacion` VARCHAR(45) NULL DEFAULT NULL,
  `foto` VARCHAR(100) NULL DEFAULT NULL,
  `createdAt` DATE NULL DEFAULT NULL,
  `updatedAt` DATE NULL DEFAULT NULL,
  `almacenAsociado` INT NOT NULL,
  `propietario` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vsr`.`reservas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vsr`.`reservas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fechaInicio` DATE NULL DEFAULT NULL,
  `fechaFin` DATE NULL DEFAULT NULL,
  `createdAt` DATE NULL DEFAULT NULL,
  `updatedAt` DATE NULL DEFAULT NULL,
  `usuarioReserva` INT NOT NULL,
  `objetoReserva` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vsr`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vsr`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombreUsuario` VARCHAR(45) NULL DEFAULT NULL,
  `correo` VARCHAR(45) NULL DEFAULT NULL,
  `contrasena` VARCHAR(45) NULL DEFAULT NULL,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `apellido` VARCHAR(45) NULL DEFAULT NULL,
  `createdAt` DATE NULL DEFAULT NULL,
  `updatedAt` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idUsuario_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `nombreUsuario_UNIQUE` (`nombreUsuario` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
