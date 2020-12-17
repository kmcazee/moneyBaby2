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
        <!-- <TabView
          :selectedIndex="selectedIndex"
          @selectedIndexChange="indexChange"
        > -->
        <TabView>
          <TabViewItem title="Expense of Every Month">
            <StackLayout>
              <Label
                text="Expense of every month"
                class="h2 text-center"
              ></Label>
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
          </TabViewItem>
          <TabViewItem title="Expense Type">
            <StackLayout>
              <Label text="Expense Type" class="h2 text-center"></Label>

              <RadPieChart allowAnimation="true" row="1">
                <DonutSeries
                  v-tkPieSeries
                  selectionMode="DataPoint"
                  expandRadius="0.4"
                  outerRadiusFactor="0.7"
                  innerRadiusFactor="0.4"
                  valueProperty="Amount"
                  legendLabel="Genre"
                  :items="typeItem"
                />

                <RadLegendView
                  v-tkPieLegend
                  position="Right"
                  title="Genre"
                  offsetOrigin="TopRight"
                  width="110"
                  enableSelection="true"
                ></RadLegendView>
              </RadPieChart>
            </StackLayout>
          </TabViewItem>
        </TabView>
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
            <!-- <Button
              class="viewButton"
              width="18%"
              text="Week"
              @tap="onWeekTap"
            ></Button> -->
            <Button
              class="viewButton"
              width="20%"
              text="Month"
              @tap="onMonthTap"
            ></Button>
            <Button
              class="viewButton"
              width="20%"
              text="Month Names"
              @tap="onMonthNamesTap"
            ></Button>
            <Button
              class="viewButton"
              width="20%"
              text="Year"
              @tap="onYearTap"
            ></Button>
            <Button
              class="viewButton"
              width="20%"
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

require("~/util/data");
import { getEvent, getMonthlyItem, getTypeItem } from "~/util/data";
import { getItem, resetItem, deleteItem } from "~/util/data";

import Add from "~/components/Add";


// resetItem();

export default {
  methods: {
    onAddTap() {
      // Navigate to Add Page
      console.log("Add Btn Tapped");
      this.$navigateTo(Add);
    },
    onChartTap() {
      this.chartData = getMonthlyItem();
      this.typeItem = getTypeItem();
    },
    onCalendarTap() {},
    onHometap() {
      this.listOfItems = getItem();
    },
    onItemTap(e) {
      var message = e.item.title + " in " + e.item.date;
      action(message, "Cancel", ["Delete"]).then((result) => {
        if (result == "Delete") {
          deleteItem(e.item);
          this.listOfItems = getItem();
        }
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
      events: getEvent(),
      viewMode: CalendarViewMode.Month,
      chartData: getMonthlyItem(),
      listOfItems: getItem(),
      typeItem: getTypeItem(),
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
