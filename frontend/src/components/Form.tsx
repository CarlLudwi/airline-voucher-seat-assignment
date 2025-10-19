import React from "react";
import { Box, Button, TextField, Typography, MenuItem, Paper, CircularProgress } from "@mui/material";
import { useVoucher } from "../contexts/VoucherContext";

const Form: React.FC = () => {
  const { form, setForm, seats, error, generateVouchers } = useVoucher();
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, aircraft: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await generateVouchers();
    setLoading(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f9fc",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 380,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight={600}>
          Airline Voucher Seat Assignment
        </Typography>

        <TextField label="Crew Name" name="name" value={form.name} onChange={handleChange} fullWidth />
        <TextField label="Crew ID" name="id" value={form.id} onChange={handleChange} fullWidth />
        <TextField label="Flight Number" name="flightNumber" value={form.flightNumber} onChange={handleChange} fullWidth />
        <TextField label="Flight Date" name="date" type="date" value={form.date} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
        <TextField
          select
          label="Aircraft Type"
          name="aircraft"
          value={form.aircraft}
          onChange={handleSelect}
          fullWidth
        >
          <MenuItem value="ATR">ATR</MenuItem>
          <MenuItem value="Airbus 320">Airbus 320</MenuItem>
          <MenuItem value="Boeing 737 Max">Boeing 737 Max</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 1 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Vouchers"}
        </Button>

        {/* Error message below the button */}
        {error && (
          <Typography color="error" textAlign="center" variant="body2">
            {error}
          </Typography>
        )}

        {/* Seats display */}
        {seats.length > 0 && (
          <Box textAlign="center" mt={2}>
            <Typography variant="subtitle1" fontWeight={500}>
              Assigned Seats:
            </Typography>
            <Typography variant="h6" color="primary">
              {seats.join(", ")}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Form;
