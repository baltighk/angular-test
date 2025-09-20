import { Component } from '@angular/core';

@Component({
    selector: 'app-task1-a',
    templateUrl: './task1-a.component.html',
    standalone: false,
    styleUrls: ['./task1-a.component.less']
})
export class Task1AComponent {
    rows = 5;
    cols = 5;

    cellTypes = [
        null,
        'straight-vertical.jpg',
        'straight-horizontal.jpg',
        'top-left.jpg',
        'top-right.jpg',
        'bottom-left.jpg',
        'bottom-right.jpg'
    ];

    labyrinthGrid: (string | null)[][] = [];

    isGameOver = false;
    message = "";

    constructor() {
        this.resetGrid();
    }

    resetGrid() {
        const startRow = this.rows - 1;
        const startCol = 0;
        const endRow = 0;
        const endCol = this.cols - 1;

        this.labyrinthGrid = Array.from({ length: this.rows }, (_, rowIndex) =>
            Array.from({ length: this.cols }, (_, colIndex) =>
                (rowIndex === startRow && colIndex === startCol) || (rowIndex === endRow && colIndex === endCol)
                    ? 'fixed'
                    : null
            )
        );
        this.isGameOver = false;
        this.message = "";
    }

    updateGridSize(newRows: number, newCols: number) {
        if (newRows >= 3 && newCols >= 3) {
            this.rows = newRows;
            this.cols = newCols;
            this.resetGrid();
        }
    }


    onCellClick(rowIndex: number, colIndex: number) {
        if (this.isGameOver || this.labyrinthGrid[rowIndex][colIndex] === 'fixed') {
            return;
        }

        const currentType = this.labyrinthGrid[rowIndex][colIndex];
        const currentIndex = this.cellTypes.indexOf(currentType);
        this.labyrinthGrid[rowIndex][colIndex] =
            this.cellTypes[(currentIndex + 1) % this.cellTypes.length];

        if (this.isPathComplete()) {
            this.isGameOver = true;
            this.message = "Sikeresen kijutottál!";
        }
    }


    isPathComplete(): boolean {
        const visited = Array.from({ length: this.rows }, () =>
            Array(this.cols).fill(false)
        );

        const directions = [
            { dr: -1, dc: 0 }, // Fel
            { dr: 1, dc: 0 }, // Le
            { dr: 0, dc: -1 }, // Balra
            { dr: 0, dc: 1 } // Jobbra
        ];

        const startRow = this.rows - 1;
        const startCol = 0;
        const endRow = 0;
        const endCol = this.cols - 1;

        const stack = [{ row: startRow, col: startCol }];

        while (stack.length > 0) {
            const current = stack.pop();
            if (!current) continue;
            const { row, col } = current;

            if (row === endRow && col === endCol) return true;

            visited[row][col] = true;

            for (const { dr, dc } of directions) {
                const newRow = row + dr;
                const newCol = col + dc;

                if (
                    newRow >= 0 &&
                    newRow < this.rows &&
                    newCol >= 0 &&
                    newCol < this.cols &&
                    !visited[newRow][newCol] &&
                    this.labyrinthGrid[newRow][newCol] !== null
                ) {
                    stack.push({ row: newRow, col: newCol });
                }
            }
        }
        return false;
    }

}