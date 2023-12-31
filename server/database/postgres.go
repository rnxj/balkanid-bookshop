package database

import (
	"fmt"
	"log"
	"os"

	"bookshop/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectToDB() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading env file \n", err)
    }

    dsn := fmt.Sprintf("host=bookshop-db-1 user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Kolkata",
        os.Getenv("DB_USER"), 
		os.Getenv("DB_PASSWORD"), 
		os.Getenv("DB_NAME"), 
		os.Getenv("DB_PORT"))

    log.Print("Connecting to the Database...")
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    }) 

    if err != nil {
        log.Fatal("Erroe connecting to database. \n", err)
        os.Exit(2)
    }
    log.Println("DB Connection established successfully")

    log.Print("Running the migrations...")
    DB.AutoMigrate(&models.User{}, &models.Claims{}, &models.Admin{}, &models.Book{}, &models.Review{}, &models.Cart{}, &models.History{}, &models.Inventory{})
}
