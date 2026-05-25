/**
 * N-Queens Puzzle Solver using Breadth-First Search (BFS)
 * Finds all valid configurations where N queens can be placed on an N x N board
 * without threatening each other.
 */

/**
 * Checks if it is safe to place a queen at a specific row and column
 * @param {number[][]} board - The current state of the board
 * @param {number} row - Target row index
 * @param {number} col - Target column index
 * @returns {boolean} True if safe, false otherwise
 */
function isSafe(board, row, col) {
    // Check vertical column path upwards
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
    }

    // Check top-left diagonal path
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
    }

    // Check top-right diagonal path
    for (let i = row - 1, j = col + 1; i >= 0 && j < board.length; i--, j++) {
        if (board[i][j] === 1) return false;
    }

    return true;
}

/**
 * Solves the N-Queens problem utilizing a row-by-row BFS state exploration tree
 * @param {number} N - The size of the board dimensions (N x N)
 * @returns {number[][][]} An array containing all valid solution matrix configurations
 */
function solveNQueensBFS(N) {
    const queue = [];
    const solutions = [];
    
    // Initialize an empty N x N board configuration matrix
    const initialBoard = Array.from({ length: N }, () => Array(N).fill(0));
    
    // Push the initial layout and starting row pointer into the BFS tracking queue
    queue.push({ board: initialBoard, row: 0 });

    while (queue.length > 0) {
        const current = queue.shift(); // Dequeue the oldest configuration state
        const board = current.board;
        const row = current.row;

        // Base Case: If we have securely placed queens in all rows, a solution is found
        if (row === N) {
            solutions.push(board.map(r => [...r]));
        } else {
            // Traverse column pathways for the active row level
            for (let col = 0; col < N; col++) {
                if (isSafe(board, row, col)) {
                    // Place the queen to test the branch state
                    board[row][col] = 1;
                    
                    // Deep copy the board structure to hold state safety in the BFS queue queue
                    queue.push({ 
                        board: board.map(r => [...r]), 
                        row: row + 1 
                    });
                    
                    // Backtrack and clear the cell for alternative column permutations
                    board[row][col] = 0;
                }
            }
        }
    }

    return solutions;
}

// Example Execution/Testing wrapper for Verification:
const boardSize = 4;
const totalSolutions = solveNQueensBFS(boardSize);
console.log(`Total valid configurations found for an ${boardSize}x${boardSize} board: ${totalSolutions.length}`);
