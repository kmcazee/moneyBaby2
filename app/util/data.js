import { CalendarEvent } from 'nativescript-ui-calendar';
import { Color } from 'tns-core-modules/color';

var listOfItems = [
    { title: "Lunch", date: "2020-06-22", time: "12:33:05", amount: -300 },
    {
      title: "Salary From XX Company",
      date: "2020-06-22",
      time: "17:26:41",
      amount: 2000,
    },
    {
      title: "Ipad Pro",
      date: "2020-06-23",
      time: "10:51:39",
      amount: -7000,
    },
    {
      title: "Pently of overspeed",
      date: "2020-06-23",
      time: "13:00:14",
      amount: -500,
    },
    {
      title: "Car Maintance",
      date: "2020-06-24",
      time: "18:44:21",
      amount: -8000,
    },
    { title: "Lunch", date: "2020-06-22", time: "12:33:05", amount: -300 },
    {
      title: "Salary From XX Company",
      date: "2020-06-22",
      time: "17:26:41",
      amount: 2000,
    },
    {
      title: "Ipad Pro",
      date: "2020-06-23",
      time: "10:51:39",
      amount: -7000,
    },
    {
      title: "Pently of overspeed",
      date: "2020-06-23",
      time: "13:00:14",
      amount: -500,
    },
    {
      title: "Car Maintance",
      date: "2020-06-24",
      time: "18:44:21",
      amount: -8000,
    },
  ]

  let eventColors = [
    new Color(200, 188, 26, 214),
    new Color(220, 255, 109, 130),
    new Color(255, 55, 45, 255),
    new Color(199, 17, 227, 10),
    new Color(255, 255, 54, 3),
  ];

export function getDates() {
    var events = new Array();

    listOfItems.forEach(elm => {
        let event = new CalendarEvent(elm.title, new Date(elm.date + "T" + elm.time), new Date(new Date(elm.date + "T" + elm.time) + 3600), true, eventColors[0]);
        events.push(event);
    });

    return events;
}