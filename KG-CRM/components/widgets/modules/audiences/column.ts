import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import DropdownAction from "@/components/widgets/modules/table/dropdown.vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import UserRow from "../audiences/userRow.vue";

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
        "onUpdate:checked": (value: boolean) => table.toggleAllPageRowsSelected(!!value),
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
        () => ["Наименование", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })] // Название колонки
      );
    },
    cell: ({ row }) =>
      h(
        UserRow, //Добавлять аватарки сюда
        {
          class: "text-btnPrimary cursor-pointer font-inter font-medium",
          onClick: () => useModalStore().setSelectedFilial(row.original),
        },
        row.getValue("caption")
      ), //getValue - значение поля из бд
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Город", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("city")),
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Адрес", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("address")),
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
    cell: ({ row }) => {
      const item = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          item,
          onExpand: row.toggleExpanded,
          onDeleteItem: (id) => {
            console.log(id);
          },
        })
      );
    },
  },
];
