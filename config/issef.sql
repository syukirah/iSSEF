-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema issefportal2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema issefportal2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `issefportal2` DEFAULT CHARACTER SET utf8 ;
USE `issefportal2` ;

-- -----------------------------------------------------
-- Table `issefportal2`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `issefportal2`.`company` (
  `company_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(255) NOT NULL COMMENT '',
  `start_date` DATE NULL DEFAULT NULL COMMENT '',
  `expiry_date` DATE NULL DEFAULT NULL COMMENT '',
  `status` ENUM('active','inactive') NOT NULL COMMENT '',
  PRIMARY KEY (`company_id`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `issefportal2`.`service_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `issefportal2`.`service_category` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `category_name` VARCHAR(255) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`category_id`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `issefportal2`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `issefportal2`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `username` VARCHAR(255) NOT NULL COMMENT '',
  `password` VARCHAR(255) NOT NULL COMMENT '',
  `first_name` VARCHAR(255) NOT NULL COMMENT '',
  `last_name` VARCHAR(255) NOT NULL COMMENT '',
  `email_address` VARCHAR(80) NOT NULL COMMENT '',
  `phone_number` VARCHAR(40) NOT NULL COMMENT '',
  `role` ENUM('superadmin','admin','developer') NOT NULL COMMENT '',
  `company` INT(11) NOT NULL COMMENT '',
  PRIMARY KEY (`user_id`, `company`)  COMMENT '',
  INDEX `fk_company` (`company` ASC)  COMMENT '',
  CONSTRAINT `fk_company`
    FOREIGN KEY (`company`)
    REFERENCES `issefportal2`.`company` (`company_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `issefportal2`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `issefportal2`.`service` (
  `service_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `service_name` VARCHAR(255) NULL DEFAULT NULL COMMENT '',
  `version` VARCHAR(20) NULL DEFAULT NULL COMMENT '',
  `category` INT(11) NOT NULL COMMENT '',
  `description` VARCHAR(255) NULL DEFAULT NULL COMMENT '',
  `author` INT(11) NULL DEFAULT NULL COMMENT '',
  `company` INT(11) NOT NULL COMMENT '',
  `publish_date` DATE NULL DEFAULT NULL COMMENT '',
  `start_date` DATE NULL DEFAULT NULL COMMENT '',
  `expiry_date` DATE NULL DEFAULT NULL COMMENT '',
  `image_path` VARCHAR(255) NULL DEFAULT NULL COMMENT '',
  `service_status` ENUM('new','reviewing','publish','inactive') NULL DEFAULT NULL COMMENT '',
  `port` VARCHAR(45) NULL DEFAULT NULL COMMENT '',
  `ip_address` VARCHAR(255) NULL DEFAULT NULL COMMENT '',
  `flow_id` VARCHAR(255) NULL DEFAULT NULL COMMENT '',
  `flow_folder` VARCHAR(255) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`service_id`)  COMMENT '',
  INDEX `Provider` (`company` ASC)  COMMENT '',
  INDEX `Category` (`category` ASC)  COMMENT '',
  INDEX `Author` (`author` ASC)  COMMENT '',
  CONSTRAINT `service_ibfk_1`
    FOREIGN KEY (`company`)
    REFERENCES `issefportal2`.`company` (`company_id`)
    ON DELETE CASCADE,
  CONSTRAINT `service_ibfk_2`
    FOREIGN KEY (`category`)
    REFERENCES `issefportal2`.`service_category` (`category_id`)
    ON DELETE CASCADE,
  CONSTRAINT `service_ibfk_3`
    FOREIGN KEY (`author`)
    REFERENCES `issefportal2`.`users` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `issefportal2`.`service_api`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `issefportal2`.`service_api` (
  `api_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `api_name` VARCHAR(255) NOT NULL COMMENT '',
  `description` VARCHAR(255) NULL DEFAULT NULL COMMENT '',
  `method` VARCHAR(30) NOT NULL COMMENT '',
  `target_path` VARCHAR(255) NOT NULL COMMENT '',
  `proxy_path` VARCHAR(255) NULL DEFAULT NULL COMMENT '',
  `service` INT(11) NOT NULL COMMENT '',
  `status` VARCHAR(45) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`api_id`)  COMMENT '',
  INDEX `Service` (`service` ASC)  COMMENT '',
  CONSTRAINT `service_api_ibfk_1`
    FOREIGN KEY (`service`)
    REFERENCES `issefportal2`.`service` (`service_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `issefportal2`.`service_subscription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `issefportal2`.`service_subscription` (
  `subscription_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '',
  `subscriber` INT(11) NOT NULL COMMENT '',
  `service` INT(11) NOT NULL COMMENT '',
  PRIMARY KEY (`subscription_id`)  COMMENT '',
  INDEX `Subscriber` (`subscriber` ASC)  COMMENT '',
  INDEX `Service` (`service` ASC)  COMMENT '',
  CONSTRAINT `service_subscription_ibfk_1`
    FOREIGN KEY (`subscriber`)
    REFERENCES `issefportal2`.`company` (`company_id`)
    ON DELETE CASCADE,
  CONSTRAINT `service_subscription_ibfk_2`
    FOREIGN KEY (`service`)
    REFERENCES `issefportal2`.`service` (`service_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
