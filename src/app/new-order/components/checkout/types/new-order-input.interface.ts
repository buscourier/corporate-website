export interface NewOrderInputInterface {
  'api-key': string
  start_city: string
  end_city: string
  sending_date: string
  sender_id?: string
  sender_type?: string
  sender_company?: string
  sender_name: string
  sender_phone: string
  sender_passport: string
  recipient_name: string
  recipient_phone: string
  orders: any[]
  note: string
  server?: string
}
