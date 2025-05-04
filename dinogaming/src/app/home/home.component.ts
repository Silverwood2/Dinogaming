import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

interface Cactus {
  x: number;
  width: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})

export class HomeComponent {
  dinoY = 0;
  velocity = 0;
  gravity = 1;
  jumpStrength = 15;
  isJumping = false;
  groundX = 0;
  cactuses: Cactus[] = [];

  ngOnInit() {
    this.gameLoop();
    this.spawnCactusLoop();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space' && !this.isJumping) {
      this.velocity = this.jumpStrength;
      this.isJumping = true;
    }
  }

  gameLoop() {
    setInterval(() => {
      // Dino jump
      if (this.isJumping) {
        this.dinoY += this.velocity;
        this.velocity -= this.gravity;

        if (this.dinoY <= 0) {
          this.dinoY = 0;
          this.velocity = 0;
          this.isJumping = false;
        }
      }

      // Ground scroll
      this.groundX -= 5;
      if (this.groundX <= -40) this.groundX = 0;

      // Move cactuses
      this.cactuses.forEach(cactus => cactus.x -= 5);
      this.cactuses = this.cactuses.filter(cactus => cactus.x + cactus.width > 0); // remove off-screen
    }, 30);
  }

  spawnCactusLoop() {
    setInterval(() => {
      const width = 20 + Math.floor(Math.random() * 20); // random width 20–40
      this.cactuses.push({ x: 800, width });
    }, 2000); // every 2 seconds
  }
}