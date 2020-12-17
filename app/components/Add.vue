<template>
  <Page>
    <ActionBar :title="title">
      <NavigationButton
        text="Back"
        android.systemIcon="ic_menu_back"
        @tap="onNavigationButtonTap"
      ></NavigationButton>
    </ActionBar>
    <StackLayout>
      <RadDataForm :source="item" :metadata="itemMetaData"> </RadDataForm>
      <!-- <RadDataForm :source="item" id="form" > </RadDataForm> -->

      <Button text="Add Item" @tap="onTap"></Button>
      <!-- <Label :text="JSON.stringify(item)"></Label>
      <Label v-model="tmp"></Label> -->
    </StackLayout>
  </Page>
</template>

<script>
import Vue from "nativescript-vue";
import Home from "~/components/Home";

import RadDataForm from "nativescript-ui-dataform/vue";
import { getViewById } from '@nativescript/core';
import { addItem } from '~/util/data';

require("~/util/data");

Vue.use(RadDataForm);

const description = "Add Item";

const genreType = [
  "Entertainment",
  "Salary",
  "Transport Fare",
  "Food",
  "Other",
];

const appSettings = require("tns-core-modules/application-settings");

var now = new Date();
var nowDate = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDay();
var nowTime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

export default {
  data() {
    return {
      tmp: now.getMonth(),
      title: description,
      item: {
        title: "",
        date: nowDate,
        time: nowTime,
        amount: 0,
        type: "Expense",
        genre: "Entertainment",
      },
      itemMetaData: {
        commitMode: "Immediate",
        validationMode: "Immediate",
        propertyAnnotations: [
          {
            name: "title",
            displayName: "Title",
            index: 0,
            editor: "Text",
            validators: [{ name: "NonEmpty" }],
          },
          {
            name: "date",
            displayName: "Date",
            index: 1,
            editor: "DatePicker",
            validators: [{ name: "NonEmpty" }],
          },
          {
            name: "time",
            displayName: "Tile",
            index: 2,
            editor: "TimePicker",
            validators: [{ name: "NonEmpty" }],
          },
          {
            name: "amount",
            displayName: "Amount",
            index: 3,
            editor: "Decimal",
            validators: [{ name: "NonEmpty" }],
          },
          {
            name: "type",
            displayName: "Type",
            index: 4,
            editor: "SegmentedEditor",
            valuesProvider: ["Expense", "Revenue"],
            validators: [{ name: "NonEmpty" }],
          },
          {
            name: "genre",
            displayName: "Genre",
            index: 5,
            editor: "Picker",
            valuesProvider: genreType,
            validators: [{ name: "NonEmpty" }],
          },
        ],
      },
    };
  },
  methods: {
    onNavigationButtonTap() {
      this.$navigateTo(Home);
    },
    onTap() {
      // addItem(this.item);
      if(this.item.type == "Expense"){
        this.item.amount = this.item.amount * -1;
      }

      console.log(this.item.amount);

      var itemListRaw = appSettings.getString("itemList") || '[]';
      var itemList = JSON.parse(itemListRaw);
      itemList.push(this.item);
      var itemListSting = JSON.stringify(itemList);

      appSettings.setString("itemList", itemListSting);
      console.log(itemListRaw = appSettings.getString("itemList") || '[]');
      this.$navigateTo(Home);
    }
  },
};
</script>
<style>
</style>