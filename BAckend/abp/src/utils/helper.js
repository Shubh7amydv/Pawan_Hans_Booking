function compareTime(timeString1,timeString2){
    let newDate1= new Date(timeString1)
    let newDate2= new Date(timeString2)
    return newDate1.getTime() > newDate2.getTime();
}

module.exports={
    compareTime
}