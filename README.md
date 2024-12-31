# Fairplay Gamified Educational Page

## Overview

**Fairplay** is a gamified educational platform designed to provide athletes with essential knowledge about anti-doping regulations. Built using a modern tech stack, including **Next.js**, **C#**, **GO**, and **MongoDB**, this project aims to deliver real-time updates and engaging educational content. The platform integrates the **DopeCop** game, an interactive 3D experience that educates users on anti-doping principles.


![logo](https://github.com/user-attachments/assets/2ae407a0-66b4-461d-bec2-b0ef40605fad)


## Features

- **High-Performance Microservice**: Developed a GO microservice that optimizes queries, achieving a 40% reduction in response times.
- **Dynamic Educational Platform**: Utilizes Next.js to provide real-time updates on anti-doping news and blogs tailored for athletes.
- **Interactive Learning through Gaming**: Integrates the "DopeCop" 3D Unity game, which educates users about anti-doping regulations through immersive gameplay.

## DopeCop Game Overview |[GitHub Repo for DopeCop](https://github.com/PriyanshuDas01/DopeCop-Host).

In **DopeCop**, players assume the role of an undercover agent from the anti-doping bureau, tasked with chasing down athletes who may be violating doping regulations. The game combines thrilling chases with real-time quizzes, allowing players to learn about anti-doping rules while enjoying an engaging experience.

### Key Features of DopeCop

- **Immersive 3D Gameplay**: Fast-paced chases and thrilling encounters educate players about clean sport.
- **Gamified Knowledge Sharing**: Players answer anti-doping questions during the chase, earning points for correct answers.
- **Interactive Quizzes**: Real-time multiple-choice questions reinforce key concepts related to anti-doping regulations.
- **Dynamic Storyline**: Player decisions impact the game's outcome, enhancing engagement and learning.

![Screenshot 2024-09-30 214153](https://github.com/user-attachments/assets/8b93e908-8108-4824-9981-303d5858b7f4)


## Tech Stack

| Technology | Description |
|------------|-------------|
| Next.js    | Framework for server-rendered applications |
| C#         | Programming language for backend services and game development |
| GO         | Language used for high-performance microservices |
| MongoDB    | NoSQL database for storing application data |
| Unity 3D   | Game engine used for developing the DopeCop game |

## Installation

### Prerequisites

To run this project, ensure you have the following installed:

- Node.js
- npm or Yarn
- MongoDB (for database management)
- Go (version 1.22 or higher)
- Air (for live reloading of Go server)

### Environment Variables

Create a `.env.local` file in the root directory of your project and add the following environment variables (do not expose your keys):

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here
```

### Steps to Run Fairplay Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fairplay.git
   cd /fairplay
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Steps to Run DopeCop Locally

1. Clone the DopeCop repository:
   ```bash
   git clone https://github.com/PriyanshuDas01/DopeCop-Host.git
   cd DopeCop-Host
   ```

2. Open the project in Unity:
   - Launch Unity and open the DopeCop project.
   - Build the project for WebGL.

3. Host locally (optional):
   ```bash
   cd Build
   python3 -m http.server
   ```
   Open your web browser and navigate to `localhost:8000` to view and play the game.

### Running the Go Server with Air

To run the Go server using Air for live reloading, follow these steps:

1. Navigate to your Go project directory:
   ```bash
   cd /gopage
   ```

2. Start the Go server with Air:
   ```bash
   air
   ```

This command will monitor your Go files for changes and automatically reload the server when any modifications are detected.

## Roadmap

- Enhance user experience with additional interactive features.
- Expand the database with more educational resources.
- Implement user feedback mechanisms to improve content relevance.

  ### Platform ScreenShorts
![image](https://github.com/user-attachments/assets/97517591-1616-4331-93bf-4245bce34007)

  ![image](https://github.com/user-attachments/assets/92984105-ea5c-43d6-b325-afb48ed87863)
   ![image](https://github.com/user-attachments/assets/16cdca2f-3fb4-41e2-849c-4479f5b72f49)
  ![image](https://github.com/user-attachments/assets/2a91dbd8-8c8a-4835-864f-ece50d36dcca)

  ![image](https://github.com/user-attachments/assets/a0171b14-add0-4a79-a073-2fa6bc798722)
 ![image](https://github.com/user-attachments/assets/302760ff-baa4-4487-8a3d-72190d7ab4f9)



### Dopecop Game

  ![Screenshot 2024-09-30 180558](https://github.com/user-attachments/assets/323f6cb1-aa95-4033-bcec-826fd719375e)


