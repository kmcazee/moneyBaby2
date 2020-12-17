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
      <!-- <Label text="Add Item" class="form-title"/> -->
      <!-- Title -->
      <Label :text="textLabel[0]" class="textLabel"/>
      <TextField v-model="textField[0]" :hint="hint[0]" class="textField" />

      <!-- Genre -->
      <Label :text="textLabel[1]" class="textLabel"/>
      <ListPicker :items="genreType" v-model="textField[1]" />

      <!-- date -->
      <Label :text="textLabel[2]" class="textLabel"/>
      <DatePicker v-model="textField[2]" />

      <!-- Time -->
      <Label :text="textLabel[3]" class="textLabel"/>
      <DatePicker v-model="textField[3]" />

      <!-- Amount -->
      <Label :text="textLabel[4]" class="textLabel"/>
      <TextField v-model="textField[4]" :hint="hint[4]" class="textField" />

      <!-- Type -->
      <!-- <Label :text="textLabel[5]" class="textLabel"/>
      <SegmentedBar :items="itemtype" v-model="textField[5]" /> -->

      <Label v-model="testLabel" />

      <!-- Submit -->
      <Button text="Button" @tap="onSubmit" />
    </StackLayout>
  </Page>
</template>

<script>
import Vue from "nativescript-vue";
import Home from "~/components/Home";


const genreType = [
  "Entertainment",
  "Salary",
  "Transport Fare",
  "Food",
  "Other",
];

const itemtype = [
  "Expense",
  "Revenue",
]

export default {
  data() {
    return {
      textLabel: ["title", "genre", "date", "time", "amount", "type"],
      textField: ["", "", "", "", "", ""],
      hint: ["Item Name", "", "", "", "", ""],
      itemtype: itemtype,
      genreType, genreType,
      testLabel: "--",
      
    }
  },
  methods: {
    onNavigationButtonTap() {
      this.$navigateTo(Home);
    },
    onSubmit() {    
      // response = JSON.parse(this.textField ? this.textField : ['NoValue']);
      // this.testLabel = this.textField;
      addItem(this.textField);
      // console.log(getItem());
      console.log(appSettings.getNumber("itemList"));
    }
  },
};
</script>
<style>
</style>