// package main

// import (
// 	"context"
// 	"fmt"
// 	"log"
// 	"os"
// 	"time"

// 	"github.com/gofiber/fiber/v2"
// 	"github.com/gofiber/fiber/v2/middleware/cors"
// 	"github.com/joho/godotenv"
// 	"go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/bson/primitive"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// )

// type Blog struct {
// 	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
// 	Title     string             `json:"title" bson:"title"`
// 	Content   string             `json:"content" bson:"content"`
// 	Author    string             `json:"author" bson:"author"`
// 	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
// }

// type Task struct {
// 	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
// 	Body      string             `json:"body" bson:"body"`
// 	Completed bool               `json:"completed" bson:"completed"`
// }

// var collection *mongo.Collection

// func main() {
// 	// Load environment variables
// 	if os.Getenv("ENV") != "production" {
// 		err := godotenv.Load(".env")
// 		if err != nil {
// 			log.Fatal("Error loading .env file:", err)
// 		}
// 	}

// 	// Connect to MongoDB
// 	MONGODB_URI := os.Getenv("MONGODB_URI")
// 	clientOptions := options.Client().ApplyURI(MONGODB_URI)
// 	client, err := mongo.Connect(context.Background(), clientOptions)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer client.Disconnect(context.Background())

// 	err = client.Ping(context.Background(), nil)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	fmt.Println("Connected to MongoDB Atlas")
// 	collection = client.Database("golang_db").Collection("items")

// 	// Initialize the Fiber app
// 	app := fiber.New()

// 	// CORS Middleware
// 	app.Use(cors.New(cors.Config{
// 		AllowOrigins:     "http://localhost:3000",
// 		AllowMethods:     "GET,POST,PATCH,DELETE",
// 		AllowHeaders:     "Content-Type, Authorization",
// 		AllowCredentials: true,
// 	}))

// 	app.Use(func(c *fiber.Ctx) error {
// 		log.Printf("Received request: %s %s", c.Method(), c.Path())
// 		return c.Next()
// 	})

// 	// API Routes for Blogs
// 	app.Get("/api/blogs", getBlogs)
// 	app.Post("/api/blogs", createBlog)
// 	app.Get("/api/blogs/:id", getBlogByID)
// 	app.Patch("/api/blogs/:id", updateBlog)
// 	app.Delete("/api/blogs/:id", deleteBlog)

// 	// API Routes for Tasks
// 	app.Get("/api/tasks", getTasks)
// 	app.Post("/api/tasks", createTask)
// 	app.Patch("/api/tasks/:id", updateTask)
// 	app.Delete("/api/tasks/:id", deleteTask)

// 	// Start the server
// 	port := os.Getenv("PORT")
// 	if port == "" {
// 		port = "5000"
// 	}
// 	log.Fatal(app.Listen("0.0.0.0:" + port))
// }

// // Blog Handlers
// func getBlogs(c *fiber.Ctx) error {
// 	var blogs []Blog
// 	cursor, err := collection.Find(context.Background(), bson.M{})
// 	if err != nil {
// 		return err
// 	}
// 	defer cursor.Close(context.Background())

// 	for cursor.Next(context.Background()) {
// 		var blog Blog
// 		if err := cursor.Decode(&blog); err != nil {
// 			return err
// 		}
// 		blogs = append(blogs, blog)
// 	}
// 	return c.JSON(blogs)
// }

// func createBlog(c *fiber.Ctx) error {
// 	blog := new(Blog)
// 	if err := c.BodyParser(blog); err != nil {
// 		return err
// 	}
// 	if blog.Title == "" || blog.Content == "" || blog.Author == "" {
// 		return c.Status(400).JSON(fiber.Map{"error": "All fields are required"})
// 	}
// 	blog.CreatedAt = time.Now()
// 	insertResult, err := collection.InsertOne(context.Background(), blog)
// 	if err != nil {
// 		return err
// 	}
// 	blog.ID = insertResult.InsertedID.(primitive.ObjectID)
// 	return c.Status(201).JSON(blog)
// }

// func getBlogByID(c *fiber.Ctx) error {
// 	id := c.Params("id")
// 	objectID, err := primitive.ObjectIDFromHex(id)
// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": "Invalid blog ID"})
// 	}
// 	var blog Blog
// 	err = collection.FindOne(context.Background(), bson.M{"_id": objectID}).Decode(&blog)
// 	if err != nil {
// 		return c.Status(404).JSON(fiber.Map{"error": "Blog not found"})
// 	}
// 	return c.JSON(blog)
// }

// func updateBlog(c *fiber.Ctx) error {
// 	id := c.Params("id")
// 	objectID, err := primitive.ObjectIDFromHex(id)
// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": "Invalid blog ID"})
// 	}
// 	var data map[string]interface{}
// 	if err := c.BodyParser(&data); err != nil {
// 		return err
// 	}
// 	data["updatedAt"] = time.Now()
// 	update := bson.M{"$set": data}
// 	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": objectID}, update)
// 	if err != nil {
// 		return err
// 	}
// 	return c.Status(200).JSON(fiber.Map{"success": true})
// }

// func deleteBlog(c *fiber.Ctx) error {
// 	id := c.Params("id")
// 	objectID, err := primitive.ObjectIDFromHex(id)
// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": "Invalid blog ID"})
// 	}
// 	_, err = collection.DeleteOne(context.Background(), bson.M{"_id": objectID})
// 	if err != nil {
// 		return err
// 	}
// 	return c.Status(200).JSON(fiber.Map{"success": true})
// }

// // Task Handlers
// func getTasks(c *fiber.Ctx) error {
// 	var tasks []Task
// 	cursor, err := collection.Find(context.Background(), bson.M{})
// 	if err != nil {
// 		return err
// 	}
// 	defer cursor.Close(context.Background())

// 	for cursor.Next(context.Background()) {
// 		var task Task
// 		if err := cursor.Decode(&task); err != nil {
// 			return err
// 		}
// 		tasks = append(tasks, task)
// 	}
// 	return c.JSON(tasks)
// }

// func createTask(c *fiber.Ctx) error {
// 	task := new(Task)
// 	if err := c.BodyParser(task); err != nil {
// 		return err
// 	}
// 	if task.Body == "" {
// 		return c.Status(400).JSON(fiber.Map{"error": "Task body cannot be empty"})
// 	}
// 	insertResult, err := collection.InsertOne(context.Background(), task)
// 	if err != nil {
// 		return err
// 	}
// 	task.ID = insertResult.InsertedID.(primitive.ObjectID)
// 	return c.Status(201).JSON(task)
// }

// func updateTask(c *fiber.Ctx) error {
// 	id := c.Params("id")
// 	objectID, err := primitive.ObjectIDFromHex(id)
// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": "Invalid task ID"})
// 	}
// 	filter := bson.M{"_id": objectID}
// 	update := bson.M{"$set": bson.M{"completed": true}}
// 	_, err = collection.UpdateOne(context.Background(), filter, update)
// 	if err != nil {
// 		return err
// 	}
// 	return c.Status(200).JSON(fiber.Map{"success": true})
// }

// func deleteTask(c *fiber.Ctx) error {
// 	id := c.Params("id")
// 	objectID, err := primitive.ObjectIDFromHex(id)
// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{"error": "Invalid task ID"})
// 	}
// 	filter := bson.M{"_id": objectID}
// 	_, err = collection.DeleteOne(context.Background(), filter)
// 	if err != nil {
// 		return err
// 	}
// 	return c.Status(200).JSON(fiber.Map{"success": true})
// }

package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Blog struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Title     string             `json:"title" bson:"title"`
	Content   string             `json:"content" bson:"content"`
	Author    string             `json:"author" bson:"author"`
	Thumbnail string             `json:"thumbnail" bson:"thumbnail"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

type Task struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Body      string             `json:"body" bson:"body"`
	Completed bool               `json:"completed" bson:"completed"`
}

var blogCollection *mongo.Collection
var taskCollection *mongo.Collection

func main() {
	// Load environment variables
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
	blogCollection = client.Database("golang_db").Collection("blogs")
	taskCollection = client.Database("golang_db").Collection("tasks")

	// Initialize the Fiber app
	app := fiber.New()

	// // CORS Middleware
	// app.Use(cors.New(cors.Config{
	// 	AllowOrigins:     "http://localhost:3000",
	// 	AllowMethods:     "GET,POST,PATCH,DELETE",
	// 	AllowHeaders:     "Content-Type, Authorization",
	// 	AllowCredentials: true,
	// }))

	app.Use(func(c *fiber.Ctx) error {
		log.Printf("Received request: %s %s", c.Method(), c.Path())
		return c.Next()
	})

	// API Routes for Blogs
	app.Get("/api/blogs", getBlogs)
	app.Post("/api/blogs", createBlog)
	app.Get("/api/blogs/:id", getBlogByID)
	app.Patch("/api/blogs/:id", updateBlog)
	app.Delete("/api/blogs/:id", deleteBlog)

	// API Routes for Tasks
	app.Get("/api/tasks", getTasks)
	app.Post("/api/tasks", createTask)
	app.Patch("/api/tasks/:id", updateTask)
	app.Delete("/api/tasks/:id", deleteTask)

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	if os.Getenv("ENV") == "production" {
		app.Static("/", "./fairplay/.next")
	}
	log.Fatal(app.Listen("0.0.0.0:" + port))
}

// Blog Handlers
func getBlogs(c *fiber.Ctx) error {
	var blogs []Blog
	cursor, err := blogCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var blog Blog
		if err := cursor.Decode(&blog); err != nil {
			return err
		}
		blogs = append(blogs, blog)
	}
	return c.JSON(blogs)
}

func createBlog(c *fiber.Ctx) error {
	blog := new(Blog)
	if err := c.BodyParser(blog); err != nil {
		return err
	}
	if blog.Title == "" || blog.Content == "" || blog.Author == "" {
		return c.Status(400).JSON(fiber.Map{"error": "All fields are required"})
	}
	blog.CreatedAt = time.Now()
	insertResult, err := blogCollection.InsertOne(context.Background(), blog)
	if err != nil {
		return err
	}
	blog.ID = insertResult.InsertedID.(primitive.ObjectID)
	return c.Status(201).JSON(blog)
}

func getBlogByID(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid blog ID"})
	}
	var blog Blog
	err = blogCollection.FindOne(context.Background(), bson.M{"_id": objectID}).Decode(&blog)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Blog not found"})
	}
	return c.JSON(blog)
}

func updateBlog(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid blog ID"})
	}
	var data map[string]interface{}
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	data["updatedAt"] = time.Now()
	update := bson.M{"$set": data}
	_, err = blogCollection.UpdateOne(context.Background(), bson.M{"_id": objectID}, update)
	if err != nil {
		return err
	}
	return c.Status(200).JSON(fiber.Map{"success": true})
}

func deleteBlog(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid blog ID"})
	}
	_, err = blogCollection.DeleteOne(context.Background(), bson.M{"_id": objectID})
	if err != nil {
		return err
	}
	return c.Status(200).JSON(fiber.Map{"success": true})
}

// Task Handlers
func getTasks(c *fiber.Ctx) error {
	var tasks []Task
	cursor, err := taskCollection.Find(context.Background(), bson.M{})
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

func createTask(c *fiber.Ctx) error {
	task := new(Task)
	if err := c.BodyParser(task); err != nil {
		return err
	}
	if task.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Task body cannot be empty"})
	}
	insertResult, err := taskCollection.InsertOne(context.Background(), task)
	if err != nil {
		return err
	}
	task.ID = insertResult.InsertedID.(primitive.ObjectID)
	return c.Status(201).JSON(task)
}

func updateTask(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid task ID"})
	}
	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"completed": true}}
	_, err = taskCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}
	return c.Status(200).JSON(fiber.Map{"success": true})
}

func deleteTask(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid task ID"})
	}
	filter := bson.M{"_id": objectID}
	_, err = taskCollection.DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}
	return c.Status(200).JSON(fiber.Map{"success": true})
}
