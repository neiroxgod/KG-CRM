import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import DropdownAction from "@/components/widgets/modules/table/dropdown.vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import UserRow from "../employer/userRow.vue";

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
    accessorKey: "name", // название поля в бд
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"), // метод сортировки
        },
        () => ["ФИО", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })] // Название колонки
      );
    },
    cell: ({ row }) =>
      h(
        UserRow, //Добавлять аватарки сюда
        {
          class: "text-btnPrimary cursor-pointer font-inter font-medium",
          onClick: () => navigateTo("/admin/employers/" + row.original.id),
        },
        row.getValue("name")
      ), //getValue - значение поля из бд
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Email", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("email")),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Телефон", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("phone")),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const item = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          item,
          onExpand: row.toggleExpanded,
        })
      );
    },
  },
];
