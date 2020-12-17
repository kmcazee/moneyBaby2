import { CalendarEvent } from 'nativescript-ui-calendar';
import { Color } from 'tns-core-modules/color';

let eventColors = {
    "Entertainment": new Color(200, 188, 26, 214),
    "Salary": new Color(220, 255, 109, 130),
    "Food": new Color(255, 55, 45, 255),
    "Transport Fare": new Color(199, 17, 227, 10),
    "Other": new Color(255, 255, 54, 3),
};

export function getEvent() {
    var events = new Array();

    let listOfItems = getItem() || [];

    listOfItems.forEach(elm => {
        console.log(elm);

        let itemDate = new Date(elm.date + " " + elm.time);

        if(itemDate.getHours() == 11){
            return;
        }

        let itemHour = elm.time.split(":")[0];
        let itemMinutes = elm.time.split(":")[1];
        let endHour = parseInt(itemHour) + 1;

        let endDate = new Date(elm.date + " " + endHour + ":" + itemMinutes);

        console.log(itemDate, endDate);
        console.log("itemDate: ", itemDate);
        console.log("endDate: ", endDate);
        console.log("Raw endDate: ", elm.date + " " + endHour + ":" + itemMinutes);
        console.log("===COMPARE===");
        console.log("itemDate > endDate", itemDate > endDate);
        console.log("itemDate < endDate", itemDate < endDate);
        let event = new CalendarEvent(elm.title, itemDate, endDate, true, eventColors[elm.genre]);
        events.push(event);
    });


    return events;
}

// File Storage
const appSettings = require("tns-core-modules/application-settings");


// Add Item
export function addItem(res) {
    var itemListRaw = appSettings.getString("itemList") || '[]';
    if (itemListRaw) {
        var itemList = JSON.parse(itemListRaw);

        // Expense

        itemList.push(res, itemList);

        var itemListString = JSON.stringify(itemList);
        console.log(itemListString)

        appSettings.setString("itemList", itemListString);
    }
    return
}

export function resetItem() {
    appSettings.setString("itemList", "");
}

export function getItem() {
    let itemListRaw = appSettings.getString("itemList");
    if (itemListRaw) {
        let itemList = JSON.parse(itemListRaw) || [];
        return itemList;
    }
    return;
}

export function getMonthlyItem() {
    let month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let itemListRaw = appSettings.getString("itemList");
    if (itemListRaw) {
        let itemList = JSON.parse(itemListRaw) || [];
        itemList.forEach(function (item, index) {
            let itemDate = new Date(item.date + 'T' + item.time + 'Z');
            let itemMonth = itemDate.getMonth();
            if (item.amount < 0) {
                item.amount = item.amount * -1;
                month[itemMonth] += item.amount;
            }
        })

        let monthList = [];
        month.forEach(function (elm, idx) {
            monthList.push({ Month: idx + 1, Amount: elm });
        })
        return monthList;
    }
    return;
}

export function getTypeItem() {
    let genreName = ["Entertainment", "Salary", "Transport Fare", "Food", "Other"];
    let genre = [0, 0, 0, 0, 0];
    let itemListRaw = appSettings.getString("itemList");

    if (itemListRaw) {
        let itemList = JSON.parse(itemListRaw) || [];
        itemList.forEach(function (item, index) {
            if(item.amount < 0){
                console.log(item);
                item.amount = item.amount * -1;
                console.log()
                switch (item.genre) {
                    case "Entertainment":
                        genre[0] += item.amount;
                        break;
                    case "Salary":
                        genre[2] += item.amount;
                        break;
                    case "Transport Fare":
                        genre[3] += item.amount;
                        break;
                    case "Food":
                        genre[4] += item.amount;
                        break;
                    default:
                        genre[5] += item.amount;
                        break;
                }
            }
        });

        let genreList = [];
        genreName.forEach(function (elm, idx) {
            genreList.push({ Genre: elm, Amount: genre[idx] });
        })
        console.log(genreList);
        return genreList;
    }
    return;
}

export function deleteItem(item) {
    var itemListRaw = appSettings.getString("itemList") || '[]';
    if (itemListRaw) {
        var itemList = JSON.parse(itemListRaw);
        console.log(itemList);
        var target;

        itemList.forEach(function (elm, idx) {

            console.log("==============");
            console.log(elm.title == item.title);
            console.log(elm.title == item.title && elm.date == elm.date)
            if (elm.title == item.title && elm.date == elm.date) {
                target = idx;
                console.log(target);
            }
            console.log("==============");
            console.log("");
        });
        console.log(target);
        if (target) {
            console.log('deleted');
            itemList.splice(target, 1);
        }

        var itemListString = JSON.stringify(itemList);

        appSettings.setString("itemList", itemListString);
    }
    return;
}


// [{
//     "title": "Salary From XX Company",
//     "date": "2020-06-22",
//     "time": "17:26:41",
//     "amount": 2000,
//     "type": "expense",
//     "genre": "Entertainment"
// }, {
//     "title": "Salary From XX Company",
//     "date": "2020-06-22",
//     "time": "17:26:41",
//     "amount": 2000,
//     "type": "expense",
//     "genre": "Entertainment"
// }, ]