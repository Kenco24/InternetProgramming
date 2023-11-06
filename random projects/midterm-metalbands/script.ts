interface metalBand { 
    id: number,
    name: string,
    formed: number,
    location: string,
    country:string,
    members: string[],
    albums: Album[]
    
   
}

interface Album{
    name:string,
    year:number
}



document.addEventListener("DOMContentLoaded",siteCode);


type metalBandSorter = (first: metalBand,second: metalBand) => number;

let metalbands : metalBand[] = [];




async function siteCode() {
    const data = await loadData();
    metalbands=data;

    fillBands(metalbands);

    displayBands(metalbands);

    const nameSort = document.getElementById("sort-name")!;
    nameSort.addEventListener("click", sortByName);

    const idSort = document.getElementById("sort-id")!;
    idSort.addEventListener("click", sortById);

    const formedSort = document.getElementById("sort-formed");
    formedSort?.addEventListener("click",sortByFormed);

    const albumSort = document.getElementById("sort-albums");
    albumSort?.addEventListener("click",sortByAlbum);

    const applyFilterButton = document.getElementById("apply-filter")!;
    applyFilterButton.addEventListener("click", applyFilter)

    const nameFilterInput = document.getElementById("name-filter") as HTMLInputElement;
nameFilterInput.addEventListener("input", applyNameFilter);

const locationFilterInput = document.getElementById("location-filter") as HTMLInputElement;
locationFilterInput.addEventListener("input", applyLocationFilter);



}

const nameSorter: metalBandSorter = (first, second) => first.name.localeCompare(second.name);
const idSorter: metalBandSorter = (first, second) => first.id - second.id;
const formedSorter : metalBandSorter = (first,second) =>first.formed-second.formed;
const albumsSorter : metalBandSorter = (first,second) =>second.albums.length- first.albums.length;

const applyNameFilter = () => {
    const nameFilterInput = document.getElementById("name-filter") as HTMLInputElement;
    const nameFilter = nameFilterInput.value.trim().toLowerCase();

    let filteredBands = metalbands;

    if (nameFilter !== "") {
        filteredBands = metalbands.filter(band => band.name.toLowerCase().includes(nameFilter));
    }

    displayBands(filteredBands);
};

const applyLocationFilter = () => {
    const locationFilterInput = document.getElementById("location-filter") as HTMLInputElement;
    const locationFilter = locationFilterInput.value.trim().toLowerCase();

    let filteredBands = metalbands;

    if (locationFilter !== "") {
        filteredBands = metalbands.filter(band => band.location.toLowerCase().includes(locationFilter));
    }

    displayBands(filteredBands);
};



const fillBands = (metalbands : metalBand[]) => {
    const filter = document.getElementById("country-filter")!;

    const countries = new Set<string>();
    for (const band of metalbands) {
        countries.add(band.country);
       
    }

    for (const country of countries) {
        const option = document.createElement("option");
        option.value = country;
        option.innerHTML = country;
        filter.appendChild(option);
    }
}

const applyFilter = () =>{
    const countryElement=document.getElementById("country-filter") as HTMLSelectElement;
    const country = countryElement.value;

    let filteredBands=metalbands;

    if (country !== "all") {
        filteredBands = filteredBands.filter(bands =>bands.country === country);
    }
    displayBands(filteredBands);
}  

const sortByName = () => {
    const sortedBands = metalbands.toSorted(nameSorter);
    displayBands(sortedBands);
}

const sortById = () => {
    const sortedBands = metalbands.toSorted(idSorter);
    displayBands(sortedBands);
}

const sortByFormed = () =>{
    const sortedBands = metalbands.toSorted(formedSorter);
    displayBands(sortedBands);
}

const sortByAlbum = () =>{
    const sortedBands= metalbands.toSorted(albumsSorter);
    displayBands(sortedBands);
}

const loadData = async () =>
{

    const datauri = "https://raw.githubusercontent.com/Kenco24/InternetProgramming/main/random%20projects/midterm-metalbands/metalbands.json";
    const response = await fetch(datauri);
    if (!response.ok) {
        throw new Error("The data is not there");
    }

    const data = await response.json();
    return data;

}

const displayBands = (metalbands : metalBand[])=>{
    const container = document.getElementById("band-container")!;
    container.innerHTML="";
    for (const metalband of metalbands){
        const metalBandRow = generateMetalBandRow(metalband);
        container.append(metalBandRow);
    }
}

const generateMetalBandRow =(metalband:metalBand) =>
{
        const row = document.createElement("div");
        row.classList.add("band-table");

        const idCell = document.createElement("div");
        idCell.classList.add("band-data","band-id");
        idCell.innerHTML=metalband.id.toString();
        row.appendChild(idCell);

        const nameCell = document.createElement("div");
        nameCell.classList.add("band-data","band-name");
        nameCell.innerHTML=metalband.name.toString();
        row.appendChild(nameCell);

        const formedCell = document.createElement("div");
        formedCell.classList.add("band-data","band-formed");
        formedCell.innerHTML=metalband.formed.toString();
        row.appendChild(formedCell);

        const locationCell = document.createElement("div");
        locationCell.classList.add("band-data","band-location");
        locationCell.innerHTML=metalband.location.toString();
        row.appendChild(locationCell);

        const countryCell = document.createElement("div");
        countryCell.classList.add("band-data","band-country");
        countryCell.innerHTML=metalband.country.toString();
        row.appendChild(countryCell);

        const membersCell = document.createElement("div");
        membersCell.classList.add("band-data","band-members");
        membersCell.innerHTML=metalband.members.toString();
        row.appendChild(membersCell);
        
        const albumsCell = document.createElement("div");
        albumsCell.classList.add("band-data","band-albums");
        albumsCell.innerHTML=`Has ${metalband.albums.length.toString()} albums`;
        row.appendChild(albumsCell);
        

        return row;
}
