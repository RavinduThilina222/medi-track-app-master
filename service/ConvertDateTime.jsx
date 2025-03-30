import moment from "moment";

export const formatDate = (timestamp) =>{
    return new Date(timestamp).setHours(0,0,0,0);
}

export const formatDateForText = (date) =>{
    return moment(date).format('ll')
}

export const formatTime = (timestamp) =>{
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString({
        hour: '2-digit',
        minute: '2-digit',
    });

    return timeString;
}

export const getDatesRange = (startDate, endDate) =>{
    const start = moment(new Date(startDate),'MM/DD/YYYY');
    const end = moment(new Date(endDate),'MM/DD/YYYY');
    const dates = [];

    while(start.isSameOrBefore(end)){
        dates.push(start.format('MM/DD/YYYY'));
        start.add(1,'days');
    }

    return dates;
}


export const GetDateRangeToDisplay = () =>{
    const dateList = [];
    for(let i=0;i<=7;i++){
        dateList.push({
            date: moment().add(i,'days').format('DD'),
            day: moment().add(i,'days').format('dd'),
            formattedDate: moment().add(i,'days').format('L')
        })
    }
    return dateList;
}