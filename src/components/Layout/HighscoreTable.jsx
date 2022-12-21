import React from "react";

export default function HighscoreTable(props) {
	return (
		<table style={{ textAlign: "center" }}>
			<thead>
				<tr>
					<th>Place</th>
					<th>Name</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				{props.highscores.map((highscore, index) => {
					return (
						<tr key={highscore.id}>
							<td>{index}</td>
							<td>{highscore.name}</td>
							<td>{highscore.score}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
