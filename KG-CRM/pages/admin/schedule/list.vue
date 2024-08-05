<template>
  <div>
    <KeepAlive>
      <Tabs>
        <TabsList class="gap-10">
          <TabsTrigger value="overview"> Syncfusion </TabsTrigger>
          <TabsTrigger value="tasks"> DevExtreme </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" keep-alive>
          <ejs-schedule
            height="550px"
            width="100%"
            :selectedDate="selectedDate"
            :eventSettings="eventSettings"
          >
            <e-views>
              <e-view option="Day"></e-view>
              <e-view option="Week"></e-view>
              <e-view option="WorkWeek"></e-view>
              <e-view option="Month"></e-view>
              <e-view option="Agenda"></e-view>
            </e-views>
            <e-resources>
              <e-resource
                field="OwnerId"
                title="Owner"
                name="Owners"
                :dataSource="ownerDataSource"
                textField="OwnerText"
                idField="Id"
                colorField="OwnerColor"
              >
              </e-resource>
            </e-resources>
          </ejs-schedule>
        </TabsContent>
        <TabsContent value="tasks">
          <DxScheduler
            :current-date.sync="currentDate"
            :data-source="appointments"
            text-expr="title"
            all-day-expr="dayLong"
            recurrence-rule-expr="recurrence"
            current-view="month"
          >
            <DxView type="day" :start-day-hour="10" :end-day-hour="22" />
            <DxView type="week" :start-day-hour="10" :end-day-hour="22" />
            <DxView type="month" />
            <DxView type="agenda" :agenda-duration="5" />
          </DxScheduler>
        </TabsContent>
      </Tabs>
    </KeepAlive>
  </div>
</template>

<script lang="ts" setup>
import "devextreme/dist/css/dx.light.css";
import { DxScheduler, DxView, DxScrolling } from "devextreme-vue/scheduler";
import {
  ScheduleComponent as EjsSchedule,
  ViewsDirective as EViews,
  ViewDirective as EView,
  ResourcesDirective as EResources,
  ResourceDirective as EResource,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-vue-schedule";

const currentDate = new Date(2021, 4, 25);

const appointments = [
  {
    title: "Install New Database",
    startDate: new Date("2021-05-23T08:45:00.000Z"),
    endDate: new Date("2021-05-23T09:45:00.000Z"),
  },
  {
    title: "Create New Online Marketing Strategy",
    startDate: new Date("2021-05-24T09:00:00.000Z"),
    endDate: new Date("2021-05-24T11:00:00.000Z"),
  },
  {
    title: "Upgrade Personal Computers",
    startDate: new Date("2021-05-25T10:15:00.000Z"),
    endDate: new Date("2021-05-25T13:30:00.000Z"),
  },
  {
    title: "Customer Workshop",
    startDate: new Date("2021-05-26T08:00:00.000Z"),
    endDate: new Date("2021-05-26T10:00:00.000Z"),
    dayLong: true,
    recurrence: "FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10",
  },
  {
    title: "Prepare Development Plan",
    startDate: new Date("2021-05-27T08:00:00.000Z"),
    endDate: new Date("2021-05-27T10:30:00.000Z"),
  },
  {
    title: "Testing",
    startDate: new Date("2021-05-23T09:00:00.000Z"),
    endDate: new Date("2021-05-23T10:00:00.000Z"),
    recurrence: "FREQ=WEEKLY;INTERVAL=2;COUNT=2",
  },
  {
    title: "Meeting of Instructors",
    startDate: new Date("2021-05-24T10:00:00.000Z"),
    endDate: new Date("2021-05-24T11:15:00.000Z"),
    recurrence: "FREQ=DAILY;BYDAY=WE;UNTIL=20211001",
  },
  {
    title: "Recruiting students",
    startDate: new Date("2021-05-25T08:00:00.000Z"),
    endDate: new Date("2021-05-25T09:00:00.000Z"),
    recurrence: "FREQ=YEARLY",
  },
  {
    title: "Monthly Planning",
    startDate: new Date("2021-05-26T09:30:00.000Z"),
    endDate: new Date("2021-05-26T10:45:00.000Z"),
    recurrence: "FREQ=MONTHLY;BYMONTHDAY=28;COUNT=1",
  },
  {
    title: "Open Day",
    startDate: new Date("2021-05-27T09:30:00.000Z"),
    endDate: new Date("2021-05-27T19:00:00.000Z"),
  },
];

provide("schedule", [Day, Week, WorkWeek, Month, Agenda]);

const selectedDate = new Date(2023, 7, 8);
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: "Surgery - Andrew",
      EventType: "Confirmed",
      StartTime: new Date(2023, 7, 10, 9, 0),
      EndTime: new Date(2023, 7, 10, 10, 0),
      OwnerId: 2,
    },
    {
      Id: 2,
      Subject: "Consulting - John",
      EventType: "Confirmed",
      StartTime: new Date(2023, 7, 9, 10, 0),
      EndTime: new Date(2023, 7, 9, 11, 30),
      OwnerId: 3,
    },
    {
      Id: 3,
      Subject: "Therapy - Robert",
      EventType: "Requested",
      StartTime: new Date(2023, 7, 8, 11, 30),
      EndTime: new Date(2023, 7, 8, 12, 30),
      OwnerId: 1,
    },
  ],
};
const ownerDataSource = [
  { OwnerText: "Nancy", Id: 1, OwnerColor: "#ffaa00" },
  { OwnerText: "Steven", Id: 2, OwnerColor: "#f8a398" },
  { OwnerText: "Michael", Id: 3, OwnerColor: "#7499e1" },
];

const route = useRoute();
</script>

<style>
@import "@syncfusion/ej2-base/styles/material.css";
@import "@syncfusion/ej2-buttons/styles/material.css";
@import "@syncfusion/ej2-calendars/styles/material.css";
@import "@syncfusion/ej2-dropdowns/styles/material.css";
@import "@syncfusion/ej2-inputs/styles/material.css";
@import "@syncfusion/ej2-navigations/styles/material.css";
@import "@syncfusion/ej2-popups/styles/material.css";
@import "@syncfusion/ej2-vue-schedule/styles/material.css";
</style>
