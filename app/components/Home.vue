<template>
  <Page class="page">
    <ActionBar>
      <Label text="Money Baby" class="actionbarLabel" />
      <ActionItem
        @tap="onAddTap()"
        ios.systemIcon="4"
        ios.position="right"
        android.systemIcon="ic_menu_add"
        android.position="actionBar"
      ></ActionItem>
    </ActionBar>

    <BottomNavigation selectedIndex="1">
      <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
      <TabStrip>
        <TabStripItem @tap="onChartTap()">
          <Label text="Chart" class="bottom_Label"></Label>
          <Image
            src="~/images/baseline_analytics_black_18dp.png"
            class="fas t-36"
          ></Image>
        </TabStripItem>
        <TabStripItem class="special" @tap="onHometap()">
          <Label text="Home" class="bottom_Label"></Label>
          <Image
            src="~/images/baseline_house_black_18dp.png"
            class="fas t-36"
          ></Image>
        </TabStripItem>
        <TabStripItem class="special" @tap="onCalendarTap()">
          <Label text="Calendar" class="bottom_Label"></Label>
          <Image
            src="~/images/baseline_format_list_bulleted_black_18dp.png"
            class="fas t-36"
          ></Image>
        </TabStripItem>
      </TabStrip>

      <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
      <!-- Chart Page Content Start -->
      <TabContentItem>
        <StackLayout>
          <Label text="Expense of every month" class="h2 text-center"></Label>
          <RadCartesianChart>
            <CategoricalAxis v-tkCartesianHorizontalAxis />
            <LinearAxis v-tkCartesianVerticalAxis />
            <LineSeries
              v-tkCartesianSeries
              :items="chartData"
              categoryProperty="Month"
              valueProperty="Amount"
            />
          </RadCartesianChart>
        </StackLayout>
      </TabContentItem>
      <!-- Chart Page Content End -->
      <!-- Home Page Content Start -->
      <TabContentItem backgroundColor="#3B3740">
        <ListView
          for="item in listOfItems"
          @itemTap="onItemTap"
          class="spentItemList"
        >
          <v-template>
            <StackLayout orientation="horizontal" class="" color="white">
              <StackLayout class="listItem-Block" width="70%">
                <Label :text="item.title" class="listItem-title" />
                <StackLayout orientation="horizontal" class="listItem-Block">
                  <Label :text="item.date" class="listItem-datetime" />
                  <Label :text="item.time" class="listItem-datetime" />
                </StackLayout>
              </StackLayout>
              <StackLayout
                orientation="horizontal"
                class="listItem-Block"
                width="30%"
                height="100%"
              >
                <Label text="$" class="listItem-currency" height="100%" />
                <Label
                  :text="item.amount"
                  class="listItem-amount"
                  height="100%"
                />
              </StackLayout>
            </StackLayout>
          </v-template>
        </ListView>
      </TabContentItem>
      <!-- Home Page Content End -->
      <!-- Calendar Page Content Start -->
      <TabContentItem>
        <StackLayout>
          <Label text="Calendar" class="h2 text-center"></Label>
          <StackLayout row="1" orientation="horizontal">
            <Button
              class="viewButton"
              width="18%"
              text="Week"
              @tap="onWeekTap"
            ></Button>
            <Button
              class="viewButton"
              width="18%"
              text="Month"
              @tap="onMonthTap"
            ></Button>
            <Button
              class="viewButton"
              width="25%"
              text="Month names"
              @tap="onMonthNamesTap"
            ></Button>
            <Button
              class="viewButton"
              width="18%"
              text="Year"
              @tap="onYearTap"
            ></Button>
            <Button
              class="viewButton"
              width="18%"
              text="Day"
              @tap="onDayTap"
            ></Button>
          </StackLayout>
          <RadCalendar :eventSource="events" :viewMode="viewMode">
          </RadCalendar>
        </StackLayout>
      </TabContentItem>
      <!-- Calendar Page Content Start -->
    </BottomNavigation>
  </Page>
</template>

<script>
import Vue from "nativescript-vue";

import RadChart from "nativescript-ui-chart/vue";
Vue.use(RadChart);

import CalendarView from "nativescript-ui-calendar/vue";
Vue.use(CalendarView);
import { CalendarViewMode } from "nativescript-ui-calendar";
import { getDates } from "~/util/data"

// Sample Data
function getExpenseData() {
  return [
    { Month: "1", Amount: 15 },
    { Month: "2", Amount: 13 },
    { Month: "3", Amount: 24 },
    { Month: "4", Amount: 11 },
    { Month: "5", Amount: 18 },
    { Month: "6", Amount: 22 },
    { Month: "7", Amount: 30 },
    { Month: "8", Amount: 50 },
    { Month: "9", Amount: 25 },
    { Month: "10", Amount: 30 },
    { Month: "11", Amount: 20 },
    { Month: "12", Amount: 40 },
  ];
}

export default {
  methods: {
    onAddTap() {
      console.log("Test");
    },
    onChartTap() {},
    onCalendarTap() {},
    onHometap() {},
    onItemTap(e) {
      var message = e.item.title + " in " + e.item.date;
      action("Your message", "Cancel", ["Edit", "Delete"]).then((result) => {
        console.log(result);
      });
      // console.log(e)
    },
    onWeekTap() {
      this.viewMode = CalendarViewMode.Week;
      console.log(this.viewMode);
    },
    onMonthTap() {
      this.viewMode = CalendarViewMode.Month;
      console.log(this.viewMode);
    },
    onMonthNamesTap() {
      this.viewMode = CalendarViewMode.MonthNames;
      console.log(this.viewMode);
    },
    onYearTap() {
      this.viewMode = CalendarViewMode.Year;
      console.log(this.viewMode);
    },
    onDayTap() {
      this.viewMode = CalendarViewMode.Day;
      console.log(this.viewMode);
    },
  },
  data() {
    return {
      events: getDates(),
      viewMode: CalendarViewMode.Month,
      chartData: getExpenseData(),
      listOfItems: [
        { title: "Lunch", date: "22/06/2020", time: "12:33:05", amount: -300 },
        {
          title: "Salary From XX Company",
          date: "22/06/2020",
          time: "17:26:41",
          amount: 2000,
        },
        {
          title: "Ipad Pro",
          date: "23/06/2020",
          time: "10:51:39",
          amount: -7000,
        },
        {
          title: "Pently of overspeed",
          date: "23/06/2020",
          time: "13:00:14",
          amount: -500,
        },
        {
          title: "Car Maintance",
          date: "24/06/2020",
          time: "18:44:21",
          amount: -8000,
        },
        { title: "Lunch", date: "22/06/2020", time: "12:33:05", amount: -300 },
        {
          title: "Salary From XX Company",
          date: "22/06/2020",
          time: "17:26:41",
          amount: 2000,
        },
        {
          title: "Ipad Pro",
          date: "23/06/2020",
          time: "10:51:39",
          amount: -7000,
        },
        {
          title: "Pently of overspeed",
          date: "23/06/2020",
          time: "13:00:14",
          amount: -500,
        },
        {
          title: "Car Maintance",
          date: "24/06/2020",
          time: "18:44:21",
          amount: -8000,
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}

.actionbarLabel {
  font-size: 25px;
  font-weight: bold;
}

.bottom_Label {
  font-size: 14;
}

.ActionBarText {
  font-size: 25px;
  font-weight: bold;
}

.ActionBarItem {
  color: white;
}

.listItem-title {
  font-size: 25px;
  width: 100%;
}
.listItem-datetime {
  font-size: 15px;
  width: 50%;
}
.listItem-amount {
  font-size: 20px;
  text-align: right;
}
.listItem-currency {
  font-size: 20px;
  text-align: right;
}
.listItem-Block {
  margin: 0;
  padding: 0;
}
.spentItemList {
  margin: 0;
  padding: 0;
}
</style>
