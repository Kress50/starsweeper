import React from "react";

export default function HighscoreTable(props) {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				{props.highscores.map((highscore) => {
					return (
						<tr key={highscore.id}>
							<td>{highscore.name}</td>
							<td>{highscore.score}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
