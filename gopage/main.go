package main

import (
	"fmt"
	"log"
	"strconv"

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

	// Root route
	app.Get("/api/tasks", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(tasks)
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

	// GET route to retrieve all tasks
	app.Get("/api/tasks", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(tasks)
	})

	// PATCH route to update a task
	app.Patch("/api/tasks/:id", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid task ID"})
		}

		// Find and update the task
		for i := range tasks {
			if tasks[i].ID == id {
				tasks[i].Completed = true
				return c.Status(200).JSON(tasks[i])
			}
		}

		return c.Status(404).JSON(fiber.Map{"error": "Task not found"})
	})

	app.Delete("/api/tasks/:id", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid task ID"})
		}

		// Find and delete the task
		for i, task := range tasks {
			if task.ID == id {
				// Remove the task from the slice
				tasks = append(tasks[:i], tasks[i+1:]...)
				return c.Status(200).JSON(fiber.Map{"message": "Task deleted successfully"})
			}
		}

		return c.Status(404).JSON(fiber.Map{"error": "Task not found"})
	})

	log.Fatal(app.Listen(":4000"))
}
