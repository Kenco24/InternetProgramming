const basePerson = {
    name: "John",
    age: 21,
    occupation: "worker",
    toString : function() {
        return `${this.name} (${this.age}) is a ${this.occupation}`;
    }
}

const weko = Object.create(basePerson, {

    name:{ value:"Weko"},
    age: {value :42},
    occupation: {value :"Teacher"},

});

weko.toString = function() {
    return `${this.name} (${this.age}) is a ${this.occupation} - redifned`;
}

console.log(weko.toString());
console.log(weko.hasOwnProperty("name"));

export{};