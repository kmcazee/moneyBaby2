<template>
<Page>
    <ActionBar :title="title">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <StackLayout>
        <RadDataForm :source="item" :metadata="itemMetaData">
        </RadDataForm>
        <Button text="Add Item" tap="onTap"></Button>
    </StackLayout>
</Page>
</template>

<script>
import Vue from 'nativescript-vue';
import RadDataForm from 'nativescript-ui-dataform/vue';

Vue.use(RadDataForm);

const description = 'Add Item';

const genreType = [
     'Entertianment' ,
     'Salary' ,
     'Transport Fare' ,
     'Food' ,
     'Other' 
];

export default {
  data () {
    return {
      title: description,
      item: {
        title: "Salary From XX Company",
        date: "22/06/2020",
        time: "17:26:41",
        amount: 2000,
        type: 'expense',
        genre: "Entertainment"
      },
      itemMetaData: {
        'isReadOnly': false,
        'commitMode': 'Manual',
        'validationMode': 'Immediate',
        'propertyAnnotations':[
            {
                'name': 'title',
                'displayName': 'Title',
                'index': 0,
                'editor': 'Text',
                'validators': [
                    { 'name': 'NonEmpty' },
                ]
            },
            {
                'name': 'date',
                'displayName': 'Date',
                'index': 0,
                'editor': 'DatePicker',
            },
            {
                'name': 'time',
                'displayName': 'Tile',
                'index': 0,
                'editor': 'TimePicker',
            },
            {
                'name': 'amount',
                'displayName': 'Amount',
                'index': 0,
                'editor': 'Decimal',
            },
            {
                'name': 'type',
                'displayName': 'Type',
                'index': 0,
                'editor': 'SegmentedEditor',
                'valuesProvider': ['Expense', 'Revenue'],
            },
            {
                'name': 'genre',
                'displayName': 'Genre',
                'index': 0,
                'editor': 'Picker',
                'valuesProvider': genreType,
            }
        ]
      }
    };
  },
  methods: {
    onNavigationButtonTap() {
      Frame.topmost().goBack();
    },
  }
};
</script>
<style>
</style>