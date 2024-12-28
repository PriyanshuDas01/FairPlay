package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type Task struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

func main() {
	fmt.Println("Hello")
	app := fiber.New()

	tasks := []Task{}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{
			"msg": "hello",
		})
	})

	// POST route to create a new task
	app.Post("/api/tasks", func(c *fiber.Ctx) error {
		newTask := new(Task)

		if err := c.BodyParser(newTask); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
		}

		// Validate the task body
		if newTask.Body == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Task body can't be empty"})
		}

		// Assign a new ID and append to the tasks slice
		newTask.ID = len(tasks) + 1
		tasks = append(tasks, *newTask)

		return c.Status(201).JSON(newTask)
	})

	// GET -> retrieve all tasks
	app.Get("/api/tasks", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(tasks)
	})

	log.Fatal(app.Listen(":4000"))
}
