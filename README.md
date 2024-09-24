# MarineScape
Overview
MarineScape is a 2D side-scrolling game where you control a jellyfish that has to avoid underwater obstacles (rocks) while collecting points and hearts to survive longer. The game is developed using pure HTML, CSS, and JavaScript, without relying on the canvas element. It’s simple yet engaging, offering players an enjoyable and casual gaming experience.

Features
2D gameplay: Control a jellyfish to dodge obstacles and collect items.
Dynamic environment: Rocks appear at varying intervals to challenge the player.
Score and health system: Collect hearts to extend your life and aim for the highest score by collecting points.
Responsive design: Works on different screen sizes and devices.
Smooth animations: All animations are achieved using CSS transitions and JavaScript manipulations.
Technologies Used
HTML: Structuring the game elements.
CSS: Styling and creating animations for smooth jellyfish movement and other game elements.
JavaScript: Handling game logic, such as obstacle generation, player movement, collision detection, and scoring.
Getting Started
Prerequisites
To play or modify this game, you'll need a web browser and a code editor (if you plan to edit the code). No external libraries are required, making it easy to run by simply opening the HTML file.

Installation
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/yourusername/MarineScape.git
Navigate to the project folder:

bash
Copy code
cd MarineScape
Open the index.html file in your browser:

bash
Copy code
open index.html
Controls
Keyboard: Use the arrow keys (or any control scheme you implement) to move the jellyfish up, down, left, or right.
Mouse/Touch: (If applicable) Implement tap or swipe for mobile control.
Game Rules
Avoid obstacles: Rocks will continuously appear from one side of the screen. Your goal is to avoid them by moving the jellyfish.
Collect hearts: Hearts will occasionally appear. Collecting them increases your health.
Score points: Points are awarded for every item collected and for survival time.
Game Over Conditions
Colliding with a rock will result in losing health.
The game is over when the jellyfish’s health reaches zero.
Folder Structure
bash
Copy code
MarineScape/
│
├── index.html            # Main HTML file
├── styles.css            # Game styling and animations
└── script.js             # Game logic and interactions
How It Works
HTML: The game is structured with basic HTML elements for the player, obstacles, and collectible items.
CSS: Animations for movement and transitions are done with CSS, ensuring smooth visual feedback.
JavaScript:
Spawns obstacles at random intervals.
Handles player input for movement.
Detects collisions between the jellyfish and obstacles or items.
Manages the scoring and health systems.
Future Improvements
More obstacles: Add different types of obstacles or hazards.
Power-ups: Introduce more power-ups to affect gameplay (e.g., speed boosts).
Mobile compatibility: Further refine touch controls for mobile play.
Difficulty levels: Add increasing difficulty as the player survives longer.
