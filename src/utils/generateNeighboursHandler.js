import neighboursHandler from "./neightboursHandler";

export default function generateNeighboursHandler(
	data = [],
	height = 0,
	width = 0
) {
	//Making copy of data to not mutate the original array
	let dataCopy = data;

	//Looking for mines through array of neighbours for each cell, if neighboring cell contains a mine increase the counter in that cell
	for (let w = 0; w < width; w++) {
		for (let h = 0; h < height; h++) {
			let mines = 0;
			const area = neighboursHandler(
				data[w][h].x,
				data[w][h].y,
				data,
				height,
				width
			);
			area.map((value) => {
				if (value.mine) {
					return mines++;
				}
				return 0;
			});

			// Flips empty bool in cell object if no mines found in neighbours
			if (!mines) {
				dataCopy[w][h].empty = true;
			}
			dataCopy[w][h].neighbours = mines;
		}
	}
	return dataCopy;
}
