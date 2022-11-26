interface ProfileInterface {
  alias: string
  field_name: string
  value: string
  edit: string
}

export type UserProfileInterface = {
  [p: string]: ProfileInterface
}
