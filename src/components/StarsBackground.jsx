import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./StarsBackground.scss";

export default function StarsBackground() {
	const particlesInit = useCallback(async (engine) => {
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	return (
		<Particles
			id="tsparticles"
			init={particlesInit}
			options={{
				fpsLimit: 30,
				interactivity: {
					detectsOn: "canvas",
					events: {
						resize: true,
					},
				},
				particles: {
					color: {
						value: "#f1f1f1",
					},
					number: {
						density: {
							enable: true,
							area: 1080,
						},
						limit: 0,
						value: 500,
					},
					opacity: {
						animation: {
							enable: true,
							minimumValue: 0.5,
							speed: 1,
							sync: false,
						},
						random: {
							enable: true,
							minimumValue: 0.1,
						},
						value: 1,
					},
					shape: {
						type: "circle",
					},
					size: {
						random: {
							enable: true,
							minimumValue: 0.5,
						},
						value: 1,
					},
				},
			}}
		/>
	);
}
