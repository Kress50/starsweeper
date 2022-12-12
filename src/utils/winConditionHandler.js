export default function winConditionHandler(data, difficulty) {
	const hiddenData = data.flat().filter((cell) => !cell.revealed);
	if (hiddenData.length === difficulty.mines) {
		return true;
	}
	return;
}
