export const top = [
  {link: 'orders/track-order', name: 'Отследить посылку'},
  {link: 'orders/quick-order/new', name: 'Рассчет тарифа по Приморью'},
  {link: 'our-services', name: 'Услуги'},
  {link: 'useful-info', name: 'Информация'},
  {link: 'documents', name: 'Документы'},
  {link: 'contacts', name: 'Контакты'},
]

export const main = [
  {
    link: 'services/index',
    name: 'Услуги',
    dropdown: [
      {link: '/', name: 'Грузоперевозки по Приморскому краю'},
      // {link: 'no', name: 'Грузоперевозки в республике Татарстан'},
      {link: 'services/kce', name: 'Грузоперевозки по России'},
      {link: 'services/courier', name: 'Забор и доставка курьером'},
      {link: 'eshops', name: 'Доставка посылок из интернет-магазинов'},
      {
        link: 'services/non-standard-tasks',
        name: 'Решение нестандартных логистических задач',
      },
      {link: 'services/cargo-insurance', name: 'Страхование груза'},
    ],
  },
  {
    link: 'info/index',
    name: 'Информация',
    dropdown: [
      {link: 'info/how-to-send', name: 'Как отправить посылку', sm: true},
      {link: 'info/how-to-get', name: 'Как получить посылку', sm: true},
      {
        link: 'info/rules-of-send',
        name: 'Правила приемки и отправки грузов',
        sm: true,
      },
      {link: 'info/rates', name: 'Тарифы на перевозку', sm: true},
      {link: 'info/packing', name: 'Упаковки грузов и виды упаковки', sm: true},
      {link: 'info/storage', name: 'Хранение груза', sm: true},
      {
        link: 'info/from-airport',
        name: 'Доставка грузов и багажа из Аэропорта',
        sm: true,
      },
      // {link: 'no', name: 'Франшиза Баскурьер', sm: true}
    ],
  },
  {
    link: 'services',
    name: 'Сервисы',
    dropdown: [
      {link: 'orders/track-order', name: 'Поиск заказа', sm: true},
      {link: 'account', name: 'Личный кабинет', sm: true},
      {link: 'new-order/checkout', name: 'Онлайн-заявка', sm: true},
      {link: 'orders/quick-order', name: 'Расчет тарифа по Приморью', sm: true},
      // {link: 'no', name: 'Расчет тарифа по Республике Татарстан', sm: true},
      {
        link: 'services/delivery-russia',
        name: 'Расчет тарифа по России',
        sm: true,
      },
      {link: 'about', name: 'О компании', sub: true},
      {link: 'work-in-team', name: 'Вакансии'},
      {link: 'documents', name: 'Документы'},
      {link: 'feedback', name: 'Обратная связь'},
      {link: 'contacts', name: 'Контакты'},
    ],
  },
]
