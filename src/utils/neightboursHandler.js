export default function neighboursHandler(
	indexW = 0,
	indexY = 0,
	data = [],
	height = 0,
	width = 0
) {
	// Generating an array of neighbours for each cell and discarding neightbours that go over / under the limit of minesweeper board

	let neighbours = [];

	const surroundNeighbours = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 0],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	surroundNeighbours.forEach(([x, y]) => {
		const newX = indexW + x;
		const newY = indexY + y;

		if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
			neighbours.push(data[newX][newY]);
		}
	});

	return neighbours;
}
