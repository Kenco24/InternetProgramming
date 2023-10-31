export{};

function toBeNamedLater(name: string,age:number,occupation:string){
    this.name =name;
    this.age=age;
    this.occupation=occupation;
    this.toString = function () {
        return `${this.name} (${this.age}) is a ${this.occupation}`;
    };

}