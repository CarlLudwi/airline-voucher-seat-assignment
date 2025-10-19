export interface VoucherForm {
  name: string;
  id: string;
  flightNumber: string;
  date: string;
  aircraft: string;
}

export interface VoucherContextType {
  form: VoucherForm;
  setForm: (form: VoucherForm) => void;
  seats: string[];
  error: string | null;
  loading: boolean;
  generateVouchers: () => Promise<void>;
}
