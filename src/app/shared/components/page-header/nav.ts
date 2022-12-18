export default [
  {link: 'find-order', name: 'Отследить посылку'},
  {link: 'new-order', name: 'Расчет тарифа по Приморью'},
  {
    link: 'services',
    name: 'Услуги',
    dropdown: [
      {link: '/', name: 'Грузоперевозки по Приморскому краю'},
      {link: 'services/cse', name: 'Грузоперевозки по России'},
      {link: 'services/courier', name: 'Забор и доставка курьером'},
      {link: 'eshops', name: 'Доставка посылок из интернет-магазинов'},
      {
        link: 'services/complex-tasks',
        name: 'Реализация нестандартных логистических задач',
      },
      {link: 'services/insurance', name: 'Страхование груза'},
    ],
  },
  {
    link: 'info',
    name: 'Информация',
    dropdown: [
      {link: 'info/how-to-send', name: 'Как отправить посылку'},
      {link: 'info/how-to-get', name: 'Как получить посылку'},
      {link: 'info/rules', name: 'Правила приемки и отправки грузов'},
      {link: 'info/tariff', name: 'Тарифы на перевозку'},
      {link: 'info/packaging', name: 'Упаковки грузов и виды упаковки'},
      {link: 'info/storage', name: 'Хранение груза на складах Баскурьер'},
      {
        link: 'info/airport',
        name: 'Доставка грузов и багажа из Аэропорта',
      },
    ],
  },
  {link: 'documents', name: 'Документы'},
  {link: 'contacts', name: 'Контакты'},
]
