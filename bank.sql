-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bank
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bank
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bank` DEFAULT CHARACTER SET utf8 ;
USE `bank` ;

-- -----------------------------------------------------
-- Table `bank`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bank`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_type` ENUM('individual', 'corporate') NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `document_number` VARCHAR(20) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `document_number_UNIQUE` (`document_number` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bank`.`accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bank`.`accounts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `account_number` VARCHAR(100) NOT NULL,
  `account_type` ENUM('corrente', 'poupança') NOT NULL,
  `balance` DECIMAL(15,2) NULL DEFAULT 0.00,
  `credit_limit` DECIMAL(15,2) NULL DEFAULT 0.00,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `accountscol` VARCHAR(45) NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  UNIQUE INDEX `account_number_UNIQUE` (`account_number` ASC) VISIBLE,
  INDEX `fk_accounts_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_accounts_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `bank`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bank`.`transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bank`.`transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `transaction_type` ENUM('withdrawal', 'deposit', 'transfer', 'payment') NOT NULL,
  `amout` DECIMAL(15,2) NOT NULL,
  `transaction_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `source_account_id` INT NOT NULL,
  `destination_account_id` INT NOT NULL,
  PRIMARY KEY (`id`, `source_account_id`, `destination_account_id`),
  INDEX `fk_transactions_accounts1_idx` (`source_account_id` ASC) VISIBLE,
  INDEX `fk_transactions_accounts2_idx` (`destination_account_id` ASC) VISIBLE,
  CONSTRAINT `fk_transactions_accounts1`
    FOREIGN KEY (`source_account_id`)
    REFERENCES `bank`.`accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transactions_accounts2`
    FOREIGN KEY (`destination_account_id`)
    REFERENCES `bank`.`accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bank`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bank`.`payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NULL,
  `amount` DECIMAL(15,2) NOT NULL,
  `due_date` DATE NOT NULL,
  `status` ENUM('pending', 'paid', 'canceled') NULL DEFAULT 'pending',
  `accounts_id` INT NOT NULL,
  PRIMARY KEY (`id`, `accounts_id`),
  INDEX `fk_payments_accounts1_idx` (`accounts_id` ASC) VISIBLE,
  CONSTRAINT `fk_payments_accounts1`
    FOREIGN KEY (`accounts_id`)
    REFERENCES `bank`.`accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bank`.`scheduled_transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bank`.`scheduled_transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(15,2) NOT NULL,
  `scheduled_date` DATE NOT NULL,
  `status` ENUM('pending', 'completed', 'canceled') NULL DEFAULT 'pending',
  `source_account_id` INT NOT NULL,
  `destination_account_id` INT NOT NULL,
  PRIMARY KEY (`id`, `source_account_id`, `destination_account_id`),
  INDEX `fk_scheduled_transactions_accounts1_idx` (`source_account_id` ASC) VISIBLE,
  INDEX `fk_scheduled_transactions_accounts2_idx` (`destination_account_id` ASC) VISIBLE,
  CONSTRAINT `fk_scheduled_transactions_accounts1`
    FOREIGN KEY (`source_account_id`)
    REFERENCES `bank`.`accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scheduled_transactions_accounts2`
    FOREIGN KEY (`destination_account_id`)
    REFERENCES `bank`.`accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bank`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bank`.`addresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `zip_code` VARCHAR(20) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bank`.`users_has_addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bank`.`users_has_addresses` (
  `users_id` INT NOT NULL,
  `addresses_id` INT NOT NULL,
  PRIMARY KEY (`users_id`, `addresses_id`),
  INDEX `fk_users_has_addresses_addresses1_idx` (`addresses_id` ASC) VISIBLE,
  INDEX `fk_users_has_addresses_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_addresses_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `bank`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_addresses_addresses1`
    FOREIGN KEY (`addresses_id`)
    REFERENCES `bank`.`addresses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
