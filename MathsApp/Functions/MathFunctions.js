export const getRandomInt=(min,max)=> {
    let vint=-999
    while (vint<min){
        vint=Math.floor(Math.random() * max)
    }
    return vint;
  }


export const getRandomNumbers=(level,operation)=>{
    let randomnumber1,randomnumber2=0
    if (operation=='Addition'){
      switch(level) {
        case 1:
            randomnumber1=10*getRandomInt(1,6)+getRandomInt(0,6)
            randomnumber2=10*getRandomInt(1,4)+getRandomInt(0,4)
          break;
        case 2:
            randomnumber1=10*getRandomInt(1,10)+getRandomInt(0,6)
            randomnumber2=10*getRandomInt(1,4)+getRandomInt(0,4)
          break;
        case 3:
            randomnumber1=10*getRandomInt(1,10)+getRandomInt(1,10)
            randomnumber2=10*getRandomInt(4,10)+getRandomInt(0,4)
        break;
        case 4:
            randomnumber1=100*getRandomInt(1,10)+10*getRandomInt(4,10)+getRandomInt(5,10)
            randomnumber2=100*getRandomInt(1,10)+10*getRandomInt(4,10)+getRandomInt(5,10)
        break;
        default:
            randomnumber1=getRandomInt(0,5)
            randomnumber2=getRandomInt(0,4)
          // code block
      }
    }
    if (operation=='Subtraction'){
      switch(level) {
        case 1:
            randomnumber1=10*getRandomInt(4,7)+getRandomInt(3,6)
            randomnumber2=10*getRandomInt(1,4)+getRandomInt(0,3)
          break;
        case 2:
            randomnumber1=10*getRandomInt(5,10)+getRandomInt(5,10)
            randomnumber2=10*getRandomInt(1,5)+getRandomInt(0,5)
          break;
        case 3:
            randomnumber1=10*getRandomInt(5,10)+getRandomInt(3,10)
            randomnumber2=10*getRandomInt(1,4)+getRandomInt(0,10)
        break;
        case 4:
            randomnumber1=100*getRandomInt(5,10)+10*getRandomInt(0,10)+getRandomInt(0,10)
            randomnumber2=100*getRandomInt(1,4)+10*getRandomInt(0,10)+getRandomInt(0,10)
        break;
        default:
            randomnumber1=getRandomInt(5,10)
            randomnumber2=getRandomInt(0,4)
          // code block
      }
    }

    if (operation=='Multiplication'){
      switch(level) {
        case 1:
            randomnumber1=10*getRandomInt(0,4)+getRandomInt(0,5)
            randomnumber2=getRandomInt(1,4)
          break;
        case 2:
            randomnumber1=10*getRandomInt(1,7)+getRandomInt(0,6)
            randomnumber2=getRandomInt(1,6)
          break;
        case 3:
          randomnumber1=10*getRandomInt(1,10)+getRandomInt(0,10)
          randomnumber2=getRandomInt(1,10)
        break;
        case 4:
            randomnumber1=100*getRandomInt(1,10)+10*getRandomInt(0,10)+getRandomInt(0,10)
            randomnumber2=10*getRandomInt(1,3)+getRandomInt(0,10)
        break;
        default:
            randomnumber1=getRandomInt(1,5)
            randomnumber2=getRandomInt(1,4)
          // code block
      }
    }
    // if (operation=='Multiplication'){
    //   switch(level) {
    //     case 1:
    //         randomnumber1=10*getRandomInt(0,4)+getRandomInt(0,5)
    //         randomnumber2=getRandomInt(1,4)
    //       break;
    //     case 2:
    //         randomnumber1=10*getRandomInt(1,7)+getRandomInt(0,6)
    //         randomnumber2=getRandomInt(1,6)
    //       break;
    //     case 3:
    //       randomnumber1=10*getRandomInt(1,10)+getRandomInt(0,10)
    //       randomnumber2=getRandomInt(1,10)
    //     break;
    //     case 4:
    //         randomnumber1=100*getRandomInt(1,10)+10*getRandomInt(0,10)+getRandomInt(0,10)
    //         randomnumber2=10*getRandomInt(1,3)+getRandomInt(0,10)
    //     break;
    //     default:
    //         randomnumber1=getRandomInt(1,5)
    //         randomnumber2=getRandomInt(1,4)
    //       // code block
    //   }
    // }
    
      return [randomnumber1,randomnumber2]

}