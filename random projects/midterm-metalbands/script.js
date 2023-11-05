"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let metalbands = [];
async function siteCode() {
    const data = await loadData();
    metalbands = data;
    fillBands(metalbands);
    displayBands(metalbands);
    const nameSort = document.getElementById("sort-name");
    nameSort.addEventListener("click", sortByName);
    const idSort = document.getElementById("sort-id");
    idSort.addEventListener("click", sortById);
    const formedSort = document.getElementById("sort-formed");
    formedSort?.addEventListener("click", sortByFormed);
    const albumSort = document.getElementById("sort-albums");
    albumSort?.addEventListener("click", sortByAlbum);
    const applyFilterButton = document.getElementById("apply-filter");
    applyFilterButton.addEventListener("click", applyFilter);
}
const nameSorter = (first, second) => first.name.localeCompare(second.name);
const idSorter = (first, second) => first.id - second.id;
const formedSorter = (first, second) => first.formed - second.formed;
const albumsSorter = (first, second) => second.albums.length - first.albums.length;
const fillBands = (metalbands) => {
    const filter = document.getElementById("country-filter");
    const countries = new Set();
    for (const band of metalbands) {
        countries.add(band.country);
    }
    for (const country of countries) {
        const option = document.createElement("option");
        option.value = country;
        option.innerHTML = country;
        filter.appendChild(option);
    }
};
const applyFilter = () => {
    const countryElement = document.getElementById("country-filter");
    const country = countryElement.value;
    let filteredBands = metalbands;
    if (country !== "all") {
        filteredBands = filteredBands.filter(bands => bands.country === country);
    }
    displayBands(filteredBands);
};
const sortByName = () => {
    const sortedBands = metalbands.toSorted(nameSorter);
    displayBands(sortedBands);
};
const sortById = () => {
    const sortedBands = metalbands.toSorted(idSorter);
    displayBands(sortedBands);
};
const sortByFormed = () => {
    const sortedBands = metalbands.toSorted(formedSorter);
    displayBands(sortedBands);
};
const sortByAlbum = () => {
    const sortedBands = metalbands.toSorted(albumsSorter);
    displayBands(sortedBands);
};
const loadData = async () => {
    const datauri = "./metalbands.json";
    const response = await fetch(datauri);
    if (!response.ok) {
        throw new Error("The data is not there");
    }
    const data = await response.json();
    console.log(data[0].albums[8].year);
    return data;
};
const displayBands = (metalbands) => {
    const container = document.getElementById("band-container");
    container.innerHTML = "";
    for (const metalband of metalbands) {
        const metalBandRow = generateMetalBandRow(metalband);
        container.append(metalBandRow);
    }
};
const generateMetalBandRow = (metalband) => {
    const row = document.createElement("div");
    row.classList.add("band-table");
    const idCell = document.createElement("div");
    idCell.classList.add("band-data", "band-id");
    idCell.innerHTML = metalband.id.toString();
    row.appendChild(idCell);
    const nameCell = document.createElement("div");
    nameCell.classList.add("band-data", "band-name");
    nameCell.innerHTML = metalband.name.toString();
    row.appendChild(nameCell);
    const formedCell = document.createElement("div");
    formedCell.classList.add("band-data", "band-formed");
    formedCell.innerHTML = metalband.formed.toString();
    row.appendChild(formedCell);
    const locationCell = document.createElement("div");
    locationCell.classList.add("band-data", "band-location");
    locationCell.innerHTML = metalband.location.toString();
    row.appendChild(locationCell);
    const countryCell = document.createElement("div");
    countryCell.classList.add("band-data", "band-country");
    countryCell.innerHTML = metalband.country.toString();
    row.appendChild(countryCell);
    const membersCell = document.createElement("div");
    membersCell.classList.add("band-data", "band-members");
    membersCell.innerHTML = metalband.members.toString();
    row.appendChild(membersCell);
    const albumsCell = document.createElement("div");
    albumsCell.classList.add("band-data", "band-albums");
    albumsCell.innerHTML = `Has ${metalband.albums.length.toString()} albums`;
    row.appendChild(albumsCell);
    return row;
};
