const galaxy = document.getElementById("planet-container");
const starWarsUrl = "https://swapi.dev/api/planets/";

function callStarWarsApi() {
	fetch(starWarsUrl)
		.then((response) => response.json())
		.then((data) => getPlanetData(data.results))
		.catch((error) => console.log(error));
}

//collect relevant planet data and save
function getPlanetData(data) {
	console.log(data);
	let planetsArr = [];
	data.forEach((planet) => {
		let newPlanet = new Object();
		newPlanet.name = planet.name;
		newPlanet.size = planet.diameter;
		newPlanet.climate = planet.climate;
		newPlanet.population = planet.population;
		planetsArr.push(newPlanet);
	});
	// console.log(planetsArr);
	generatePlanets(planetsArr);
}

function generatePlanets(planetData) {
	// new-planet class styling already set in css to make a circle and absolute positioning
	planetData.forEach((planet, index) => {
		let planetDiv = document.createElement("div");
		planetDiv.setAttribute("class", "new-planet");
		setSize(planetDiv, planet.size);
		setColour(planetDiv, planet.name);
		setPositioning(planetDiv);
		galaxy.appendChild(planetDiv);
		planetDiv.addEventListener("click", (event) => {
			let text = document.getElementById("speech");
			text.innerHTML = `<p id="title">${planet.name.toUpperCase()}<br>climate:${
				planet.climate
			}<br>population:${planet.population}<br>size:${planet.size}</p>`;
		});
	});
}

function setSize(container, diameter) {
	let widthAndHeight = `calc(${diameter / 1200} * var(--unit))`;
	return (
		(container.style.width = widthAndHeight),
		(container.style.height = widthAndHeight)
	);
}

function setColour(container, name) {
	return (container.style.background = `${climateColours[name]}`);
}

function setPositioning(container) {
	let left = `${Math.floor(Math.random() * Math.floor(80))}%`;
	let top = `${Math.floor(Math.random() * Math.floor(80))}%`;
	return (container.style.left = left), (container.style.top = top);
}

callStarWarsApi();

climateColours = {
	Bespin: "#f71b1b",
	Coruscant: "#f0e68c",
	Hoth: "#00d8ff",
	Alderaan: "#ad49cc ",
	Kamino: "#00e0a8",
	Tatooine: "#ff662f",
	"Yavin IV": "green",
	Endor: "yellow",
	Dagobah: "gray",
	Naboo: "orange"
};