import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import DropdownAction from "@/components/widgets/modules/table/dropdown.vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

enum status {
  "pending",
  "processing",
  "success",
  "failed",
}

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        "onUpdate:checked": (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "caption", // название поля в бд
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"), // метод сортировки
        },
        () => ["Группа", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })] // Название колонки
      );
    },
    cell: ({ row }) =>
      h("div", { class: "lowercase" }, row.getValue("caption")), //getValue - значение поля из бд
  },
  {
    accessorKey: "teacherId",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Преподаватель", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) =>
      h("div", { class: "lowercase" }, row.getValue("teacherId")),
  },
  {
    accessorKey: "timestart",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Начало и завершение", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const timestart = row.original.timestart;
      const timefinish = row.original.timefinish;
      return h("div", { class: "lowercase" }, `${timestart} - ${timefinish}`);
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          payment,
          onExpand: row.toggleExpanded,
        })
      );
    },
  },
];
