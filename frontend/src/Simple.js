class Mammal{
    constructor(){
        console.log("this is the mammal class")
    }
    eat(){
        console.log("I am eating")
    }
}

class Human extends Mammal{

    constructor(){
        super()
        // console.log("human object created")
    }

    speak(){
        console.log("I am speaking")
    }


}

const person =  new Human()