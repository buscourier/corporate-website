export const top = [
  {link: 'find-order', name: 'Отследить посылку'},
  {link: 'new-order', name: 'Рассчет тарифа по Приморью'},
  {link: 'services', name: 'Услуги'},
  {link: 'info', name: 'Информация'},
  {link: 'documents', name: 'Документы'},
  {link: 'contacts', name: 'Контакты'},
]

export const main = [
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
        name: 'Решение нестандартных логистических задач',
      },
      {link: 'services/insurance', name: 'Страхование груза'},
    ],
  },
  {
    link: 'info',
    name: 'Информация',
    dropdown: [
      {link: 'info/how-to-send', name: 'Как отправить посылку', sm: true},
      {link: 'info/how-to-get', name: 'Как получить посылку', sm: true},
      {
        link: 'info/rules',
        name: 'Правила приемки и отправки грузов',
        sm: true,
      },
      {link: 'info/tariff', name: 'Тарифы на перевозку', sm: true},
      {
        link: 'info/packaging',
        name: 'Упаковки грузов и виды упаковки',
        sm: true,
      },
      {link: 'info/storage', name: 'Хранение груза', sm: true},
      {
        link: 'info/airport',
        name: 'Доставка грузов и багажа из Аэропорта',
        sm: true,
      },
    ],
  },
  {
    link: 'actions',
    name: 'Сервисы',
    dropdown: [
      {link: 'find-order', name: 'Поиск заказа', sm: true},
      {link: 'account', name: 'Личный кабинет', sm: true},
      {link: 'new-order/checkout', name: 'Онлайн-заявка', sm: true},
      {link: 'new-order', name: 'Расчет тарифа по Приморью', sm: true},
      {
        link: 'services/cse',
        name: 'Расчет тарифа по России',
        sm: true,
      },
      {link: 'about', name: 'О компании', sub: true},
      {link: 'career', name: 'Вакансии'},
      {link: 'documents', name: 'Документы'},
      {link: 'feedback', name: 'Обратная связь'},
      {link: 'contacts', name: 'Контакты'},
    ],
  },
]
