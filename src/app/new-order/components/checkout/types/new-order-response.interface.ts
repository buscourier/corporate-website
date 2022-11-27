export interface NewOrderResponseInterface {
  'api-key': string
  start_city: string
  end_city: string
  sending_date: number
  sender_name: string
  sender_phone: string
  sender_passport: string
  recipient_name: string
  recipient_phone: string
  note: string
  manager_id: string
  sender_company: string
  recipient_company: string
  sender_type: string
  recipient_type: string
  sender_id: number
  recipient_id: number
  site_id: string
  order_id: number
}
