export interface Book {
  id: number;
  image: string | File;
  isbn: string;
  name: string;
  price: number;
  stock: number;
}

export type NotificationType = "success" | "error" | "warning" | "info"

export interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number
  autoClose: boolean
}

export interface Client {
  id: number
  doc_type: string
  doc_number: string
  first_name: string
  last_name: string
  phone: string
  email: string
}

export interface OrderDetail {
  id: number
  price: number
  quantity: number
  book_id: number
  book: Book
}

export interface Order {
  id: number
  voucher_type: string
  voucher_number: string
  voucher_pdf: string
  client_id: number
  client: Client
  details: OrderDetail[]
  total: number
}