
export interface EventTicket {
  _id?: string;
  tickettype: string;
  ticketprice: number;
  coverAmount?: number;
}

export interface ClubEvent {
  id?: string | number;
  _id?: string;

  // Event information
  title: string;
  startdatetime?: string;
  enddatetime?: string;
  time?: string;
  bookingstart?: string;
  bookingend?: string;
  venue?: string;
  clubid?: string;

  // Event category details
  language?: string;
  genreid?: string;
  categoryid?: string;
  organizerid?: string;
  artists?: string[];

  // Tickets
  tickets?: EventTicket[];

  // Table booking
  tableBookingEnabled?: boolean;
  tableBookingLayoutId?: string;
  tableBookingSlotKey?: string;

  // Seller assignment
  onGroundAssignedUserIds?: string[];

  // UI details
  image?: string;
  status?: string;

  [key: string]: unknown;
}

export interface Seller {
  id: string;
  name: string;
  phone?: string;
}

export interface SellerAssignment {
  eventId: string;
  sellerIds: string[];
}

export interface SaleRecord {
  id: string;
  event:string;
  eventId: string;
  sellerId?: string;
  saleType: "ticket" | "table";
  sellerphone?:string;
  tickettypeid?: string;
  tickettype?: string;
  noOfTicket?: number;
  ticketprice: number;
  coverAmount?: number;
  sellername?:string;
  buyername: string;
  buyerphone: string;
  buyeremail?: string;
  status?:string;
  amount?: number;
  createdAt: string;
}
