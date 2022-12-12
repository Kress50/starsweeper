export default function randomMineHandler(
	data = [],
	height = 0,
	width = 0,
	difficulty = 0
) {
	// Generating mines at random X/Y locations and checking whether that location has a mine already, otherwise increase the counter of mines

	let minesNumber = 0;

	while (minesNumber < difficulty) {
		let randomX = Math.floor(Math.random() * width);
		let randomY = Math.floor(Math.random() * height);

		if (!data[randomX][randomY].mine) {
			data[randomX][randomY].mine = true;
			minesNumber++;
		}
	}
	return data;
}
