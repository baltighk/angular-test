import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  NgZone,
} from "@angular/core";

interface Car {
  color: string;
  bodyHealth: number;
  wheelHealth: number;
  acceleration: number;
  maxSpeed: number;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  vx: number;
  vy: number;
  speed: number;
  turning: number;
  alive: boolean;
  name: string;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: "app-task1-a",
  templateUrl: "./task1-a.component.html",
  styleUrls: ["./task1-a.component.less"],
  standalone: false,
})
export class Task1AComponent implements AfterViewInit {
  @ViewChild("carCanvas", { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  cars: Car[] = [];
  hoveredCar: Car | null = null;
  hoveredCarIndex: number = -1;
  selectedCarIndex: number = -1;
  gameStarted = false;
  errorMessage = "";
  winnerMessage = "";
  destroyedMessage = "";
  obstacles: Obstacle[] = [
    { x: 350, y: 40, width: 40, height: 120 },
    { x: 600, y: 0, width: 40, height: 80 },
    { x: 600, y: 120, width: 40, height: 80 },
  ];
  finishLineX = 820;
  startLineX = 60;
  animationFrameId: number | null = null;
  keys: { [key: string]: boolean } = {};

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.generateCars();
    this.drawCars();

    const canvas = this.canvasRef.nativeElement;
    canvas.addEventListener("mousemove", this.egerFole.bind(this));
    canvas.addEventListener("mouseleave", () => {
      this.hoveredCar = null;
      this.hoveredCarIndex = -1;
      this.drawCars();
    });
    canvas.addEventListener("click", this.onCanvasClick.bind(this));
  }

  generateCars() {
    const colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "violet",
      "orange",
    ];
    const carWidth = 60;
    const carHeight = 30;
    const spacing = 30;
    const startY = 80; 
    const names = ["Piros", "Zöld", "Kék", "Sárga", "Rózsaszín", "Narancs"];

    this.cars = [];
    for (let i = 0; i < 6; i++) {
      this.cars.push({
        color: colors[i % colors.length],
        bodyHealth: this.randomInt(2, 10),
        wheelHealth: this.randomInt(1, 4),
        acceleration: this.randomInt(2, 8),
        maxSpeed: this.randomInt(40, 100),
        
        x: 60 + i * (carWidth + spacing),
        y: startY,
        width: carWidth,
        height: carHeight,
        angle: 0,
        vx: 0,
        vy: 0,
        speed: 0,
        turning: 0,
        alive: true,
        name: names[i],
      });
    }
  }

  drawCars() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext("2d")!;
    
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (this.gameStarted) {
      
      ctx.save();
      ctx.strokeStyle = "#222";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(this.startLineX - 10, 0);
      ctx.lineTo(this.startLineX - 10, canvas.height);
      ctx.stroke();
      ctx.strokeStyle = "#FFD600";
      ctx.beginPath();
      ctx.moveTo(this.finishLineX + 60, 0);
      ctx.lineTo(this.finishLineX + 60, canvas.height);
      ctx.stroke();
      ctx.restore();

      
      ctx.save();
      ctx.fillStyle = "#444";
      this.obstacles.forEach((obs) => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      });
      ctx.restore();
    }

    
    this.cars.forEach((car, idx) => {
      if (!car.alive) return;
      ctx.save();
      ctx.translate(car.x + car.width / 2, car.y + car.height / 2);
      ctx.rotate(car.angle);
      
      ctx.fillStyle = car.color;
      ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
      
      ctx.fillStyle = "#222";
      this.drawEllipse(ctx, -car.width / 2 + 5, -car.height / 2 - 5, 12, 7);
      this.drawEllipse(ctx, car.width / 2 - 17, -car.height / 2 - 5, 12, 7);
      this.drawEllipse(ctx, -car.width / 2 + 5, car.height / 2 - 2, 12, 7);
      this.drawEllipse(ctx, car.width / 2 - 17, car.height / 2 - 2, 12, 7);

      
      if (this.hoveredCarIndex === idx) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.strokeRect(
          -car.width / 2 - 2,
          -car.height / 2 - 2,
          car.width + 4,
          car.height + 4
        );
      }
      
      if (this.selectedCarIndex === idx) {
        ctx.strokeStyle = "#1976d2";
        ctx.lineWidth = 5;
        ctx.strokeRect(
          -car.width / 2 - 4,
          -car.height / 2 - 4,
          car.width + 8,
          car.height + 8
        );
      }
      ctx.restore();
    });

    
    if (this.winnerMessage) {
      ctx.save();
      ctx.font = "bold 32px Arial";
      ctx.fillStyle = "#1976d2";
      ctx.fillText(this.winnerMessage, 250, 60);
      ctx.restore();
    }
    if (this.destroyedMessage) {
      ctx.save();
      ctx.font = "bold 32px Arial";
      ctx.fillStyle = "#e53935";
      ctx.fillText(this.destroyedMessage, 200, 120);
      ctx.restore();
    }
  }

  drawEllipse(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  onCanvasClick(event: MouseEvent) {
    if (this.gameStarted) return;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;

    this.cars.forEach((car, idx) => {
      if (
        car.alive &&
        this.pointInRotatedRect(
          mx,
          my,
          car.x,
          car.y,
          car.width,
          car.height,
          car.angle
        )
      ) {
        if (this.selectedCarIndex === idx) {
          this.selectedCarIndex = -1;
        } else {
          this.selectedCarIndex = idx;
        }
      }
    });
    this.drawCars();
  }

  egerFole(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;

    let found = false;
    this.cars.forEach((car, idx) => {
      if (
        car.alive &&
        this.pointInRotatedRect(
          mx,
          my,
          car.x,
          car.y,
          car.width,
          car.height,
          car.angle
        )
      ) {
        this.hoveredCar = car;
        this.hoveredCarIndex = idx;
        found = true;
      }
    });
    if (!found) {
      this.hoveredCar = null;
      this.hoveredCarIndex = -1;
    }
    this.drawCars();
  }

  pointInRotatedRect(
    px: number,
    py: number,
    x: number,
    y: number,
    w: number,
    h: number,
    angle: number
  ): boolean {
    
    const cx = x + w / 2;
    const cy = y + h / 2;
    const dx = px - cx;
    const dy = py - cy;
    
    const cos = Math.cos(-angle);
    const sin = Math.sin(-angle);
    const rx = dx * cos - dy * sin;
    const ry = dx * sin + dy * cos;
    return rx > -w / 2 && rx < w / 2 && ry > -h / 2 && ry < h / 2;
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  jatekInditas() {
    if (this.selectedCarIndex === -1) {
      this.errorMessage = "Válassz ki egy autót a játék indításához!";
      return;
    }
    this.errorMessage = "";
    this.gameStarted = true;
    this.winnerMessage = "";
    this.destroyedMessage = "";
    
    const startY = 30;
    this.cars.forEach((car, i) => {
      car.x = this.startLineX;
      car.y = startY + i * (car.height + 30);
      car.angle = 0;
      car.vx = 0;
      car.vy = 0;
      car.speed = 0;
      car.turning = 0;
      car.alive = true;
    });
    this.listenKeys();
    this.ngZone.runOutsideAngular(() => this.gameLoop());
  }

  listenKeys() {
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keyup", this.keyUpHandler);
  }
  removeKeys() {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
    this.keys = {};
  }

  keyDownHandler = (e: KeyboardEvent) => {
    this.keys[e.key.toLowerCase()] = true;
    this.keys[e.code] = true;
  };
  keyUpHandler = (e: KeyboardEvent) => {
    this.keys[e.key.toLowerCase()] = false;
    this.keys[e.code] = false;
  };

  gameLoop = () => {
    if (!this.gameStarted) return;
    
    const car = this.cars[this.selectedCarIndex];
    if (car && car.alive) {
      this.JatekosBemenet(car);
    }
    
    this.cars.forEach((aiCar, idx) => {
      if (idx !== this.selectedCarIndex && aiCar.alive) {
        this.handleAI(aiCar);
      }
    });
    
    this.cars.forEach((car) => {
      if (!car.alive) return;
      
      car.x += Math.cos(car.angle) * car.speed * 0.016;
      car.y += Math.sin(car.angle) * car.speed * 0.016;
      
      car.speed *= 0.98;
      if (Math.abs(car.speed) < 0.1) car.speed = 0;
    });

    
    this.Utkozes();

    
    let winnerIdx = -1;
    this.cars.forEach((car, idx) => {
      if (car.alive && car.x + car.width > this.finishLineX + 60) {
        winnerIdx = idx;
      }
    });
    if (winnerIdx !== -1) {
      this.gameStarted = false;
      this.removeKeys();
      this.winnerMessage = `Nyertes: ${this.cars[winnerIdx].name} (Autó #${
        winnerIdx + 1
      })`;
    }

    
    if (!this.cars[this.selectedCarIndex].alive) {
      this.gameStarted = false;
      this.removeKeys();
      this.destroyedMessage = "A jármű megsemmisült, vesztettél!";
    }

    this.drawCars();
    if (this.gameStarted) {
      this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
  };

  JatekosBemenet(car: Car) {
    
    let forward = this.keys["w"] || this.keys["arrowup"];
    let backward = this.keys["s"] || this.keys["arrowdown"];
    let left = this.keys["a"] || this.keys["arrowleft"];
    let right = this.keys["d"] || this.keys["arrowright"];

    
    if (forward) {
      car.speed += car.acceleration * 0.1;
    } else if (backward) {
      car.speed -= car.acceleration * 0.1;
    } else {
      
      car.speed *= 0.98;
    }
    
    if (car.speed > car.maxSpeed) car.speed = car.maxSpeed;
    if (car.speed < -car.maxSpeed / 2) car.speed = -car.maxSpeed / 2;

    
    if (left) {
      car.angle -= 0.05 * (car.speed !== 0 ? Math.sign(car.speed) : 1);
    }
    if (right) {
      car.angle += 0.05 * (car.speed !== 0 ? Math.sign(car.speed) : 1);
    }
  }

  handleAI(car: Car) {
    
    const targetY = car.y;
    const finishX = this.finishLineX + 80;
    
    let desiredAngle = Math.atan2(0, finishX - car.x);
    
    this.obstacles.forEach((obs) => {
      if (
        car.x + car.width > obs.x - 40 &&
        car.x < obs.x + obs.width + 40 &&
        car.y + car.height > obs.y - 40 &&
        car.y < obs.y + obs.height + 40
      ) {
        if (car.y < obs.y) desiredAngle -= 0.3;
        else desiredAngle += 0.3;
      }
    });
    
    this.cars.forEach((other) => {
      if (other !== car && other.alive) {
        const dx = other.x - car.x;
        const dy = other.y - car.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 50) {
          desiredAngle += car.y < other.y ? -0.2 : 0.2;
        }
      }
    });
    
    let diff = desiredAngle - car.angle;
    if (diff > Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;
    car.angle += Math.max(-0.05, Math.min(0.05, diff));
    
    if (car.speed < car.maxSpeed) car.speed += car.acceleration * 0.08;
    if (car.speed > car.maxSpeed) car.speed = car.maxSpeed;
  }

  Utkozes() {
    
    for (let i = 0; i < this.cars.length; i++) {
      const carA = this.cars[i];
      if (!carA.alive) continue;
      for (let j = i + 1; j < this.cars.length; j++) {
        const carB = this.cars[j];
        if (!carB.alive) continue;
        if (this.rectsOverlap(carA, carB)) {
          
          const angle = Math.atan2(carB.y - carA.y, carB.x - carA.x);
          carA.x -= Math.cos(angle) * 10;
          carA.y -= Math.sin(angle) * 10;
          carB.x += Math.cos(angle) * 10;
          carB.y += Math.sin(angle) * 10;
          carA.speed *= 0.7;
          carB.speed *= 0.7;
          
          if (Math.abs(Math.sin(angle)) > Math.abs(Math.cos(angle))) {
            carA.wheelHealth--;
            carB.wheelHealth--;
          } else {
            carA.bodyHealth--;
            carB.bodyHealth--;
          }
        }
      }
    }
    
    this.cars.forEach((car) => {
      if (!car.alive) return;
      this.obstacles.forEach((obs) => {
        if (this.carRectOverlap(car, obs)) {
          
          car.x -= Math.cos(car.angle) * 15;
          car.y -= Math.sin(car.angle) * 15;
          car.speed *= 0.5;
          
          car.bodyHealth--;
        }
      });
    });
    
    this.cars.forEach((car) => {
      if (car.bodyHealth <= 0 || car.wheelHealth <= 0) {
        car.alive = false;
      }
    });
  }

  rectsOverlap(a: Car, b: Car): boolean {
    
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  carRectOverlap(car: Car, obs: Obstacle): boolean {
    
    return (
      car.x < obs.x + obs.width &&
      car.x + car.width > obs.x &&
      car.y < obs.y + obs.height &&
      car.y + car.height > obs.y
    );
  }
}
