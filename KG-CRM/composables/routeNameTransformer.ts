interface IRouteNames {
  [key: string]: string;
}

export const routeNamesMap: [RegExp, string][] = [
  [/^\/admin\/groups(?:\/.*)?$/, "Учебные группы"],
  [/^\/admin\/users(?:\/.*)?$/, "Ученики"],
  [/^\/admin\/employers(?:\/.*)?$/, "Сотрудники"],
  [/^\/admin\/settings(?:\/.*)?$/, "Настройки аккаунта"],
  [/^\/admin\/reports(?:\/.*)?$/, "Отчеты"],
  [/^\/admin\/schedule(?:\/.*)?$/, "Расписание"],
  [/^\/admin\/filials(?:\/.*)?$/, "Филиалы"],
  [/^\/admin\/incomes(?:\/.*)?$/, "Доходы"],
  [/^\/admin\/expenditures(?:\/.*)?$/, "Расходы"],
];

export function getRouteName(path: string): string | undefined {
  for (const [regex, name] of routeNamesMap) {
    if (regex.test(path)) {
      return name;
    }
  }
  return undefined;
}
