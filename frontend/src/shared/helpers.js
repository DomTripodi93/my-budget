class helpers{

    capitalizeFirst(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    //Capitalize the first letter of the first word in an input string

    capitalizeAll(string){
        let words = string.split(" ");
        for (let i = 0; i < words.length; i++){
            words[i] = this.capitalizeFirst(words[i]);
        }
        return words.join(" ");
    }
    //Capitalize the first letter of each word in a string

    slashToDash(string){
        return string.split("/").join("-");
    }
    //Replaces slashes with dashes 
    //  (ideal for strings that may need to be used as a filter, but 
    //  are expected to contain a /)

    dashToSlash(string){
        return string.split("-").join("/");
    }
    //Replaces dashes with slashes 
    //  (ideal for displaying strings that may need to be used as a filter, but 
    //  are expected to contain a /)

    gapToDash(string){
        return string.split(" ").join("-");
    }
    //Replaces dashes with slashes 
    //  (ideal for more memorable and visually pleasing url-params)

    dashToGap(string){
        return string.split("-").join(" ");
    }
    //Replaces spaces with dashes
    //  (ideal for destructuring url-params for display or query purposes)

    async removeSpaceAtEnd(string){
        if (string.charAt(string.length -1) === " "){
            string = string.substring(0, string.length -1);
            string = await this.removeSpaceAtEnd(string);
        }
            return string;
    }
    //Removes all spaces at the end of a string, saves space and 
    //  keeps values consistent and searchable

    getCurrentTimeAndDate(){
        let date = new Date().toISOString().slice(0, 11);
        let hour = "" + new Date().getHours();
        let minute = "" + new Date().getMinutes();
        if (+minute <10){
            minute = "0" + minute;
        }
        if (+hour < 10){
            hour = "0" + hour;
        }
            return date + hour + ":" + minute;
    }
    //Returns an ISO string of the current date and time for time zone in use 

    setDateForIso(year, month, day){
        if (month < 10){
            month = "0" + month;
        }
        if (day < 10){
            day = "0" + day;
        }
            return year + "-" + month + "-" + day;
    }
    //Returns and ISO string of the input date

    timeFromIsoDateTime(date){
        return date.split("T")[1].substring(0,5);
    }
    //Returns the time from and ISO date-time

    timeForDisplay(time){
        if (+time[0] > 0){
        if (+time[0] > 1){
            let hour = +time.substring(0,2) - 12;
            time = hour + time.substring(2,5) + " PM"
        } else if (+time[1] > 2){
            let hour = +time.substring(0,2) - 12;
            time = hour + time.substring(2,5) + " PM"
        } else {
            time = time + " AM"
        }
        } else {
            time = time + " AM"
        }
            return time;
    }
    //Returns a "standard" time from an "army" time

}

export default helpers;