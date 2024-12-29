package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Task struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Completed bool               `json:"completed"`
	Body      string             `json:"body"`
}

var collection *mongo.Collection

func main() {
	// Load environment variables if not in production
	if os.Getenv("ENV") != "production" {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal("Error loading .env file:", err)
		}
	}

	// Connect to MongoDB
	MONGODB_URI := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB Atlas")
	collection = client.Database("golang_db").Collection("tasks")

	// Initialize the Fiber app
	app := fiber.New()

	// CORS Middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",       // Allow frontend to make requests
		AllowMethods:     "GET,POST,PATCH,DELETE",       // Allow all the necessary HTTP methods
		AllowHeaders:     "Content-Type, Authorization", // Allow necessary headers
		AllowCredentials: true,                          // Allow credentials if necessary
	}))

	// Logging Middleware
	app.Use(func(c *fiber.Ctx) error {
		log.Printf("Received request: %s %s", c.Method(), c.Path())
		return c.Next()
	})

	// API Routes
	app.Get("/api/tasks", getTasks)
	app.Post("/api/tasks", createTask)
	app.Patch("/api/tasks/:id", updateTask)
	app.Delete("/api/tasks/:id", deleteTask)

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}
	log.Fatal(app.Listen("0.0.0.0:" + port))
}

// Get all tasks
func getTasks(c *fiber.Ctx) error {
	var tasks []Task
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var task Task
		if err := cursor.Decode(&task); err != nil {
			return err
		}
		tasks = append(tasks, task)
	}
	return c.JSON(tasks)
}

// Create a new task
func createTask(c *fiber.Ctx) error {
	task := new(Task)
	if err := c.BodyParser(task); err != nil {
		return err
	}
	if task.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Task body cannot be empty"})
	}
	insertResult, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		return err
	}
	task.ID = insertResult.InsertedID.(primitive.ObjectID)
	return c.Status(201).JSON(task)
}

// Update a task
func updateTask(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid task ID"})
	}
	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"completed": true}}
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}
	return c.Status(200).JSON(fiber.Map{"success": true})
}

// Delete a task
func deleteTask(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid task ID"})
	}
	filter := bson.M{"_id": objectID}
	_, err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}
	return c.Status(200).JSON(fiber.Map{"success": true})
}
